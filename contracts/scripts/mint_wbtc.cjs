const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const WBTC_ADDRESS = "0xC1f3d4b1507a7925E598857CBE3418ab6B521c50";
    const RECIPIENT = "0xab81c57ccc578a5636bff47b896bec6af1c30012";
    // WBTC has 8 decimals
    const AMOUNT = ethers.parseUnits("100", 8);

    console.log("===========================================");
    console.log("   💰 MINTING WBTC");
    console.log("===========================================");
    console.log(`WBTC Contract: ${WBTC_ADDRESS}`);
    console.log(`Recipient: ${RECIPIENT}`);
    console.log(`Amount: 100 WBTC (${AMOUNT.toString()} with 8 decimals)`);

    const [signer] = await ethers.getSigners();
    console.log(`\nUsing signer: ${signer.address}`);

    // WBTC ABI for mint function
    const WBTC_ABI = [
        "function mint(address to, uint256 amount) external returns (bool)",
        "function balanceOf(address account) external view returns (uint256)"
    ];

    const wbtc = new ethers.Contract(WBTC_ADDRESS, WBTC_ABI, signer);

    console.log("\nMinting 100 WBTC...");
    const tx = await wbtc.mint(RECIPIENT, AMOUNT, { gasLimit: 5000000 });
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log("✅ Minting complete!");

    // Check balance
    const balance = await wbtc.balanceOf(RECIPIENT);
    console.log(`\nNew WBTC balance: ${ethers.formatUnits(balance, 8)} WBTC`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
