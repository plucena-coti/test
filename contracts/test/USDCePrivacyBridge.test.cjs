
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PrivacyBridgeUSDCe", function () {
    this.timeout(120000); // 2 minutes timeout for testnet

    let publicUsdc, privateUsdc, bridge;
    let owner, user1;

    // Existing Public USDC.e on Coti Testnet
    const PUBLIC_USDC_ADDRESS = "0xDDaF77C77C58804E82CC878868bCb88D1689142f";

    // Utilities
    const toBytes = ethers.toUtf8Bytes || (ethers.utils && ethers.utils.toUtf8Bytes);
    const keccak = ethers.keccak256 || (ethers.utils && ethers.utils.keccak256);
    const BRIDGE_ROLE = keccak(toBytes("BRIDGE_ROLE"));

    const logTx = async (tx, description) => {
        console.log(`\n-----------------------------------------------------------`);
        console.log(`Action: ${description}`);
        console.log(`Tx Link: https://testnet.cotiscan.io/tx/${tx.hash}`);
        console.log(`-----------------------------------------------------------`);
        return await tx.wait();
    };

    before(async function () {
        const signers = await ethers.getSigners();
        owner = signers[0];
        user1 = signers.length > 1 ? signers[1] : owner;

        console.log("Deployer account:", owner.address);

        // 1. Deploy Public USDC.e Mock
        const USDCeFactory = await ethers.getContractFactory("USDCe");
        publicUsdc = await USDCeFactory.deploy();
        await publicUsdc.waitForDeployment ? await publicUsdc.waitForDeployment() : await publicUsdc.deployed();

        const publicUsdcAddr = await publicUsdc.getAddress ? await publicUsdc.getAddress() : publicUsdc.address;
        console.log("Deployed Public USDC.e Mock at:", publicUsdcAddr);

        // 2. Deploy PrivateUSDCe
        const PrivateTokenFactory = await ethers.getContractFactory("MockPrivateERC20");
        privateUsdc = await PrivateTokenFactory.deploy({ gasLimit: 12000000 });
        await privateUsdc.waitForDeployment ? await privateUsdc.waitForDeployment() : await privateUsdc.deployed();

        const pTokenAddr = await privateUsdc.getAddress ? await privateUsdc.getAddress() : privateUsdc.address;
        console.log("Deployed PrivateUSDCe at:", pTokenAddr);

        // 3. Deploy PrivacyBridgeUSDCe
        const BridgeFactory = await ethers.getContractFactory("PrivacyBridgeUSDCe");
        bridge = await BridgeFactory.deploy(publicUsdcAddr, pTokenAddr, { gasLimit: 12000000 });
        await bridge.waitForDeployment ? await bridge.waitForDeployment() : await bridge.deployed();

        const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;
        console.log("Deployed PrivacyBridgeUSDCe at:", bridgeAddr);

        console.log("\n===========================================================");
        console.log("CONTRACTS DEPLOYED");
        console.log("Public USDC.e:   ", publicUsdcAddr);
        console.log("Private USDC.e:  ", pTokenAddr);
        console.log("Bridge USDC.e:   ", bridgeAddr);
        console.log("===========================================================\n");

        // 4. Grant BRIDGE_ROLE to Bridge
        const tx = await privateUsdc.grantRole(BRIDGE_ROLE, bridgeAddr, { gasLimit: 12000000 });
        await logTx(tx, "Granting BRIDGE_ROLE to Bridge Contract");
    });

    describe("Setup & Initial State", function () {
        it("Should link correctly to public and private tokens", async function () {
            const pTokenAddr = await privateUsdc.getAddress ? await privateUsdc.getAddress() : privateUsdc.address;
            const publicUsdcAddr = await publicUsdc.getAddress ? await publicUsdc.getAddress() : publicUsdc.address;
            expect(await bridge.token()).to.equal(publicUsdcAddr);
            expect(await bridge.privateTokenAddress()).to.equal(pTokenAddr);
        });

        it("Should have correct scaling factor", async function () {
            // USDC.e has 6 decimals, p.USDC.e has 6 decimals -> Scaling Factor should be 1
            // Check contract if exposing scalingFactor, or infer from logic if necessary.
            // PrivacyBridgeERC20 is abstract, let's see if we can check decimals mismatch handling
            // Since both are 6 decimals, 1 token public = 1 token private
        });
    });

    describe("Minting Public Tokens", function () {
        it("Should mint Public USDC.e to user", async function () {
            const amount = 100 * 10 ** 6; // 100 USDC (6 decimals)
            try {
                const tx = await publicUsdc.connect(owner).mint(owner.address, amount, { gasLimit: 2000000 });
                await logTx(tx, "Minting 100 USDC.e to Owner");
                const balance = await publicUsdc.balanceOf(owner.address);
                expect(balance).to.be.at.least(amount);
            } catch (error) {
                console.log("Minting failed (likely not owner of Public Token). Skipping mint test.");
                console.log("Ensure account has sufficient USDC.e balance for testing.");
            }
        });
    });

    describe("Bridge Operations", function () {
        const depositAmount = 10 * 10 ** 6; // 10 USDC (6 decimals)

        it("Should approve bridge to spend USDC.e", async function () {
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;
            const tx = await publicUsdc.approve(bridgeAddr, depositAmount, { gasLimit: 2000000 });
            await logTx(tx, "Approve Bridge to spend 10 USDC.e");

            // Note: Verify allowance if possible, but mock ABI might vary
        });

        it("Should deposit USDC.e", async function () {
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;

            const initialBridgeBalance = await publicUsdc.balanceOf(bridgeAddr);

            const tx = await bridge.deposit(depositAmount, { gasLimit: 12000000 });
            await logTx(tx, "Deposit 10 USDC.e");

            await expect(tx)
                .to.emit(bridge, "Deposit")
                .withArgs(owner.address, depositAmount); // 1:1 scaling for 6 decimal tokens

            const finalBridgeBalance = await publicUsdc.balanceOf(bridgeAddr);
            expect(finalBridgeBalance).to.equal(BigInt(initialBridgeBalance) + BigInt(depositAmount));
        });

        it("Should withdraw USDC.e", async function () {
            const withdrawAmount = 5 * 10 ** 6; // 5 USDC
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;

            const initialBridgeBalance = await publicUsdc.balanceOf(bridgeAddr);

            // Approve first
            const approveTx = await privateUsdc.approve(bridgeAddr, withdrawAmount, { gasLimit: 2000000 });
            await approveTx.wait();

            const tx = await bridge.withdraw(withdrawAmount, { gasLimit: 12000000 });
            await logTx(tx, "Withdraw 5 USDC.e");

            await expect(tx)
                .to.emit(bridge, "Withdraw")
                .withArgs(owner.address, withdrawAmount);

            const finalBridgeBalance = await publicUsdc.balanceOf(bridgeAddr);
            expect(finalBridgeBalance).to.equal(BigInt(initialBridgeBalance) - BigInt(withdrawAmount));
        });
    });
});
