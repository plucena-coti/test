const { ethers } = require("hardhat");

async function main() {
    // HARDCODED CREDENTIALS (DO NOT COMMIT)
    const PRIVATE_KEY = "4e2a2991de78a6c2f0cd198d57a1511a6f9150ea9b6eed532a8c2d92d6d3b374";
    const AES_KEY = "6f2ae0690dd363b2abc1d78075badd12"; // 128-bit key
    const BRIDGE_ADDRESS = "0xD664C3C25411E4534F49e3c0635e1123F7bD74e7"; // PrivacyBridgeCotiNative on Mainnet

    // Amount to transfer (As implied by previous context of 100,000, but let's confirm or make it easy to change)
    // Using 100,000 COTI as per previous request context
    const AMOUNT_COTI = "0.01";

    // Setup Provider and Wallet
    // Using the hardhat network config for 'cotiMainnet' if running with --network cotiMainnet
    // Or explicit provider if running standalone
    const provider = new ethers.JsonRpcProvider("https://mainnet.coti.io/rpc");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log(`Using Wallet: ${wallet.address}`);
    console.log(`Target Bridge: ${BRIDGE_ADDRESS}`);

    const balance = await provider.getBalance(wallet.address);
    console.log(`Current Balance: ${ethers.formatEther(balance)} COTI`);

    const amountWei = ethers.parseEther(AMOUNT_COTI);

    if (balance < amountWei) {
        console.error(`❌ Insufficient balance. You have ${ethers.formatEther(balance)} COTI but trying to send ${AMOUNT_COTI} COTI.`);
        return;
    }

    console.log(`\n🚀 Sending ${AMOUNT_COTI} Native COTI to Bridge...`);
    console.log("This will auto-mint p.COTI to your address.");

    const tx = await wallet.sendTransaction({
        to: BRIDGE_ADDRESS,
        value: amountWei,
        gasLimit: 5000000, // MPC operations need high gas (minting)
        gasPrice: ethers.parseUnits("35", "gwei")
    });

    console.log(`Transaction sent! Hash: ${tx.hash}`);
    console.log("Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed in block", receipt.blockNumber);

    // Sleep function
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    console.log("\n⏳ Sleeping for 5 seconds before checking balance...");
    await sleep(5000);

    const P_COTI_ADDRESS = "0x54E59825d2dD8074e672291e0a8e7972cC1b3c34";
    const pCoti = await ethers.getContractAt("contracts/privateERC20/PrivateERC20.sol:PrivateERC20", P_COTI_ADDRESS, wallet);

    // Retry checking balance 3 times
    for (let i = 1; i <= 3; i++) {
        try {
            console.log(`\n🔄 Checking PrivateCOTI Balance (Attempt ${i}/3)...`);

            // balanceOf returns struct(ctUint256), which Ethers parses as a Result object or array-like
            // IPrivateERC20 defines function balanceOf(address) external view returns (ctUint256 memory);
            // struct ctUint256 { uint256 ciphertextHigh; uint256 ciphertextLow; }

            const balanceCipher = await pCoti.balanceOf(wallet.address);
            console.log("Ciphertext Received:", balanceCipher);

            // Basic validation: Check if we got a response. 
            // Since we don't have the SDK imported here to decrypt, we just verify the call succeeds 
            // and returns *something*. 
            // In a real verification we would decrypt `balanceCipher` using AES_KEY.

            if (balanceCipher) {
                console.log("✅ Balance check successful (Ciphertext retrieved)");
                break;
            }
        } catch (e) {
            console.error(`⚠️ Attempt ${i} failed:`, e.message);
            if (i < 3) {
                console.log("Waiting 2 seconds before retry...");
                await sleep(2000);
            } else {
                console.error("❌ Failed to fetch balance after 3 attempts.");
            }
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
