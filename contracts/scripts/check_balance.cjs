const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    const USER = "0xAb81c57CCc578a5636BFF47B896BEC6Af1c30012";
    // WETH Address from config.ts - normalized
    const WETH_ADDRESS = "0xC5BE4139a46899e4962646fB213B4646B19446E1".toLowerCase();

    console.log(`Checking WETH balance for: ${USER}`);
    console.log(`Contract: ${WETH_ADDRESS}`);

    const abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)"
    ];

    const provider = ethers.provider;
    const contract = new ethers.Contract(WETH_ADDRESS, abi, provider);

    try {
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const balance = await contract.balanceOf(USER);

        console.log(`Connected to ${symbol} (Decimals: ${decimals})`);
        console.log(`Raw Balance: ${balance.toString()}`);
        console.log(`Formatted Balance: ${ethers.formatUnits(balance, decimals)}`);
    } catch (e) {
        console.error("Error fetching balance:", e.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
