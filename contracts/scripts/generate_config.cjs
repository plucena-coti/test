
const fs = require('fs');
const path = require('path');

const bridgePath = 'artifacts/contracts/privateERC20/privacyBridge/PrivacyBridgeCotiNative.sol/PrivacyBridgeCotiNative.json';
const tokenPath = 'artifacts/contracts/privateERC20/tokens/PrivateCoti.sol/PrivateCoti.json';

try {
  const bridgeArtifact = JSON.parse(fs.readFileSync(bridgePath, 'utf8'));
  const tokenArtifact = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));

  const content = `export const CONTRACT_ADDRESSES = {
  // COTI Testnet
  7082400: {
    // Native
    PrivateCoti: "0x201A6079161Ba865C4D34Ea72A4F054a64F7424c",
    PrivacyBridgeCotiNative: "0xD00428ef13910598cC6c426EAB18167c02133305",

    // Public Tokens
    WETH: "0xC5BE4139a46899e4962646fB213B4646B19446E1",
    WBTC: "0x037eB72E9f86Cd1531B234Acb10856C74127d1fa",
    USDT: "0x87eBEbfa6A7cc04CB33b7E52910564Cc3Ba07E9E",
    USDC_E: "0x8acE7F0798FCE334003dDcD0c0fB03f04b4B950E",
    WADA: "0x49B5809EaA3E47A5F961C4B11f6fA8E8589cBdE3",
    gCOTI: "0x95566104629E84A2cDe4b22CFeED4dC35DA93BE3",

    // Private Tokens
    "p.WETH": "0x7e8DF7daA8FD0E373823C2f0843660B9baf05D8A",
    "p.WBTC": "0xE5435fAD2b53Df0616A8D0cFFfE1646b202E8E58",
    "p.USDT": "0x064171DCE763EbD03F17686799972f5E960eAdF2",
    "p.USDC_E": "0xA3D1876c2eAC6d7A2B463C942C66AaC516cFC6c9",
    "p.WADA": "0x6519165F51cc095064330d6A505155Fac38316C9",
    "p.gCOTI": "0xcd3Fb499456C56D6C80F8Fc876C8fFE2553130Fd",

    // Bridges
    PrivacyBridgeWETH: "0x45cab89cF303793738aeAc99Bf6343F5076F35fb",
    PrivacyBridgeWBTC: "0xCd07126D4b014B63D5F1C522313A86bB871D91aD",
    PrivacyBridgeUSDT: "0x87170c2116d442f02605c42Ed91e39bF4316aD7D",
    PrivacyBridgeUSDCe: "0x86c870F079C942D32D33F66d65a6813850697228",
    PrivacyBridgeWADA: "0x92E91B4982485b0Ded545bC9A1059e1faa2Ae42f",
    PrivacyBridgegCOTI: "0xB0850498eb6938C3C388B715C03b37610497a9ed"
  },
  // COTI Mainnet
  2632500: {
    PrivateCoti: "0x143705349957A236d74e0aDb5673F880fEDB101f",
    PrivacyBridgeCotiNative: "0x6056bFE6776df4bEa7235A19f6D672089b4cdBeB",

    // Public Tokens
    WETH: "0x639aCc80569c5FC83c6FBf2319A6Cc38bBfe26d1",
    WBTC: "0x8C39B1fD0e6260fdf20652Fc436d25026832bfEA",
    USDC_E: "0xf1Feebc4376c68B7003450ae66343Ae59AB37D3C",
    gCOTI: "0x7637C7838EC4Ec6b85080F28A678F8E234bB83D1",
    USDT: "0xfA6f73446b17A97a56e464256DA54AD43c2Cbc3E",
    WADA: "0xe757Ca19d2c237AA52eBb1d2E8E4368eeA3eb331"
  }
};

export const BRIDGE_ABI = ${JSON.stringify(bridgeArtifact.abi, null, 2)} as const;

export const TOKEN_ABI = ${JSON.stringify(tokenArtifact.abi, null, 2)} as const;

export const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
] as const;

export interface TokenConfig {
  symbol: string;
  name: string;
  icon: string;
  decimals: number;
  isPrivate: boolean;
  addressKey?: string; // Key in CONTRACT_ADDRESSES[chainId]
  bridgeAddressKey?: string; // Key in CONTRACT_ADDRESSES[chainId]
}

export const SUPPORTED_TOKENS: TokenConfig[] = [
  // Public Tokens
  { symbol: "COTI", name: "COTI", icon: "/icons/coti.svg", decimals: 18, isPrivate: false }, // Native, no address key needed
  { symbol: "WETH", name: "Wrapped Ether", icon: "/icons/wETH.svg", decimals: 18, isPrivate: false, addressKey: "WETH", bridgeAddressKey: "PrivacyBridgeWETH" },
  { symbol: "WBTC", name: "Wrapped BTC", icon: "/icons/wBTC.svg", decimals: 8, isPrivate: false, addressKey: "WBTC", bridgeAddressKey: "PrivacyBridgeWBTC" },
  { symbol: "USDT", name: "Tether USD", icon: "/icons/usdt.svg", decimals: 6, isPrivate: false, addressKey: "USDT", bridgeAddressKey: "PrivacyBridgeUSDT" },
  { symbol: "USDC.e", name: "Bridged USDC", icon: "/icons/USDC.svg", decimals: 6, isPrivate: false, addressKey: "USDC_E", bridgeAddressKey: "PrivacyBridgeUSDCe" },
  { symbol: "WADA", name: "Wrapped ADA", icon: "/icons/wADA.svg", decimals: 6, isPrivate: false, addressKey: "WADA", bridgeAddressKey: "PrivacyBridgeWADA" },
  { symbol: "gCOTI", name: "gCOTI", icon: "/icons/gcoti.svg", decimals: 18, isPrivate: false, addressKey: "gCOTI", bridgeAddressKey: "PrivacyBridgegCOTI" },

  // Private Tokens
  { symbol: "p.COTI", name: "p.COTI", icon: "/icons/coti.svg", decimals: 18, isPrivate: true, addressKey: "PrivateCoti", bridgeAddressKey: "PrivacyBridgeCotiNative" },
  { symbol: "p.WETH", name: "p.WETH", icon: "/icons/wETH.svg", decimals: 18, isPrivate: true, addressKey: "p.WETH", bridgeAddressKey: "PrivacyBridgeWETH" },
  { symbol: "p.WBTC", name: "p.WBTC", icon: "/icons/wBTC.svg", decimals: 8, isPrivate: true, addressKey: "p.WBTC", bridgeAddressKey: "PrivacyBridgeWBTC" },
  { symbol: "p.USDT", name: "p.USDT", icon: "/icons/usdt.svg", decimals: 6, isPrivate: true, addressKey: "p.USDT", bridgeAddressKey: "PrivacyBridgeUSDT" },
  { symbol: "p.USDC.e", name: "p.USDC.e", icon: "/icons/USDC.svg", decimals: 6, isPrivate: true, addressKey: "p.USDC_E", bridgeAddressKey: "PrivacyBridgeUSDCe" },
  { symbol: "p.WADA", name: "p.WADA", icon: "/icons/wADA.svg", decimals: 6, isPrivate: true, addressKey: "p.WADA", bridgeAddressKey: "PrivacyBridgeWADA" },
  { symbol: "p.gCOTI", name: "p.gCOTI", icon: "/icons/gcoti.svg", decimals: 18, isPrivate: true, addressKey: "p.gCOTI", bridgeAddressKey: "PrivacyBridgegCOTI" },
];
`;

  fs.writeFileSync('src/contracts/config.ts', content);
  console.log('src/contracts/config.ts generated successfully.');

} catch (err) {
  console.error('Error generating config:', err);
  process.exit(1);
}
