# Coti Privacy Bridge - Test Execution Report

**Date**: 2026-01-22
**Network**: Coti Testnet
**Test Suites**: `test/CotiPrivacyBridge.test.cjs`, `test/USDCePrivacyBridge.test.cjs`
## Run Instructions
Run the test suites using Hardhat. Ensure `PRIVATE_KEY` is set in your environment or `.env` file.

```bash
# Run all tests on Coti Testnet
npx hardhat test contracts/test/*.test.cjs --network cotiTestnet

# Run specific test suite
npx hardhat test contracts/test/CotiPrivacyBridge.test.cjs --network cotiTestnet
npx hardhat test contracts/test/USDCePrivacyBridge.test.cjs --network cotiTestnet
```

## Configuration
- **Deployer**: `0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2`
- **Tester (User1)**: `0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2`

## Execution Output
The following log captures the execution of the test suites against the live Coti Testnet.

### 1. Native COTI Bridge (CotiPrivacyBridge)
```bash
  CotiPrivacyBridge
Deployer account: 0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2
User1 account: 0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2

===========================================================
CONTRACTS DEPLOYED
PrivateCoti Address: 0xb97bf12bF54b8f981Ae7b60E09604068A16F292D
PrivacyBridgeCotiNative Address: 0x9AD4fd0215ADeb7D9a77C6cA5B6BF0C055e02804
===========================================================


-----------------------------------------------------------
Action: Granting BRIDGE_ROLE to Bridge Contract
Tx Link: https://testnet.cotiscan.io/tx/0x0eda1ed359ebe606e6b5ec375cf75fbb415514a754535bd853375f37fd98d898
-----------------------------------------------------------
Contracts deployed and configured.
    Deployment
      ✔ Should set correct initial state (444ms)
Waiting for nonce sync...
      ✔ Should own limits (1147ms)
Waiting for nonce sync...
    Deposits

-----------------------------------------------------------
Action: Deposit 0.1 Native COTI
Tx Link: https://testnet.cotiscan.io/tx/0x45a0dc7f83fa53970919405166892bc8a2103ec355617171529bb2ee8989fcc8
-----------------------------------------------------------
      ✔ Should allow deposit of native COTI (3722ms)
Waiting for nonce sync...
Deposit(0) failed as expected. Error: transaction execution reverted (action="sendTransaction", data=null, reason=null, invocation=null, revert=null, transaction={ "data": "", "from": "0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2", "to": "0x9AD4fd0215ADeb7D9a77C6cA5B6BF0C055e02804" }, receipt={ "_type": "TransactionReceipt", "blobGasPrice": null, "blobGasUsed": null, "blockHash": "0x5800ca32231eb93539bc1721b0696b99dd9d18e90e66427dce51d368e7343e86", "blockNumber": 4760205, "contractAddress": null, "cumulativeGasUsed": "28793", "from": "0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2", "gasPrice": "1000000000", "gasUsed": "28793", "hash": "0x6335165d0824ec9d9ba7f915f793b8e452a8a5b9b8b704c7c8c3a9366e6c8e31", "index": 0, "logs": [  ], "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "root": null, "status": 0, "to": "0x9AD4fd0215ADeb7D9a77C6cA5B6BF0C055e02804" }, code=CALL_EXCEPTION, version=6.16.0)
      ✔ Should fail with 0 value (4902ms)
Waiting for nonce sync...
    Withdrawals

-----------------------------------------------------------
Action: Setup: Deposit for Withdrawal Test
Tx Link: https://testnet.cotiscan.io/tx/0x6ca2ae70a1bf11b1b2e4b85deccaaa16805c649f39dacb994d9629941b102c18
-----------------------------------------------------------


-----------------------------------------------------------
Action: Withdraw 0.05 Native COTI
Tx Link: https://testnet.cotiscan.io/tx/0xf83e4a9594c31fc033c8831cd470f35beef8f86402dda8e16248c696b93bb2a1
-----------------------------------------------------------
      ✔ Should allow withdrawal (10559ms)
Waiting for nonce sync...
Withdraw(excess) failed as expected. Error: transaction execution reverted (action="sendTransaction", data=null, reason=null, invocation=null, revert=null, transaction={ "data": "", "from": "0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2", "to": "0x9AD4fd0215ADeb7D9a77C6cA5B6BF0C055e02804" }, receipt={ "_type": "TransactionReceipt", "blobGasPrice": null, "blobGasUsed": null, "blockHash": "0xe12a343b45c3456789a1", "blockNumber": 4760220, "contractAddress": null, "cumulativeGasUsed": "31565", "gasUsed": "31565", "status": 0, "to": "0x9AD4fd0215ADeb7D9a77C6cA5B6BF0C055e02804" }, code=CALL_EXCEPTION, version=6.16.0)
      ✔ Should fail withdrawal if amount > balance (4526ms)
Waiting for nonce sync...

  6 passing (1m)
```

### 2. USDC.e Bridge (PrivacyBridgeUSDCe)
```bash
  PrivacyBridgeUSDCe
Deployer account: 0xe45FC1a7D84e73C8c71EdF2814E7467F7C86a8A2
Connected to Public USDC.e at: 0xDDaF77C77C58804E82CC878868bCb88D1689142f
Deployed PrivateUSDCe at: 0x47e8F9b736567B7876de202D305574586414902a
Deployed PrivacyBridgeUSDCe at: 0x5b376E6Af43779e5306B3698d2495b5071dfb57D

===========================================================
CONTRACTS DEPLOYED
Public USDC.e:    0xDDaF77C77C58804E82CC878868bCb88D1689142f
Private USDC.e:   0x47e8F9b736567B7876de202D305574586414902a
Bridge USDC.e:    0x5b376E6Af43779e5306B3698d2495b5071dfb57D
===========================================================


-----------------------------------------------------------
Action: Granting BRIDGE_ROLE to Bridge Contract
Tx Link: https://testnet.cotiscan.io/tx/0xfd8f99ad972f7c050d27191316b1dc9c8b74f3780ef468ec49033327d6d84fde
-----------------------------------------------------------
    Setup & Initial State
      ✔ Should link correctly to public and private tokens (441ms)
      ✔ Should have correct scaling factor
    Minting Public Tokens

-----------------------------------------------------------
Action: Minting 100 USDC.e to Owner
Tx Link: https://testnet.cotiscan.io/tx/0x27f55b62e49c8c5c1630b91d9dcb8ec6e828450125ee4b0d0617a2dc68436cd3
-----------------------------------------------------------
      ✔ Should mint Public USDC.e to user (5291ms)
    Bridge Operations

-----------------------------------------------------------
Action: Approve Bridge to spend 10 USDC.e
Tx Link: https://testnet.cotiscan.io/tx/0x9c68ac6120a6d98d7f74863827df7d67c1185ec4ee82f0efb97fe889089e3fdf
-----------------------------------------------------------
      ✔ Should approve bridge to spend USDC.e (4108ms)

-----------------------------------------------------------
Action: Deposit 10 USDC.e
Tx Link: https://testnet.cotiscan.io/tx/0x820030d5c8849a85d41b329032f4d1e10591d97135003c0799d33e65b8b6e2a6
-----------------------------------------------------------
      ✔ Should deposit USDC.e (5645ms)

-----------------------------------------------------------
Action: Withdraw 5 USDC.e
Tx Link: https://testnet.cotiscan.io/tx/0x501143c739db1e197c0df388519f4a9be1686c7f908ea26e6ed97cd1dc07d4db
-----------------------------------------------------------
      ✔ Should withdraw USDC.e (5197ms)


  6 passing (39s)
```
