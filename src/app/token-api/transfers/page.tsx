"use client";

import { useState } from 'react';
import { useTokenTransfers } from '@/app/token-api/_hooks/useTokenTransfers';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId, getBlockExplorerTxUrl, getBlockExplorerAddressUrl } from '@/app/token-api/_config/networks';
import { formatTokenAmount, shortenAddress } from '@/app/token-api/_utils/utils';
import { format } from 'date-fns';

export default function TokenTransfersPage() {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [contractAddress, setContractAddress] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Fetch token transfers
  const { data: transfersData, isLoading, error } = useTokenTransfers(
    address,
    { 
      network_id: network,
      contract: contractAddress || undefined,
      limit,
      page
    },
    { skip: !address || !network }
  );

  const transfers = transfersData?.data || [];
  const pagination = transfersData?.pagination;
  const totalResults = transfersData?.total_results || 0;

  // Example addresses for popular wallets
  const exampleAddresses = [
    { name: 'Vitalik Buterin', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
    { name: 'Gitcoin Grants', address: '0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6' },
    { name: 'Uniswap', address: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC' },
  ];

  const useExampleAddress = (address: string) => {
    setAddress(address);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Token Transfers</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Search Transfers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <AddressInput
              value={address}
              onChange={setAddress}
              label="Recipient Address"
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
            <AddressInput
              value={contractAddress}
              onChange={setContractAddress}
              label="Token Contract (Optional)"
              placeholder="0x..."
            />
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Results Per Page</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
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
              disabled={!address || !network}
              onClick={() => {
                setPage(1); // Reset to first page
                setAddress(address); // Re-trigger query
              }}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading...
                </>
              ) : 'Search Transfers'}
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
      
      {transfers.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Transfer History
            </h2>
            {totalResults > 0 && (
              <div className="badge badge-lg">{totalResults.toLocaleString()} Transfers Found</div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.transaction_id + transfer.contract}>
                    <td>
                      {transfer.datetime ? format(new Date(transfer.datetime), 'MMM d, yyyy HH:mm') : '-'}
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerAddressUrl(network, transfer.from)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline font-mono text-sm"
                      >
                        {shortenAddress(transfer.from)}
                      </a>
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerAddressUrl(network, transfer.to)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline font-mono text-sm"
                      >
                        {shortenAddress(transfer.to)}
                      </a>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">{transfer.symbol}</span>
                        <span className="text-xs opacity-70">{shortenAddress(transfer.contract)}</span>
                      </div>
                    </td>
                    <td>
                      {formatTokenAmount(transfer.amount, transfer.decimals)}
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerTxUrl(network, transfer.transaction_id)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-outline"
                      >
                        View Tx
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {pagination && (
            <div className="flex justify-center mt-4">
              <div className="join">
                <button 
                  className="join-item btn"
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                  «
                </button>
                <button className="join-item btn">Page {page} of {pagination.total_pages || '?'}</button>
                <button 
                  className="join-item btn"
                  onClick={() => setPage(p => p + 1)}
                  disabled={transfers.length < limit || (pagination && page >= pagination.total_pages)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {transfers.length === 0 && address && !isLoading && (
        <div className="alert mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No transfers found matching your criteria.</span>
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/transfers/evm</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#token-transfers" 
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