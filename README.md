# COTI PrivacyPortal

The COTI Privacy Portal allows you to convert your public ERC20 tokens into Private Tokens. These private tokens are stored securely via the COTI MetaMask Snap and can be transferred between COTI wallets with full privacy regarding transaction amounts.

## About the Project

The **COTI Portal Bridge** enables:

| Feature                           | Description                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒**Confidentiality as a Service** | Lock public assets and mint private, encrypted equivalents (e.g.,`USDC` → `p.USDC`)                                                            |
| 🛡️**Encrypted Operations**         | Private tokens can be held and transacted with complete privacy—amounts and balances remain encrypted on-chain, visible only to the key holder |
| 🔗**Seamless Integration**         | COTI Snaps bridge the gap between complex cryptography and everyday UX, managing keys securely within MetaMask                                 |

## Supported Tokens

The Portal currently supports the following tokens:

| Public Token | Private Token | Decimals | Type   |
| ------------ | ------------- | -------- | ------ |
| **COTI**     | p.COTI        | 18       | Native |
| **WETH**     | p.WETH        | 18       | ERC20  |
| **WBTC**     | p.WBTC        | 8        | ERC20  |
| **USDT**     | p.USDT        | 6        | ERC20  |
| **USDC.e**   | p.USDC.e      | 6        | ERC20  |
| **WADA**     | p.WADA        | 18       | ERC20  |
| **gCOTI**    | p.gCOTI       | 18       | ERC20  |

## Prerequisites

Before you begin, ensure you have:

