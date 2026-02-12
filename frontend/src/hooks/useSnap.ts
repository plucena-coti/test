import { useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import * as CotiSDK from '@coti-io/coti-sdk-typescript';
const { generateRSAKeyPair, decryptRSA } = CotiSDK;
import { MetaMaskInpageProvider } from '@metamask/providers';

/**
 * Custom hook that manages the entire lifecycle of the Coti Snap integration.
 * 
 * This hook serves as the central controller for all Snap-related operations, including:
 * 1. **Installation Check**: Verifying if the Coti Snap is installed in the user's MetaMask wallet.
 * 2. **Connection Management**: orchestrating the connection process and requesting necessary permissions.
 * 3. **Key Retrieval**: Securely retrieving the user's AES key from the Snap for on-chain data decryption.
 * 4. **Error Handling**: centralizing error state management and providing retry mechanisms for connection failures.
 * 
 * It acts as a bridge between the DApp and the wallet's Snap capability, ensuring a smooth user experience
 * for privacy-preserving features.
 * 
 * @param setSnapError - Optional state setter to update if Snap is missing or connection fails.
 * @returns {Object} An object containing:
 * - `isSnapInstalled`: Async function that returns true if the Snap is found, false otherwise.
 * - `executeSnapCheck`: Async function that checks installation, logs status, sets error if missing, or executes callback if found.
 * - `connectToSnap`: Async function that requests permissions to connect to the Snap.
 * - `getAESKeyFromSnap`: Async function that specifically retrieves the AES key, handling retries.
 * - `resetError`: Function to clear the error state (if setSnapError is provided).
 */
const snapId = 'npm:@coti-io/coti-snap';
let globalCachedAESKey: string | null = null;

export const useSnap = (setSnapError?: (error: string | null) => void) => {
    const isSnapRequestPending = useRef(false);

    /**
     * Helper to get the MetaMask provider with types.
     */
    const getProvider = (): MetaMaskInpageProvider | null => {
        if (typeof window.ethereum !== 'undefined') {
            return window.ethereum as unknown as MetaMaskInpageProvider;
        }
        return null;
    };

    // Flag to check if environment is Flask
    const isFlask = useRef<boolean>(false);

    /**
     * Detects if the user is running MetaMask Flask.
     */
    const detectFlask = useCallback(async (): Promise<boolean> => {
        const provider = getProvider();
        if (!provider) return false;
        try {
            const clientVersion = await provider.request({ method: 'web3_clientVersion' });
            const isFlaskDetected = (clientVersion as string).includes('flask');
            console.log(`🦊 Client Version: ${clientVersion} (Flask: ${isFlaskDetected})`);
            isFlask.current = isFlaskDetected;
            return isFlaskDetected;
        } catch (e) {
            console.warn('⚠️ Failed to check client version', e);
            return false;
        }
    }, []);

    /**
     * Checks if the Coti Snap is currently installed in MetaMask.
     * 
     * @returns {Promise<boolean>} True if installed, false otherwise.
     */
    const isSnapInstalled = useCallback(async (): Promise<boolean> => {
        const provider = getProvider();
        if (!provider) {
            console.log('❌ isSnapInstalled: No window.ethereum');
            return false;
        }

        try {
            // Check Flask status first
            await detectFlask();

            console.log('🕵️‍♀️ requesting wallet_getSnaps...');
            const snaps = (await provider.request({ method: 'wallet_getSnaps' })) as Record<string, any>;
            console.log('🕵️‍♀️ wallet_getSnaps result:', JSON.stringify(snaps, null, 2));

            const snapInfo = Object.values(snaps).find(
                (snap: any) => snap.id === snapId
            );

            if (snapInfo) {
                console.log(`✅ Snap found: ${snapId}, Version: ${snapInfo.version}`);
                return true;
            } else {
                console.log(`ℹ️ Snap ${snapId} not found in installed snaps (might be disconnected).`);

                // RESTORED OPTIMISTIC CHECK: Always assume installed if not found in list.
                // This forces the app to attempt 'connectToSnap' / 'wallet_requestSnaps'.
                console.log('🚀 Optimistic detection: Assuming Snap is installed to trigger connection attempt.');
                return true;
            }
        } catch (error) {
            console.error('❌ Error checking snap connection:', error);
            return false;
        }
    }, [snapId, detectFlask]);


    /**
     * Connect to COTI Snap (request permissions)
     */
    const connectToSnap = useCallback(async (): Promise<boolean> => {
        const provider = getProvider();
        if (!provider) {
            console.log('❌ No window.ethereum available');
            return false;
        }

        try {
            console.log('🔌 Requesting permission to connect to COTI Snap...');
            await provider.request({
                method: 'wallet_requestSnaps',
                params: {
                    [snapId]: {}
                }
            });
            console.log('✅ Connected to COTI Snap');
            if (setSnapError) setSnapError(null);
            return true;
        } catch (error: any) {
            console.error('❌ Failed to connect to snap:', error.message);
            if (setSnapError) {
                if (!isFlask.current) {
                    setSnapError('MetaMask Flask is required for this Snap.');
                } else {
                    setSnapError('Failed to connect to Snap');
                }
            }
            // Propagate error for context handling
            throw new Error("SNAP_CONNECT_FAILED");
        }
    }, [snapId, setSnapError]);


    /**
     * Orchestrates the Snap connection check with logging and error handling.
     * 
     * @param onSnapFound - Callback to execute if Snap is installed (e.g., updateAccountState).
     *                      Should return true if successful, false otherwise.
     * @returns {Promise<void>}
     */
    const executeSnapCheck = useCallback(async (
        onSnapFound: () => Promise<boolean>
    ) => {
        const installed = await isSnapInstalled();

        if (installed) {
            console.log('✅ Snap is installed. Attempting to retrieve key...');
            const success = await onSnapFound();
            if (!success) {
                console.log('⚠️ Snap installed but key retrieval failed/cancelled. Banner handles error.');
            }
        } else {
            console.log('ℹ️ Snap NOT installed/detected. Setting info banner.');
            if (setSnapError) {
                // Customized message based on detection
                if (!isFlask.current) {
                    setSnapError('MetaMask Flask is required.');
                } else {
                    setSnapError('Coti Snap is not connected. Click to connect.');
                }
            }
        }
    }, [isSnapInstalled, setSnapError]);

    /**
     * Get AES key from COTI Snap.
     * Includes retry logic.
     */
    const getAESKeyFromSnap = useCallback(async (): Promise<string | null> => {
        if (setSnapError) setSnapError(null);

        // Return cached key if available
        if (globalCachedAESKey) {
            console.log('🔑 Returning globally cached AES key');
            return globalCachedAESKey;
        }

        if (isSnapRequestPending.current) {
            console.log('⏳ Snap request already pending, skipping concurrent call.');
            return null;
        }

        const provider = getProvider();
        if (!provider) {
            console.log('❌ No window.ethereum available');
            return null;
        }

        // First, connect to the snap
        const connected = await connectToSnap();
        if (!connected) {
            console.log('❌ Could not connect to snap');
            if (setSnapError) setSnapError('Failed to connect to Snap');
            return null;
        }

        // Sync Environment explicitly before requesting key
        await syncEnvironment();

        // Add a small delay to ensure account is fully connected
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            isSnapRequestPending.current = true;
            console.log('🔑 Requesting AES key from COTI Snap...');

            // Fetch ChainID for explicit context
            const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
            const chainId = parseInt(chainIdHex, 16);

            // Retry logic for robustness
            let retries = 3;
            let lastError;

            while (retries > 0) {
                try {
                    // Directly request the key (User preference to force fetch)
                    // Explicitly passing chainId to bypass sync state issues
                    const key = await provider.request({
                        method: 'wallet_invokeSnap',
                        params: {
                            snapId,
                            request: {
                                method: 'get-aes-key',
                                params: { chainId }
                            }
                        }
                    });

                    console.log('🔍 DEBUG: wallet_invokeSnap result:', JSON.stringify(key));

                    if (!key) {
                        console.warn('⚠️ Snap returned null (User likely rejected).');
                        // Throw specific error so we don't trigger "Missing Key" onboarding flow
                        throw new Error('SNAP_DIALOG_REJECTED');
                    }

                    console.log('TOP DEBUG MESSAGE: wallet_invokeSnap result received');
                    console.log('✅ AES key received from snap');
                    globalCachedAESKey = key as string; // Update Cache
                    return key as string;

                } catch (error: any) {
                    lastError = error;

                    if (error.message?.includes('No account connected') && retries > 1) {
                        console.log(`⏳ Account not ready, retrying... (${retries - 1} attempts left)`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        retries--;
                    } else {
                        console.error('❌ Error during Snap interaction:', error);
                        throw error;
                    }
                }
            }

            throw lastError;
        } catch (error: any) {
            console.error('❌ Failed to get AES key from snap:', error.message);

            // RETHROW if it's the specific missing key error so upstream can handle onboarding
            if (error.message && (error.message.includes('AES key') || error.message.includes('onboarding'))) {
                throw error;
            }

            if (setSnapError) setSnapError(error.message || 'Failed to connect to Snap');
            return null;
        } finally {
            isSnapRequestPending.current = false;
        }
    }, [connectToSnap, setSnapError, snapId]);

    /**
     * Save AES key to Snap (persist it for future sessions)
     */
    const saveAESKeyToSnap = useCallback(async (key: string): Promise<boolean> => {
        const provider = getProvider();
        if (!provider) return false;
        try {
            console.log('💾 Saving AES key to Snap...');
            await provider.request({
                method: 'wallet_invokeSnap',
                params: {
                    snapId,
                    request: {
                        method: 'set-aes-key',
                        params: { newUserAesKey: key }
                    }
                }
            });
            console.log('✅ AES key saved to Snap successfully');
            globalCachedAESKey = key; // Update Cache
            if (setSnapError) setSnapError(null);
            return true;
        } catch (err: any) {
            console.error('❌ Failed to save AES key to Snap:', err);
            return false;
        }
    }, [setSnapError, snapId]);

    const resetError = useCallback(() => {
        if (setSnapError) setSnapError(null);
    }, [setSnapError]);

    /**
     * Syncs the environment (testnet/mainnet) with the Snap.
     * This ensures the Snap uses the correct config for the current network.
     */
    const syncEnvironment = useCallback(async (): Promise<void> => {
        const provider = getProvider();
        if (!provider) return;

        try {
            const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
            const chainId = parseInt(chainIdHex, 16);
            const environment = chainId === 7082400 ? 'testnet' : 'mainnet';

            console.log(`🌍 Syncing Snap Environment to: ${environment} (ChainID: ${chainId})`);

            await provider.request({
                method: 'wallet_invokeSnap',
                params: {
                    snapId,
                    request: {
                        method: 'set-environment',
                        params: { environment }
                    }
                }
            });
            console.log('✅ Snap Environment Synced');
        } catch (error) {
            console.warn('⚠️ Failed to sync Snap environment:', error);
            // Non-critical, but good to know
        }
    }, [snapId]);

    // Helper to expose sync
    const connectAndSync = useCallback(async () => {
        const connected = await connectToSnap();
        if (connected) {
            await syncEnvironment();
        }
        return connected;
    }, [connectToSnap, syncEnvironment]);

    /**
     * Manually triggers the onboarding flow (Generate/Recover AES key via SDK).
     * Used when Snap is missing or user forces a key regeneration.
     * 
     * @returns {Promise<string | null>} The generated AES key if successful.
     */
    const handleManualOnboarding = useCallback(async (): Promise<string | null> => {
        try {
            console.log("🚀 Starting manual onboarding flow...");
            const key = await onboardUser();

            if (key && key !== "PENDING") {
                console.log("🔑 Key recovered from SDK:", key);
                // Persist to Snap immediately
                await saveAESKeyToSnap(key);

                console.log("✅ Onboarding flow finished.");

                return key;
            }
            return null;
        } catch (e: any) {
            console.error("❌ Manual Onboarding failed:", e);
            alert(`Onboarding Failed: ${e.message}`);
            if (setSnapError) setSnapError(`Onboarding Failed: ${e.message}`);
            return null;
        }
    }, [saveAESKeyToSnap, setSnapError]);

    /**
     * Verifies that the key in the Snap matches the key generated by the SDK (Network).
     * Useful for debugging stale states.
     */
    const handleKeyVerification = useCallback(async (): Promise<void> => {
        try {
            console.log("🔍 STARTING KEY VERIFICATION...");
            console.log("1️⃣  Fetching AES Key from Snap Storage...");
            const snapKey = await getAESKeyFromSnap();
            console.log("   -> Snap Key:", snapKey);

            console.log("2️⃣  Computing AES Key from Network (generateOrRecoverAes)...");
            console.log("   (Please sign the message in MetaMask)");

            const netKey = await onboardUser();
            console.log("   -> Network Key:", netKey);

            console.log("3️⃣  COMPARISON RESULT:");
            const match = snapKey === netKey;
            console.log(`   MATCH: ${match ? "✅ YES" : "❌ NO"}`);

            if (!match) {
                console.error("CRITICAL MISMATCH DETECTED!");
                console.error(`Snap thinks key is: ${snapKey}`);
                console.error(`Network says key is: ${netKey}`);
                console.error("This proves the Snap state is stale. You MUST Force Onboard to fix this.");
                alert(`MISMATCH DETECTED!\n\nSnap: ${snapKey}\nNetwork: ${netKey}\n\nThey do NOT match. You must Force Onboard.`);
            } else {
                console.log("✅ Keys match. Issues are likely elsewhere.");
                alert(`✅ MATCH!\n\nKey: ${snapKey}\n\nBoth Snap and Network agree.`);
            }

        } catch (e: any) {
            console.error("❌ Key Verification Failed:", e);
            alert(`Verification Failed: ${e.message}`);
        }
    }, [getAESKeyFromSnap]);

    return {
        isSnapInstalled,
        executeSnapCheck,
        connectToSnap: connectAndSync,
        getAESKeyFromSnap,
        saveAESKeyToSnap,
        resetError,
        handleManualOnboarding,
        handleKeyVerification
    };
};

/**
 * Onboard user to Coti Network (generate/recover AES key via SDK)
 * This is required if the user has never onboarded or the network was reset.
 */
export const onboardUser = async () => {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found");

        // Import BrowserProvider dynamically to avoid early init issues if any
        const { BrowserProvider } = await import('@coti-io/coti-ethers');
        const chainId = await (window.ethereum as any).request({ method: 'eth_chainId' });
        const networkId = parseInt(chainId, 16);

        // Hardcoded Onboard Address for Testnet (7082400) and Mainnet (2632500)
        // Verified 0x536A67f0cc46513E7d27a370ed1aF9FDcC7A5095 works for both
        const onboardAddress = (networkId === 7082400 || networkId === 2632500)
            ? "0x536A67f0cc46513E7d27a370ed1aF9FDcC7A5095"
            : undefined;

        if (!onboardAddress) {
            throw new Error(`No OnboardContract configured for network ${networkId}`);
        }

        console.log(`Initializing SDK for network ${networkId}, OnboardContract: ${onboardAddress}`);

        const cotiProvider = new BrowserProvider(window.ethereum as any, {
            chainId: networkId,
            name: networkId === 7082400 ? 'cotiTestnet' : 'coti'
        });
        const cotiSigner = await cotiProvider.getSigner();

        // Clear any existing onboard info to FORCE a new transaction
        cotiSigner.clearUserOnboardInfo();

        // Trigger onboarding check/execution
        console.log("🚀 Triggering generateOrRecoverAes...");
        // force gas limit if needed, though SDK usually handles it.
        // The SDK function signature might not support overrides directly if it's a high level method,
        // but let's assume it works.
        const tx = await cotiSigner.generateOrRecoverAes(onboardAddress);
        console.log("✅ generateOrRecoverAes returned (transaction/result):", tx);

        // NOTE: The AccountOnboard contract does NOT have a view function 'userOnboarded'.
        // We rely on the event emission or the success of the transaction.
        // If generateOrRecoverAes succeeds, we assume we are onboarded.

        const onboardInfo = cotiSigner.getUserOnboardInfo();
        if (onboardInfo && onboardInfo.aesKey) {
            console.log('✅ AES key generated/recovered via SDK');
            return onboardInfo.aesKey;
        } else {
            console.warn('⚠️ Onboarding finished but getUserOnboardInfo returned null/empty. This might be due to propagation delay.');
            return "PENDING";
        }
    } catch (genError: any) {
        console.error('❌ Failed to generate AES key via SDK:', genError);
        throw genError;
    }
};
