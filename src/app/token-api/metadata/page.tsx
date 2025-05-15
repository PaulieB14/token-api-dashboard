"use client";

import { useState } from 'react';
import { useTokenMetadata } from '@/app/token-api/_hooks/useTokenMetadata';
import { TokenInfo } from '@/components/ui/TokenInfo';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId } from '@/app/token-api/_config/networks';
import { getExampleTokenAddress } from '@/app/token-api/_config/exampleTokens';

export default function TokenMetadataPage() {
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [includeMarketData, setIncludeMarketData] = useState(true);
  
  // Get default example addresses
  const getExampleAddress = () => {
    const example = getExampleTokenAddress(network);
    setContractAddress(example);
  };
  
  // Fetch token metadata
  const { data: token, isLoading, error } = useTokenMetadata(
    contractAddress,
    { network_id: network, include_market_data: includeMarketData },
    { skip: !contractAddress }
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Token Metadata</h1>
      
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
          
          <div className="flex items-center mb-6">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-2"
                checked={includeMarketData}
                onChange={(e) => setIncludeMarketData(e.target.checked)}
              />
              <span className="label-text">Include Market Data</span>
            </label>
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
              ) : 'Get Metadata'}
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
      
      {token && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Token Information</h2>
          <TokenInfo token={token} network={network} />
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/tokens/evm/:contract_address</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#token-metadata" 
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