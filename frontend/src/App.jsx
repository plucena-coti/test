import { useState, useEffect, useCallback } from 'react';
import { useMetamask } from './hooks/useMetamask';
import { useSnap } from './hooks/useSnap';
import { useFetchPrivateBalance } from './hooks/useFetchPrivateBalance';
import { CONTRACT_ADDRESSES } from './contracts/config';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [aesKey, setAesKey] = useState(null);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onAccountChanged = useCallback(async (newAccount) => {
    setAccount(newAccount);
    setAesKey(null); // Reset key on account change
    setBalances({});
  }, []);

  const { connectWallet, networkName, chainId, refreshNetworkState } = useMetamask({
    onAccountChanged,
    // onNetworkChanged removed to prevent loop on refreshNetworkState
  });

  useEffect(() => {
    refreshNetworkState();
  }, [refreshNetworkState]);

  const { getAESKeyFromSnap, isSnapInstalled } = useSnap((err) => setError(err));
  const { fetchPrivateBalance } = useFetchPrivateBalance();

  const handleConnect = async () => {
    try {
      await connectWallet(async (acc) => {
        setAccount(acc);
        await refreshNetworkState();
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetKey = async () => {
    try {
      setLoading(true);
      const installed = await isSnapInstalled();
      if (!installed) {
        setError("CoTi Snap is not installed");
        setLoading(false);
        return;
      }
      const key = await getAESKeyFromSnap();
      if (key) {
        setAesKey(key);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScanBalances = async () => {
    console.log("Scan Balances clicked");
    console.log("Account:", account);
    console.log("AES Key present:", !!aesKey);
    console.log("Chain ID:", chainId);

    if (!account || !aesKey || !chainId) {
      console.warn("Missing requirements for scanning");
      return;
    }

    setLoading(true);
    setError(null);
    const newBalances = {};

    try {
      const networkId = parseInt(chainId);
      console.log("Parsed Network ID:", networkId);

      const addresses = CONTRACT_ADDRESSES[networkId];
      console.log("Addresses found:", addresses);

      if (!addresses) {
        setError(`No contract addresses for chain ${chainId}`);
        setLoading(false);
        return;
      }

      const tokens = Object.entries(addresses).filter(([name]) =>
        name.startsWith('p.') || name === 'PrivateCoti'
      );
      console.log("Tokens to scan:", tokens);

      for (const [name, address] of tokens) {
        try {
          console.log(`Fetching balance for ${name} at ${address}...`);
          // fetchPrivateBalance signature: (userAddress, aesKey, contractAddress, isDirectAddress)
          // We pass the address as the 3rd arg, and true for isDirectAddress
          const balance = await fetchPrivateBalance(account, aesKey, address, true);
          console.log(`Balance for ${name}: ${balance} `);
          newBalances[name] = balance;
        } catch (e) {
          console.error(`Failed to fetch ${name}: `, e);
          newBalances[name] = "Error";
        }
      }
      setBalances(newBalances);

    } catch (err) {
      console.error("Critical error in scan:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>COTI V2 Private Balance Scanner</h1>

      <div className="card">
        <p><strong>Network:</strong> {networkName} ({chainId})</p>
        <p><strong>Account:</strong> {account ? account : "Not Connected"}</p>
        {aesKey && <p><strong>AES Key:</strong> <span title={aesKey}>Stored in Memory (click to view tooltip)</span></p>}
      </div>

      <div className="actions">
        {!account && (
          <button onClick={handleConnect} disabled={loading}>
            Connect Wallet
          </button>
        )}

        {account && !aesKey && (
          <button onClick={handleGetKey} disabled={loading}>
            Get AES Key
          </button>
        )}

        {account && aesKey && (
          <button onClick={handleScanBalances} disabled={loading}>
            {loading ? 'Scanning...' : 'Scan Balances'}
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {Object.keys(balances).length > 0 && (
        <div className="results">
          <h2>Decrypted Balances</h2>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(balances).map(([token, balance]) => (
                <tr key={token}>
                  <td>{token}</td>
                  <td>{balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
