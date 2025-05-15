import { TokenMetadata } from '@/app/token-api/_types/api';
import { formatCurrency, formatNumber, formatPercentage, formatTokenAmount, shortenAddress } from '@/app/token-api/_utils/utils';
import { getBlockExplorerTokenUrl, NetworkId } from '@/app/token-api/_config/networks';

interface TokenInfoProps {
  token: TokenMetadata;
  network: NetworkId;
}

/**
 * Component for displaying token metadata information
 */
export const TokenInfo: React.FC<TokenInfoProps> = ({ token, network }) => {
  const explorerUrl = getBlockExplorerTokenUrl(network, token.contract_address);
  
  return (
    <div className="bg-base-200 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {token.logo_url && (
          <img 
            src={token.logo_url} 
            alt={`${token.name} logo`} 
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {token.name} 
            <span className="text-lg font-normal text-gray-500">({token.symbol})</span>
          </h2>
          <a 
            href={explorerUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {shortenAddress(token.contract_address)}
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-base-100 rounded-md p-3">
          <div className="stat-title">Total Supply</div>
          <div className="stat-value text-lg">
            {formatTokenAmount(token.total_supply, token.decimals)} {token.symbol}
          </div>
        </div>
        
        <div className="stat bg-base-100 rounded-md p-3">
          <div className="stat-title">Decimals</div>
          <div className="stat-value text-lg">{token.decimals}</div>
        </div>
        
        {token.market_data && (
          <>
            <div className="stat bg-base-100 rounded-md p-3">
              <div className="stat-title">Price</div>
              <div className="stat-value text-lg">{formatCurrency(token.market_data.price_usd, 6)}</div>
              <div className={`stat-desc ${token.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(token.market_data.price_change_percentage_24h / 100, 2)} (24h)
              </div>
            </div>
            
            <div className="stat bg-base-100 rounded-md p-3">
              <div className="stat-title">Market Cap</div>
              <div className="stat-value text-lg">{formatCurrency(token.market_data.market_cap, 0)}</div>
            </div>
            
            <div className="stat bg-base-100 rounded-md p-3 md:col-span-2">
              <div className="stat-title">24h Volume</div>
              <div className="stat-value text-lg">{formatCurrency(token.market_data.total_volume_24h, 0)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
