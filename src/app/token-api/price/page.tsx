"use client";

import { useState } from 'react';
import { useTokenOHLCByContract } from '@/app/token-api/_hooks/useTokenOHLCByContract';
import { AddressInput } from '@/components/ui/AddressInput';
import { NetworkSelect } from '@/components/ui/NetworkSelect';
import { NetworkId } from '@/app/token-api/_config/networks';
import { getExampleTokenAddress } from '@/app/token-api/_config/exampleTokens';
import { getTimeRange, getTimeSpanById, TIME_SPANS } from '@/app/token-api/_config/timeConfig';
import { formatCurrency } from '@/app/token-api/_utils/utils';
import { formatISO9075 } from 'date-fns';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TokenPricePage() {
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState<NetworkId>('mainnet');
  const [timeSpan, setTimeSpan] = useState('30d');
  
  // Get example address
  const getExampleAddress = () => {
    const example = getExampleTokenAddress(network);
    setContractAddress(example);
  };
  
  // Get time range based on selected time span
  const { startTime, endTime } = getTimeRange(timeSpan);
  
  // Fetch token OHLC data
  const { data: ohlcData, isLoading, error } = useTokenOHLCByContract({
    contract: contractAddress,
    network,
    startTime,
    endTime,
    timeframe: timeSpan === '1d' ? 3600 : 86400, // Use hourly data for 1-day view, daily for others
    limit: 100,
    enabled: !!contractAddress && !!network
  });

  // Find the selected time span option
  const selectedTimeSpan = getTimeSpanById(timeSpan);

  // Format the OHLC data for the chart
  const chartData = ohlcData?.ohlc?.map(point => ({
    timestamp: point.timestamp * 1000, // Convert to milliseconds for chart
    date: formatISO9075(new Date(point.timestamp * 1000)).split(' ')[0],
    time: formatISO9075(new Date(point.timestamp * 1000)).split(' ')[1],
    price: point.close,
    volume: point.volume_usd || 0
  })) || [];

  // Get current price and change
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : null;
  const previousPrice = chartData.length > 1 ? chartData[0].price : null;
  const priceChange = currentPrice !== null && previousPrice !== null ? currentPrice - previousPrice : null;
  const priceChangePercent = currentPrice !== null && previousPrice !== null && priceChange !== null 
    ? (priceChange / previousPrice) * 100 
    : null;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Token Price Data</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Select Token and Time Range</h2>
          
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
          
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Time Span</span>
            </label>
            <div className="join w-full">
              {TIME_SPANS.map(span => (
                <button
                  key={span.id}
                  className={`join-item btn ${timeSpan === span.id ? 'btn-active' : ''}`}
                  onClick={() => setTimeSpan(span.id)}
                >
                  {span.name}
                </button>
              ))}
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
              ) : 'Get Price Data'}
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
      
      {chartData.length > 0 && ohlcData && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {ohlcData.token_name || 'Token'} ({ohlcData.token_symbol || ''}) Price Chart
            </h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Current Price</div>
                <div className="stat-value text-xl">{currentPrice ? formatCurrency(currentPrice) : '-'}</div>
                {priceChange !== null && priceChangePercent !== null && (
                  <div className={`stat-desc ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceChange >= 0 ? '↗︎' : '↘︎'} {formatCurrency(Math.abs(priceChange))}
                    ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                    {selectedTimeSpan ? ` in ${selectedTimeSpan.name}` : ''}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 p-4 rounded-lg shadow-md mb-8">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#cccccc30" />
                  <XAxis 
                    dataKey="timestamp" 
                    type="number"
                    scale="time"
                    domain={['auto', 'auto']}
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return timeSpan === '1d' 
                        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => formatCurrency(value, 2)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Price']}
                    labelFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return date.toLocaleString();
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    name={`${ohlcData.token_symbol || 'Token'} Price`}
                    dataKey="price" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    dot={false} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <h3 className="text-xl font-semibold mt-8 mb-2">Trading Volume</h3>
            <div className="bg-base-100 p-4 rounded-lg shadow-md h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  syncId="priceVolumeSync"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#cccccc30" />
                  <XAxis 
                    dataKey="timestamp" 
                    type="number"
                    scale="time"
                    domain={['auto', 'auto']}
                    tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return timeSpan === '1d' 
                        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis 
                    orientation="left"
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => formatCurrency(value, 0)} // Format volume
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'Volume') {
                        return [formatCurrency(value), 'Volume'];
                      }
                      return [formatCurrency(value), name];
                    }}
                    labelFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return date.toLocaleString();
                    }}
                  />
                  <Legend />
                  <Bar 
                    name="Volume"
                    dataKey="volume" 
                    fill="#82ca9d" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {chartData.length === 0 && contractAddress && !isLoading && (
        <div className="alert mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No price data found for this token on {network}.</span>
        </div>
      )}
      
      <div className="bg-base-200 p-4 rounded-lg mt-8">
        <h3 className="font-bold mb-2">API Reference</h3>
        <p className="mb-2">This component uses the <code className="bg-base-300 px-1 rounded">/ohlc/prices/evm/:contract_address</code> endpoint of The Graph Token API.</p>
        <a 
          href="https://thegraph.com/docs/en/token-api/quick-start/#price-history" 
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
