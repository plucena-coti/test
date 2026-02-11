
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CotiPrivacyBridge", function () {
    this.timeout(120000); // 2 minutes timeout for testnet

    let PrivateCoti, privateCoti;
    let CotiPrivacyBridge, bridge;
    let owner, user1, user2;

    // Fix for Ethers v5/v6 compatibility
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
        user2 = signers.length > 2 ? signers[2] : owner;

        console.log("Deployer account:", owner.address);
        console.log("User1 account:", user1.address);


        const PrivateCotiFactory = await ethers.getContractFactory("MockPrivateERC20");
        privateCoti = await PrivateCotiFactory.deploy();
        await privateCoti.waitForDeployment ? await privateCoti.waitForDeployment() : await privateCoti.deployed();

        const BridgeFactory = await ethers.getContractFactory("PrivacyBridgeCotiNative");

        const pCotiAddr = await privateCoti.getAddress ? await privateCoti.getAddress() : privateCoti.address;
        bridge = await BridgeFactory.deploy(pCotiAddr, { gasLimit: 12000000 });
        await bridge.waitForDeployment ? await bridge.waitForDeployment() : await bridge.deployed();

        const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;

        console.log("\n===========================================================");
        console.log("CONTRACTS DEPLOYED");
        console.log("PrivateCoti (Mock) Address:", pCotiAddr);
        console.log("PrivacyBridgeCotiNative Address:", bridgeAddr);
        console.log("===========================================================\n");

        const tx = await privateCoti.grantRole(BRIDGE_ROLE, bridgeAddr, { gasLimit: 12000000 });
        await logTx(tx, "Granting BRIDGE_ROLE to Bridge Contract");

        console.log("Contracts deployed and configured.");
    });

    afterEach(async function () {
        console.log("Waiting for nonce sync...");
        await new Promise(r => setTimeout(r, 5000));
    });

    describe("Deployment", function () {
        it("Should set correct initial state", async function () {
            const pCotiAddr = await privateCoti.getAddress ? await privateCoti.getAddress() : privateCoti.address;
            expect(await bridge.privateCoti()).to.equal(pCotiAddr);
            expect(await bridge.minDepositAmount()).to.equal(1);
        });

        it("Should own limits", async function () {
            expect(await bridge.owner()).to.equal(owner.address);
        });
    });

    describe("Deposits", function () {
        it("Should allow deposit of native COTI", async function () {
            const depositAmount = ethers.parseEther("0.1"); // Smaller amount
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;

            const initialBalance = await ethers.provider.getBalance(bridgeAddr);

            // Deposit
            const tx = await bridge.connect(user1).deposit({ value: depositAmount, gasLimit: 12000000 });
            await logTx(tx, `Deposit ${ethers.formatEther(depositAmount)} Native COTI`);

            await expect(tx)
                .to.emit(bridge, "Deposit")
                .withArgs(user1.address, depositAmount);

            const finalBalance = await ethers.provider.getBalance(bridgeAddr);
            expect(finalBalance).to.equal(initialBalance + depositAmount);
        });

        it("Should fail with 0 value", async function () {
            try {
                const tx = await bridge.connect(user1).deposit({ value: 0, gasLimit: 12000000 });
                const receipt = await tx.wait();
                console.log("Deposit(0) status:", receipt.status);
                if (receipt.status === 1) {
                    console.log("Transaction SUCCEEDED unexpectedly.");
                    // Force fail
                    expect(receipt.status).to.equal(0);
                }
            } catch (error) {
                console.log("Deposit(0) failed as expected. Error:", error.message);
                // On Coti Testnet, reason string might be missing. Check for revert code or message.
                expect(error.message).to.include("reverted");
            }
        });
    });

    describe("Withdrawals", function () {
        it("Should allow withdrawal", async function () {
            const depositAmount = ethers.parseEther("0.1");
            // Native Coti (18 decimals) -> Private Coti (6 decimals)
            // Divide by 1e12
            const withdrawAmount = 50000; // 0.05 COTI
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;

            // Deposit first to ensure balance
            const txDep = await bridge.connect(user1).deposit({ value: depositAmount, gasLimit: 12000000 });
            await logTx(txDep, "Setup: Deposit for Withdrawal Test");

            const initialBalance = await ethers.provider.getBalance(bridgeAddr);

            // Withdraw
            // Approve first
            const approveTx = await privateCoti.connect(user1).approve(bridgeAddr, withdrawAmount, { gasLimit: 2000000 });
            await approveTx.wait();

            const tx = await bridge.connect(user1).withdraw(withdrawAmount, { gasLimit: 12000000 });
            // Log as 0.05 COTI
            await logTx(tx, `Withdraw 0.05 Native COTI`);


            await expect(tx)
                .to.emit(bridge, "Withdraw")
                .withArgs(user1.address, withdrawAmount);

            const finalBalance = await ethers.provider.getBalance(bridgeAddr);
            const expectedReduction = ethers.parseEther("0.05");
            expect(finalBalance).to.equal(initialBalance - expectedReduction);
        });

        it("Should fail withdrawal if amount > balance", async function () {
            const bridgeAddr = await bridge.getAddress ? await bridge.getAddress() : bridge.address;
            const balance = await ethers.provider.getBalance(bridgeAddr);
            const amount = balance + ethers.parseEther("1.0"); // Exceed balance

            try {
                const tx = await bridge.connect(user1).withdraw(amount, { gasLimit: 12000000 });
                const receipt = await tx.wait();
                console.log("Withdraw(excess) status:", receipt.status);
                expect(receipt.status).to.equal(0);
            } catch (error) {
                console.log("Withdraw(excess) failed as expected. Error:", error.message);
                expect(error.message).to.include("reverted");
            }
        });
    });
});
