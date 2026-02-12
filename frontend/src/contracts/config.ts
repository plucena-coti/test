export const CONTRACT_ADDRESSES = {
  // COTI Testnet
  7082400: {
    // Native
    PrivateCoti: "0x8783dc215B8305Ea714f91ac16f8Dc5580612353",
    PrivacyBridgeCotiNative: "0x36Ad8Fb2179b41615ea14607e9b629c6eD67f961",

    // Public Tokens
    WETH: "0x1Ef7E9e33549d394418b03152984e64388A4EE56",
    WBTC: "0xa36e2AD641D3e69e482aA774363A92A1F9e937f0",
    USDT: "0xE0EaDda074c3B5D0808CC97EbD765B5631355226",
    USDC_E: "0xdc853f1A4Fd06B118726B3c097CEaD27E47e9Ba3",
    WADA: "0xAad069A539001920712489C8FF796f1444E7394e",
    gCOTI: "0x7AC988eb3E45fe6ADB05DFaf609c8DBb4A902cdC",

    // Private Tokens
    "p.WETH": "0xDC6CE223045E6FB178EEBb3FC481CF08B6de0E96",
    "p.WBTC": "0xFd16726f8CdD27f466a8D924dd8904F5E3Cc9ac3",
    "p.USDT": "0xdbD2504F5cB3f9C7cD8D0CD0Eb17Cc7Cd4De8dB9",
    "p.USDC_E": "0x19B905988A700394565E90Db7A13D5b7dF76c418",
    "p.WADA": "0x67316009e27f6Ec3bACfe51aA3D343ad619fd7cb",
    "p.gCOTI": "0xcB4296790bf4313297115be56FdbA0584A0e5b6A",

    // Bridges
    PrivacyBridgeWETH: "0xABB2B7836a69caE4180fED52C1Ce4C84642c1A6C",
    PrivacyBridgeWBTC: "0x76aC6086fC02BE90210a71dDC826154F33c7424E",
    PrivacyBridgeUSDT: "0x1D95A3b3edAbff67C602745b322A4937b027CC36",
    PrivacyBridgeUSDCe: "0xA768B13de38992Ad5820169CEF68C9674d6d61F4",
    PrivacyBridgeWADA: "0x5953c3E5F8866c4FA6b026e066577586aE007EC9",
    PrivacyBridgegCOTI: "0x7e240b464C6F1e1F7De782D1Cc7818f60b7Cd808"
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

export const BRIDGE_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_privateCoti",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AmountZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositBelowMinimum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositExceedsMaximum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EthTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientEthBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLimitConfiguration",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WithdrawBelowMinimum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WithdrawExceedsMaximum",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minWithdraw",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxWithdraw",
        "type": "uint256"
      }
    ],
    "name": "LimitsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBridgeBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxDepositAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxWithdrawAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minDepositAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minWithdrawAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "onTokenReceived",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "privateCoti",
    "outputs": [
      {
        "internalType": "contract PrivateCoti",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescueNative",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minWithdraw",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxWithdraw",
        "type": "uint256"
      }
    ],
    "name": "setLimits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;

export const BRIDGE_ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_privateToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AmountTooLarge",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AmountTooSmall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AmountZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositBelowMinimum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositExceedsMaximum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EthTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientBridgeLiquidity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientEthBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLimitConfiguration",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPrivateTokenAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidScalingFactor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTokenAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTokenSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WithdrawBelowMinimum",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WithdrawExceedsMaximum",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minWithdraw",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxWithdraw",
        "type": "uint256"
      }
    ],
    "name": "LimitsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxDepositAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxWithdrawAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minDepositAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minWithdrawAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "onTokenReceived",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "privateTokenAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescueERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxDeposit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minWithdraw",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxWithdraw",
        "type": "uint256"
      }
    ],
    "name": "setLimits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const TOKEN_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "neededRole",
        "type": "bytes32"
      }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct ctUint256",
        "name": "ownerValue",
        "type": "tuple"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct ctUint256",
        "name": "spenderValue",
        "type": "tuple"
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
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct ctUint256",
        "name": "senderValue",
        "type": "tuple"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct ctUint256",
        "name": "receiverValue",
        "type": "tuple"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINTER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "accountEncryptionAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isSpender",
        "type": "bool"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct gtUint256",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "ciphertext",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "ownerCiphertext",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "spenderCiphertext",
            "type": "tuple"
          }
        ],
        "internalType": "struct IPrivateERC20.Allowance",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "ciphertext",
            "type": "tuple"
          },
          {
            "internalType": "bytes[2][2]",
            "name": "signature",
            "type": "bytes[2][2]"
          }
        ],
        "internalType": "struct itUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct gtUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "ctUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "ctUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct ctUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct ctUint256",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct gtUint256",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isSpender",
        "type": "bool"
      }
    ],
    "name": "reencryptAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "offBoardAddress",
        "type": "address"
      }
    ],
    "name": "setAccountEncryptionAddress",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct gtUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "gtBool",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "ciphertext",
            "type": "tuple"
          },
          {
            "internalType": "bytes[2][2]",
            "name": "signature",
            "type": "bytes[2][2]"
          }
        ],
        "internalType": "struct itUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "gtBool",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "transferAndCall",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "high",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "ctUint64",
                    "name": "high",
                    "type": "uint256"
                  },
                  {
                    "internalType": "ctUint64",
                    "name": "low",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct ctUint128",
                "name": "low",
                "type": "tuple"
              }
            ],
            "internalType": "struct ctUint256",
            "name": "ciphertext",
            "type": "tuple"
          },
          {
            "internalType": "bytes[2][2]",
            "name": "signature",
            "type": "bytes[2][2]"
          }
        ],
        "internalType": "struct itUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "gtBool",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "high",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "gtUint64",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "gtUint64",
                "name": "low",
                "type": "uint256"
              }
            ],
            "internalType": "struct gtUint128",
            "name": "low",
            "type": "tuple"
          }
        ],
        "internalType": "struct gtUint256",
        "name": "value",
        "type": "tuple"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "gtBool",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

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

/**
 * Minimum transaction amounts for Portal In operations
 * These values prevent dust transactions and ensure efficient bridging
 */
export const MINIMUM_PORTAL_IN_AMOUNTS: Record<string, string> = {
  'WBTC': '0.0000145',
  'WETH': '0.000497',
  'WADA': '4',
  'COTI': '82',
  'gCOTI': '390',
  'USDT': '1',
  'USDC.e': '1'
};
