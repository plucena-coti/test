const hre = require("hardhat");
const { ethers } = hre;

const TIMEOUT_SECONDS = 180;
const USDT_ADDRESS = "0xA53Cbe7Ac743C694f74539a73C531a60dA0fF5B8";
const PRIVATE_USDT_ADDRESS = "0xdD6A49531E7a910d47f2F271AB39e95948d93adD";

async function waitWithTimeout(promise, timeoutSeconds, stepName) {
    console.log(`[${stepName}] Waiting up to ${timeoutSeconds} seconds...`);
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(() => {
            console.error(`[${stepName}] ❌ TIMEOUT! Forcefully rejecting.`);
            reject(new Error(`[${stepName}] Timed out after ${timeoutSeconds} seconds`));
        }, timeoutSeconds * 1000);
    });

    try {
        const result = await Promise.race([promise, timeoutPromise]);
        clearTimeout(timeoutHandle);
        console.log(`[${stepName}] ✅ Completed!`);
        return result;
    } catch (error) {
        clearTimeout(timeoutHandle);
        console.error(`[${stepName}] 💥 Error or Timeout:`, error.message);
        throw error;
    }
}

async function main() {
    const network = await ethers.provider.getNetwork();
    console.log(`Deploying to network: ${network.name} (Chain ID: ${network.chainId})`);

    // 1. Deploy USDTPrivacyBridge
    console.log("\n1. Deploying USDTPrivacyBridge...");
    const USDTPrivacyBridge = await ethers.getContractFactory("USDTPrivacyBridge");
    const usdtBridge = await USDTPrivacyBridge.deploy(USDT_ADDRESS, PRIVATE_USDT_ADDRESS, { gasLimit: 12000000 });
    await waitWithTimeout(usdtBridge.waitForDeployment(), TIMEOUT_SECONDS, "USDTPrivacyBridge Deployment");
    const bridgeAddr = await usdtBridge.getAddress();
    console.log(`   -> USDTPrivacyBridge deployed to: ${bridgeAddr}`);

    // 2. Grant MINTER_ROLE to USDTPrivacyBridge on PrivateUSDT
    console.log("\n2. Granting MINTER_ROLE on PrivateUSDT...");
    const PrivateUSDT = await ethers.getContractAt("PrivateTetherUSD", PRIVATE_USDT_ADDRESS);
    const MINTER_ROLE = await PrivateUSDT.MINTER_ROLE();

    // Check if role is already granted
    const hasRole = await PrivateUSDT.hasRole(MINTER_ROLE, bridgeAddr);
    if (!hasRole) {
        const roleTx = await PrivateUSDT.grantRole(MINTER_ROLE, bridgeAddr, { gasLimit: 5000000 });
        await waitWithTimeout(roleTx.wait(), TIMEOUT_SECONDS, "Granting MINTER_ROLE");
        console.log(`   -> MINTER_ROLE granted to ${bridgeAddr}`);
    } else {
        console.log(`   -> ${bridgeAddr} already has MINTER_ROLE`);
    }

    console.log("\n=========================================");
    console.log("   ✅ USDT BRIDGE DEPLOYMENT COMPLETE");
    console.log("=========================================");
    console.log(`USDTPrivacyBridge: ${bridgeAddr}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
