const hre = require("hardhat");
const { ethers } = hre;

const TIMEOUT_SECONDS = 180;
const USDC_E_ADDRESS = "0xDDaF77C77C58804E82CC878868bCb88D1689142f";
const PRIVATE_USDC_E_ADDRESS = "0x0Df92729B8b7f4265FD934B720daBF42a8Fb5859";

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

    // 1. Deploy PrivacyBridgeUSDCe
    console.log("\n1. Deploying PrivacyBridgeUSDCe...");
    const PrivacyBridgeUSDCe = await ethers.getContractFactory("PrivacyBridgeUSDCe");
    const usdcEBridge = await PrivacyBridgeUSDCe.deploy(USDC_E_ADDRESS, PRIVATE_USDC_E_ADDRESS, { gasLimit: 12000000 });
    await waitWithTimeout(usdcEBridge.waitForDeployment(), TIMEOUT_SECONDS, "PrivacyBridgeUSDCe Deployment");
    const bridgeAddr = await usdcEBridge.getAddress();
    console.log(`   -> USDCePrivacyBridge deployed to: ${bridgeAddr}`);

    // 2. Grant MINTER_ROLE to USDCePrivacyBridge on PrivateUSDCe
    console.log("\n2. Granting MINTER_ROLE on PrivateUSDCe...");
    const PrivateUSDCe = await ethers.getContractAt("PrivateBridgedUSDC", PRIVATE_USDC_E_ADDRESS);
    const MINTER_ROLE = await PrivateUSDCe.MINTER_ROLE();

    // Check if role is already granted
    const hasRole = await PrivateUSDCe.hasRole(MINTER_ROLE, bridgeAddr);
    if (!hasRole) {
        const roleTx = await PrivateUSDCe.grantRole(MINTER_ROLE, bridgeAddr, { gasLimit: 5000000 });
        await waitWithTimeout(roleTx.wait(), TIMEOUT_SECONDS, "Granting MINTER_ROLE");
        console.log(`   -> MINTER_ROLE granted to ${bridgeAddr}`);
    } else {
        console.log(`   -> ${bridgeAddr} already has MINTER_ROLE`);
    }

    console.log("\n=========================================");
    console.log("   ✅ USDC.e BRIDGE DEPLOYMENT COMPLETE");
    console.log("=========================================");
    console.log(`USDCePrivacyBridge: ${bridgeAddr}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
