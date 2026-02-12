import { useCallback } from 'react';
import { ethers } from 'ethers';
import * as CotiSDK from '@coti-io/coti-sdk-typescript';
const { decryptUint256 } = CotiSDK;

export const useFetchPrivateBalance = () => {
    const fetchPrivateBalance = useCallback(async (
        userAddress: string,
        aesKey: string,
        currentChainIdOrAddress: number | string,
        isDirectAddress: boolean = false,
        decimals: number = 18
    ): Promise<string> => {
        console.log(`🔍 fetchPrivateBalance CALLED for ${currentChainIdOrAddress} (Direct: ${isDirectAddress})`);

        if (!window.ethereum || !aesKey) {
            console.log('❌ Missing ethereum or aesKey');
            return '0.00';
        }

        console.log(`🔍 fetchPrivateBalance START for ${currentChainIdOrAddress} (isDirect=${isDirectAddress})`);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            let contractAddress: string | undefined;

            if (isDirectAddress) {
                contractAddress = currentChainIdOrAddress as string;
                // SKIP NATIVE PrivateCoti as it might use different ABI/logic for now
                // Identify by checking if it's the known PrivateCoti address for Mainnet or Testnet
                // Testnet: 0x8783dc215B8305Ea714f91ac16f8Dc5580612353
                // Mainnet: 0x143705349957A236d74e0aDb5673F880fEDB101f
                const addr = contractAddress.toLowerCase();
                if (addr === "0x8783dc215b8305ea714f91ac16f8dc5580612353" ||
                    addr === "0x143705349957a236d74e0adb5673f880fedb101f") {
                    console.warn(`Skipping Native PrivateCoti ${contractAddress}`);
                    return '0.00';
                }
            } else {
                return '0.00';
            }

            // GUARD: Check against Strict Network Enforcement
            const envDefaultNetwork = import.meta.env.VITE_DEFAULT_NETWORK_ID;
            if (envDefaultNetwork) {
                // We need to check the current chain ID from the provider
                // Note: The hook takes currentChainIdOrAddress but that might be passed from stale state.
                // Best to check strict equality with provider or env.
                const network = await provider.getNetwork();
                if (Number(network.chainId) !== Number(envDefaultNetwork)) {
                    console.warn(`[FetchPrivate] Skipping: Wrong Network`);
                    return '0.00';
                }
            }

            if (!contractAddress) return '0.00';

            if (isDirectAddress) {
                // It's a token contract (p.WETH, p.USDT, etc.)
                // Use signer to ensure msg.sender is set correctly for getMyBalance
                const signer = await provider.getSigner();
                const userAddr = await signer.getAddress();

                // PrivateERC20 uses balanceOf(address) to return a nested structure for ctUint256
                // Structure: struct ctUint256 { ctUint128 high; ctUint128 low; } where ctUint128 { ctUint64 high; ctUint64 low; }
                // So it is: ((h, l), (h, l))
                const contract = new ethers.Contract(contractAddress, [
                    "function balanceOf(address) view returns (tuple(tuple(uint256 high, uint256 low) high, tuple(uint256 high, uint256 low) low))"
                ], signer);

                try {
                    const encryptedBalance = await contract.balanceOf(userAddr);

                    // SAFEGUARD: If ciphertext is empty/zero
                    // Ethers returns the struct as the Result.
                    if (!encryptedBalance) {
                        return '0.00';
                    }

                    // Extract 4 parts directly from the result (which mimics the struct)
                    // encryptedBalance.high.high, etc.

                    const h_h = encryptedBalance.high.high; // Part 1 (Most Significant)
                    const h_l = encryptedBalance.high.low;  // Part 2
                    const l_h = encryptedBalance.low.high;  // Part 3
                    const l_l = encryptedBalance.low.low;   // Part 4 (Least Significant)

                    // Check for all zeros (Uninitialized)
                    if (h_h === 0n && h_l === 0n && l_h === 0n && l_l === 0n) {
                        console.log('ℹ️ Encrypted Balance is 0/Uninitialized. Returning 0.00');
                        return '0.00';
                    }

                    // Decrypt 4 parts individually
                    // Note: We need decryptUint from CotiSDK.

                    console.log('🔐 Ciphertext found. Breakdown:', { h_h, h_l, l_h, l_l });

                    const d1 = CotiSDK.decryptUint(h_h, aesKey);
                    const d2 = CotiSDK.decryptUint(h_l, aesKey);
                    const d3 = CotiSDK.decryptUint(l_h, aesKey);
                    const d4 = CotiSDK.decryptUint(l_l, aesKey);

                    console.log('🔓 Decrypted Parts:', { d1, d2, d3, d4 });

                    // Combine results
                    const decryptedVal = (d1 << 192n) + (d2 << 128n) + (d3 << 64n) + d4;
                    console.log('💰 Total Decrypted Value:', decryptedVal);

                    // SAFEGUARD: Sanity check for garbage values
                    const insaneThreshold = BigInt("1000000000000") * BigInt(10) ** BigInt(decimals);
                    if (decryptedVal > insaneThreshold) {
                        console.warn(`⚠️ Decrypted value suspiciously high (${decryptedVal}). Likely decryption garbage due to Key Mismatch.`);
                        throw new Error(`AES key mismatch: Decrypted value suspiciously high. Re-onboarding required.`);
                    }

                    return ethers.formatUnits(decryptedVal, decimals);
                } catch (e: any) {
                    // Try to get more info about the revert
                    console.error(`❌ Failed to fetch/decrypt for ${contractAddress}`, {
                        error: e,
                        code: e.code,
                        revert: e.revert,
                        data: e.data,
                        reason: "Likely user not onboarded on-chain or key mismatch"
                    });

                    // RETHROW if it is our custom AES mismatch error
                    if (e.message && e.message.includes('AES key mismatch')) {
                        throw e;
                    }

                    return '0.00';
                }
            } else {
                // p.COTI (Native) - For now return 0 used by token card
                return '0.00';
            }

        } catch (error: any) {
            console.error("Error fetching private balance:", error);
            if (error.message && (error.message.includes('AES key mismatch') || error.message.includes('onboarding'))) {
                throw error;
            }
            return '0.00';
        }
    }, []);

    return { fetchPrivateBalance };
};
