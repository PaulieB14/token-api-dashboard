"use client";

import { useState } from 'react';
import { useTokenBalances } from '@/app/token-api/_hooks/useTokenBalances';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId, getBlockExplorerTokenUrl } from '@/app/token-api/_config/networks';
import { formatTokenAmount, formatCurrency, shortenAddress } from '@/app/token-api/_utils/utils';

export default function TokenBalancesPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [minAmount, setMinAmount] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Fetch token balances
  const { data: balances, isLoading, error } = useTokenBalances(
    walletAddress,
    { 
      network_id: network, 
      min_amount: minAmount || undefined,
      page,
      page_size: pageSize
    },
    { skip: !walletAddress }
  );

  // Example addresses for popular wallets
  const exampleAddresses = [
    { name: 'Vitalik Buterin', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
    { name: 'Gitcoin Grants', address: '0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6' },
    { name: 'Uniswap', address: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC' },
  ];

  const useExampleAddress = (address: string) => {
    setWalletAddress(address);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Token Balances</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Enter Wallet Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <AddressInput
              value={walletAddress}
              onChange={setWalletAddress}
              label="Wallet Address"
              placeholder="0x..."
              required
            />
            
            <NetworkSelect
              value={network}
              onChange={setNetwork}
              label="Network"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Minimum Amount</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="0"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Page Size</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>
          
          <div className="card-actions justify-between">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-outline">Use Example</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64">
                {exampleAddresses.map((example) => (
                  <li key={example.address}>
                    <button onClick={() => useExampleAddress(example.address)}>
                      <span className="font-medium">{example.name}</span>
                      <span className="text-sm opacity-70">{shortenAddress(example.address)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              className="btn btn-primary" 
              disabled={!walletAddress}
              onClick={() => setWalletAddress(walletAddress)} // Re-trigger query
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading...
                </>
              ) : 'Get Balances'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      {error && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      )}
      
      {balances && balances.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Token Balances</h2>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>USD Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((balance, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">{balance.symbol || 'Unknown'}</span>
                        <span className="text-xs opacity-70">{shortenAddress(balance.contract_address)}</span>
                      </div>
                    </td>
                    <td>
                      {formatTokenAmount(balance.amount, balance.decimals || 18)}
                    </td>
                    <td>
                      {balance.amount_usd ? formatCurrency(balance.amount_usd) : '-'}
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerTokenUrl(network, balance.contract_address)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="join">
              <button 
                className="join-item btn"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                «
              </button>
              <button className="join-item btn">Page {page}</button>
              <button 
                className="join-item btn"
                onClick={() => setPage(p => p + 1)}
                disabled={balances.length < pageSize}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
      
      {balances && balances.length === 0 && (
        <div className="alert mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No token balances found for this address on {network}.</span>
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/balances/evm/:wallet_address</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#token-balances" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Documentation
        </a>
      </div>
    </div>
  );
}