1.  **MetaMask installed in your browser.**
2.  **[COTI Network configured in MetaMask](../networks/mainnet/adding-the-coti-mainnet-to-metamask.md).** The Portal will prompt you to add it if needed.
3.  **The COTI Snap configured in MetaMask.** Please follow [COTI MetaMask Snap installation](https://dev.metamask.coti.io) instructions.
4.  **Some native COTI for transaction fees.**

## Getting Started

### Step 1: Connect Your Wallet

1.  Visit the [COTI Privacy Portal](https://privacy.coti.io).
2.  Click **Connect Wallet**.
3.  Authorize the connection in the MetaMask popup.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FAWGlIYPCGHqFjgZqND9M%252Fconnect_metamask.png%3Falt%3Dmedia%26token%3D1f9c3e2e-cf3a-49bc-95f1-ce89eab3fb97&width=300&dpr=3&quality=100&sign=42341df5&sv=2" alt="Connect MetaMask" style="max-width: 300px; width: 100%;" />
</div>

Once connected, your Public Token balances (like COTI, WETH, and USDT) will appear in the Public Tokens list.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FvOgCnbSsOkPG0siG2sM7%252Fpublic_tokens.png%3Falt%3Dmedia%26token%3D4d0bd948-fe42-46ba-9117-28265d8defdc&width=768&dpr=3&quality=100&sign=daba71c3&sv=2" alt="Public Tokens" style="max-width: 600px; width: 100%;" />
</div>

{% hint style="info" %}
**Tip:** Use the search bar to quickly find a specific token.
{% endhint %}

## Viewing Private Balances

Your Private Token balances are encrypted and hidden by default. To view them:

### Step 2: Unlock Private Tokens

1.  Click the **Unlock** button on the Private Tokens card.
2.  MetaMask will prompt you to authorize access to your security key.
3.  Once unlocked, your decrypted private balances will be displayed.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252Fb2r9DCtrGVvWknircNjS%252Funlock_balance.png%3Falt%3Dmedia%26token%3D5a97097d-fdcc-4593-8462-6cd864f557a5&width=768&dpr=3&quality=100&sign=bfdb90b5&sv=2" alt="Unlock Balance" style="max-width: 600px; width: 100%;" />
</div>

{% hint style="warning" %}
**Privacy Note:** The Private Token balances are encrypted on the blockchain. They are decrypted locally in your browser using your personal AES key stored in the COTI Snap. No one else can see your balances.
{% endhint %}

## Converting Tokens

The Portal supports two conversion flows:

*   **Portal In:** Public → Private (Deposit)
*   **Portal Out:** Private → Public (Withdraw)

### Portal In: Public → Private

Convert your standard public tokens into privacy-preserving private tokens.

#### Step 3: Authorize the Conversion (ERC20 Only)

If you are depositing ERC20 tokens (not native COTI), you must first approve the Portal to access your tokens:

1.  Select your desired token from the Public Tokens list.
2.  Enter the amount you wish to convert.
3.  Click **Approve**.
4.  Confirm the Spending Cap approval in MetaMask.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FqQg6LMhZ4wQixWLu5dBP%252Fapprove_spending.png%3Falt%3Dmedia%26token%3Dcda14674-65e6-4348-bbab-55eb4f1b4e2d&width=768&dpr=3&quality=100&sign=6ed6f7c6&sv=2" alt="Approve Spending" style="max-width: 600px; width: 100%;" />
</div>

{% hint style="info" %}
**Note:** For native COTI, you can skip the approval step.
{% endhint %}

#### Step 4: Convert to Private

1.  After approval, click **Portal In**.
2.  Confirm the transaction in MetaMask.
3.  Wait for the transaction to be mined.
4.  Your new Private Tokens will appear in the Private Tokens list.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FgOvlh33BGA1pnu2UG5oe%252Fprivate_tokens.png%3Falt%3Dmedia%26token%3D323ec9e4-59da-4960-be09-73755483493b&width=768&dpr=3&quality=100&sign=a133ac20&sv=2" alt="Private Tokens" style="max-width: 600px; width: 100%;" />
</div>

### Portal Out: Private → Public

Convert your private tokens back to standard public tokens.

#### Step 5: Withdraw Tokens

1.  Ensure your private balances are unlocked (see [Step 2](#step-2-unlock-private-tokens)).
2.  Select a token from the Private Tokens list.
3.  Enter the amount you wish to convert.
4.  Click **Portal Out**.
5.  Confirm the transaction in MetaMask.
6.  Your public tokens will be returned to your wallet.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FiWafPqJvFtkgjfEZgIuf%252Fportal_out.png%3Falt%3Dmedia%26token%3D53923de9-d2b9-42d7-b805-02f4f186ec65&width=768&dpr=3&quality=100&sign=18682531&sv=2" alt="Portal Out" style="max-width: 600px; width: 100%;" />
</div>

## Adding Private Tokens to MetaMask

To view your private token balances directly within the COTI MetaMask Snap:

1.  In MetaMask, navigate to **Snaps → COTI**.
2.  Select **Import Token**.
3.  Copy the **Contract Address** from the Private Tokens list in the Portal (via the copy icon).
4.  Paste the contract address and confirm.

<div align="center">
  <img src="https://docs.coti.io/coti-documentation/~gitbook/image?url=https%3A%2F%2F2557786554-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FeC83qbrBhITO4kE7kTNB%252Fuploads%252FJVYyo0zpgT982DuOvdL7%252Fsnap_balance.png%3Falt%3Dmedia%26token%3D10c4ff9e-018b-4fb3-b7aa-8736fafa1497&width=768&dpr=3&quality=100&sign=834e91a&sv=2" alt="Snap Balance" style="max-width: 600px; width: 100%;" />
</div>

Your private token will now appear in your COTI Snap wallet view.

## Troubleshooting

### Connection Issues
If the "Connect Wallet" button is unresponsive:
1.  Refresh the page.
2.  Unlock your MetaMask extension manually.
3.  Check that you are on the correct network (COTI Mainnet/Testnet).
4.  **MetaMask Cache**: Try clearing your MetaMask activity data if issues persist (Settings → Advanced → Clear Activity Tab Data).

### Snap Issues
If the COTI Snap is not responding:
1.  Go to MetaMask Settings -> Snaps.
2.  Select "COTI".
3.  Remove the Snap and try connecting again to reinstall it.

### Transaction Issues
If your transaction fails:
1.  **Insufficient Funds**: Ensure you have enough **native COTI** for gas fees, separate from the token you are bridging.
2.  **Private Balance Not Updating**:
    *   Ensure you have clicked **Unlock Private Tokens** on the card.
    *   Verify the transaction is confirmed on the block explorer.


## FAQ

**Q: What happens if I send ERC20 tokens directly to the bridge contract?**
A: {% hint style="danger" %}
**Do not do this!** Tokens sent directly via `transfer()` will be stuck. You must use the Portal to deposit tokens (Approve + Portal In).
{% endhint %}

**Q: Can I send native COTI directly to the bridge?**
A: Yes! If you transfer native COTI directly to the `PrivacyBridgeCotiNative` [contract address](../networks/mainnet/contracts-addresses.md), it will be automatically converted to Private COTI. However, using the Portal is recommended for a better experience.

**Q: Is my AES key stored securely?**
A: Yes. Your AES key is generated during onboarding and stored securely within the COTI MetaMask Snap. It never leaves your browser.
