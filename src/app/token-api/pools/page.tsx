"use client";

import { useState } from 'react';
import { useTokenPools } from '@/app/token-api/_hooks';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId, getBlockExplorerAddressUrl } from '@/app/token-api/_config/networks';
import { shortenAddress } from '@/app/token-api/_utils/utils';
import { format } from 'date-fns';

export default function TokenPoolsPage() {
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [tokenAddress, setTokenAddress] = useState('');
  const [poolAddress, setPoolAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [protocol, setProtocol] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<'tvl' | 'creation_date'>('creation_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Fetch token pools
  const { data: poolsData, isLoading, error } = useTokenPools(
    { 
      network_id: network,
      token: tokenAddress || undefined,
      pool: poolAddress || undefined,
      symbol: symbol || undefined,
      protocol: protocol || undefined,
      page,
      page_size: pageSize,
      sort_by: sortBy,
      sort_direction: sortDirection,
      include_reserves: true
    },
    { skip: !network }
  );

  const pools = poolsData?.data || [];
  const pagination = poolsData?.pagination;
  const totalResults = poolsData?.total_results || 0;

  // Available protocol options
  const protocols = [
    { id: '', name: 'All Protocols' },
    { id: 'uniswap_v2', name: 'Uniswap V2' },
    { id: 'uniswap_v3', name: 'Uniswap V3' },
    { id: 'sushiswap', name: 'SushiSwap' },
    { id: 'pancakeswap', name: 'PancakeSwap' },
  ];

  // Reset search params
  const resetFilters = () => {
    setTokenAddress('');
    setPoolAddress('');
    setSymbol('');
    setProtocol('');
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Liquidity Pools</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Search Pools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <NetworkSelect
              value={network}
              onChange={setNetwork}
              label="Network"
              required
            />
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Protocol</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
              >
                {protocols.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <AddressInput
              value={tokenAddress}
              onChange={setTokenAddress}
              label="Token Address (Optional)"
              placeholder="0x..."
            />
            
            <AddressInput
              value={poolAddress}
              onChange={setPoolAddress}
              label="Pool Address (Optional)"
              placeholder="0x..."
            />
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Token Symbol (Optional)</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., ETH, USDC"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sort By</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'tvl' | 'creation_date')}
              >
                <option value="creation_date">Creation Date</option>
                <option value="tvl">TVL</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sort Direction</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Results Per Page</span>
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
            <button 
              className="btn btn-outline" 
              onClick={resetFilters}
            >
              Reset Filters
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setPage(1); // Reset to first page
              }}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Loading...
                </>
              ) : 'Search Pools'}
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
      
      {pools.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Pool Results
            </h2>
            {totalResults > 0 && (
              <div className="badge badge-lg">{totalResults.toLocaleString()} Pools Found</div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Pool</th>
                  <th>Token Pair</th>
                  <th>Protocol</th>
                  <th>Fee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pools.map((pool) => (
                  <tr key={pool.pool}>
                    <td>
                      {pool.datetime ? format(new Date(pool.datetime), 'MMM d, yyyy') : '-'}
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerAddressUrl(network, pool.pool)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline font-mono text-sm"
                      >
                        {shortenAddress(pool.pool)}
                      </a>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-primary">{pool.token0.symbol}</div>
                        <span>/</span>
                        <div className="badge badge-secondary">{pool.token1.symbol}</div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-outline">{pool.protocol}</div>
                    </td>
                    <td>
                      {pool.fee / 10000}%
                    </td>
                    <td>
                      <a 
                        href={getBlockExplorerAddressUrl(network, pool.pool)} 
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
                <button className="join-item btn">Page {page} of {pagination.total_pages || '?'}</button>
                <button 
                  className="join-item btn"
                  onClick={() => setPage(p => p + 1)}
                  disabled={pools.length < pageSize || (pagination && page >= pagination.total_pages)}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {pools.length === 0 && !isLoading && (
        <div className="alert mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No pools found matching your criteria. Try adjusting your filters.</span>
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/pools/evm</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#liquidity-pools" 
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
