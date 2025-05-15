"use client";

import { useState } from 'react';
import { useTokenHolders } from '@/app/token-api/_hooks/useTokenHolders';
import { useTokenMetadata } from '@/app/token-api/_hooks/useTokenMetadata';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId, getBlockExplorerAddressUrl } from '@/app/token-api/_config/networks';
import { formatTokenAmount, formatPercentage, shortenAddress } from '@/app/token-api/_utils/utils';
import { getExampleTokenAddress } from '@/app/token-api/_config/exampleTokens';

export default function TokenHoldersPage() {
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
  
  // Get example address
  const getExampleAddress = () => {
    const example = getExampleTokenAddress(network);
    setContractAddress(example);
  };
  
  // Fetch token holders
  const { data: holdersData, isLoading, error } = useTokenHolders(
    contractAddress,
    { 
      network_id: network,
      page,
      page_size: pageSize,
      order_by: orderBy
    },
    { skip: !contractAddress }
  );

  // Fetch token metadata for display
  const { data: tokenData } = useTokenMetadata(
    contractAddress,
    { network_id: network },
    { skip: !contractAddress }
  );

  const holders = holdersData?.holders || [];
  const pagination = holdersData?.pagination;
  const totalHolders = holdersData?.total || 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Token Holders</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Enter Token Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <AddressInput
              value={contractAddress}
              onChange={setContractAddress}
              label="Token Contract Address"
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Order By</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">Largest to Smallest</option>
                <option value="asc">Smallest to Largest</option>
              </select>
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
                <option value="100">100 per page</option>
              </select>
            </div>
          </div>
          
          <div className="card-actions justify-between">
            <button 
              className="btn btn-outline" 
              onClick={getExampleAddress}
            >
              Use Example
            </button>
            
            <button 
              className="btn btn-primary" 
              disabled={!contractAddress}
              onClick={() => setContractAddress(contractAddress)} // Re-trigger query
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading...
                </>
              ) : 'Get Holders'}
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
      
      {holders.length > 0 && tokenData && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Holders for {tokenData.name} ({tokenData.symbol})
            </h2>
            <div className="badge badge-lg">{totalHolders.toLocaleString()} Total Holders</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Address</th>
                  <th>Balance</th>
                  <th>Share</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {holders.map((holder, index) => (
                  <tr key={holder.address}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                    <td>
                      <div>
                        <span className="font-mono">{shortenAddress(holder.address)}</span>
                      </div>
                    </td>
                    <td>
                      {formatTokenAmount(holder.balance, tokenData.decimals)} {tokenData.symbol}
                    </td>
                    <td>
                      {holder.token_share ? formatPercentage(holder.token_share) : '-'}
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerAddressUrl(network, holder.address)} 
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
                <button className="join-item btn">Page {page} of {pagination.total_pages}</button>
                <button 
                  className="join-item btn"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= (pagination.total_pages || 1)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {holders.length === 0 && contractAddress && !isLoading && (
        <div className="alert mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No holders found for this token on {network}.</span>
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/holders/evm/:contract_address</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#token-holders" 
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