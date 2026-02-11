# Contracts Scripts

This directory contains utility scripts for deploying, verifying, and managing the Coti Privacy Bridge contracts.

## 🚀 Key Deployment Scripts

| Script | Description |
| :--- | :--- |
| `deploy_tokens_and_bridges.cjs` | **Primary Testnet Deployment**. Deploys WETH, WBTC, their private counterparts (PrivateWETH, PrivateBTC), and the corresponding privacy bridges. Grants necessary bridge roles. |
| `deploy_mainnet.cjs` | **Primary Mainnet Deployment**. Deploys PrivateWETH and PrivacyBridgeWETH on Mainnet, using an existing WETH address (defined in `.env`). |
| `deploy.cjs` | General deployment script (likely deprecated in favor of specific flow scripts). |

## 🧪 Tests & Simulations

These scripts simulate user actions or test specific contract logic off-chain or on-chain without a full deployment flow.

| Script | Description |
| :--- | :--- |
| `test-deposit.cjs` | Simulates a deposit transaction to test bridge mechanics. |
| `check_payable.cjs` | Tests if a specific address (e.g., WETH) accepts native COTI transfers (simulates `receive`/`fallback`). |
| `check_proxy.cjs` | Inspects storage slots of a contract to verify standard ERC1967/OpenZeppelin proxy implementations. |
| `check_selectors.cjs` | Verifies function selectors against expected ABI signatures. |
| `verify_aes_key.cjs` | Tests or verifies AES key generation/validation logic (likely for MPC interaction). |
| `verify_role.cjs` | Checks if a specific address holds a required role (e.g., `BRIDGE_ROLE`) on a contract. |

## 🔍 Verification & Checks

| Script | Description |
| :--- | :--- |
| `verify-deployment.cjs` | Verifies deployed contracts on-chain, checking roles and configurations. |
| `verify.cjs` | Runs Etherscan/Blockscout verification for contracts. |
| `check-balance.cjs` | Checks token balances for a specific address. |
| `check-bridge-config.cjs` | Validates bridge configuration settings. |

## 🛠️ Utilities

| Script | Description |
| :--- | :--- |
| `mint_test_tokens.cjs` | Mints test tokens (Public & Private) for development/testing. |
| `grant-bridge-role.cjs` | Grants the `BRIDGE_ROLE` to a specific address on a private token. |
| `grant-user-role.cjs` | Grants user roles (if applicable). |
| `generate-standard-json.cjs` | Generates standard JSON input for verification if needed. |

## 🐛 Debugging

| Script | Description |
| :--- | :--- |
| `debug_*.cjs` | Various scripts for debugging specific issues (e.g., `debug_coti_network.cjs`, `debug_mainnet_calls.cjs`). |
| `diagnose-bridge.cjs` | Diagnoses common bridge issues. |

## Usage

Run scripts using `npx hardhat run` or `node`:

```bash
# Example: Deploy to COTI Testnet
npx hardhat run contracts/scripts/deploy_tokens_and_bridges.cjs --network cotiTestnet

# Example: Check Balance
npx hardhat run contracts/scripts/check-balance.cjs --network cotiTestnet
```
