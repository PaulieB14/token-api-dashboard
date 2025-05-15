import { NetworkId } from "../_config/networks";

/**
 * Token API Options
 */
export interface TokenApiOptions {
  skip?: boolean;
  refetchInterval?: number;
}

/**
 * Token Metadata Response
 */
export interface TokenMetadata {
  contract_address: string;
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
  logo_url?: string;
  market_data?: {
    price_usd: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume_24h: number;
  };
}

/**
 * Token Metadata Parameters
 */
export interface TokenMetadataParams {
  network_id?: NetworkId;
  include_market_data?: boolean;
}

/**
 * Token Balance
 */
export interface TokenBalance {
  contract_address: string;
  amount: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  amount_usd?: number;
}

/**
 * Token Balances Parameters
 */
export interface TokenBalancesParams {
  network_id?: NetworkId;
  page?: number;
  page_size?: number;
  min_amount?: string;
  contract_address?: string;
}

/**
 * Token Holder
 */
export interface TokenHolder {
  address: string;
  balance: string;
  last_updated_block: number;
  balance_usd?: number;
  token_share?: number;
}

/**
 * Token Holders Response
 */
export interface TokenHoldersResponse {
  holders: TokenHolder[];
  pagination: {
    page: number;
    page_size: number;
    total_pages: number;
  };
  total: number;
}

/**
 * Token Holders Parameters
 */
export interface TokenHoldersParams {
  network_id?: NetworkId;
  page?: number;
  page_size?: number;
  order_by?: 'asc' | 'desc';
}

/**
 * Token Transfer Item
 */
export interface TokenTransferItem {
  block_num: number;
  datetime?: string;
  timestamp?: number;
  date?: string;
  contract: string;
  from: string;
  to: string;
  amount: string;
  transaction_id: string;
  decimals: number;
  symbol: string;
  network_id: string;
  price_usd?: number;
  value_usd?: number;
}

/**
 * Token Transfers Response
 */
export interface TokenTransfersResponse {
  data: TokenTransferItem[];
  pagination?: {
    page: number;
    page_size: number;
    total_pages: number;
  };
  total_results?: number;
}

/**
 * Token Transfers Parameters
 */
export interface TokenTransfersParams {
  network_id: NetworkId; // Required by API
  from?: string;
  to?: string;
  contract?: string;
  startTime?: number;
  endTime?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}

/**
 * OHLC Data Point
 */
export interface OHLCDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume_token0: number;
  volume_token1: number;
  volume_usd?: number;
}

/**
 * Pool OHLC Response
 */
export interface PoolOHLCResponse {
  ohlc?: OHLCDataPoint[];
  pool_address?: string;
  token0_address?: string;
  token0_symbol?: string;
  token1_address?: string;
  token1_symbol?: string;
  protocol?: string;
  network_id?: string;
  resolution?: string;
  pagination?: {
    page: number;
    page_size: number;
    total_pages: number;
  };
}

/**
 * Pool OHLC Parameters
 */
export interface PoolOHLCParams {
  network_id?: NetworkId;
  from_timestamp?: number;
  to_timestamp?: number;
  resolution?: '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '1d' | '1w';
  page?: number;
  page_size?: number;
}

/**
 * Contract OHLC Response
 */
export interface ContractOHLCResponse {
  contract_address?: string;
  token_name?: string;
  token_symbol?: string;
  token_decimals?: number;
  network_id?: NetworkId;
  resolution?: string;
  ohlc?: OHLCDataPoint[];
  data?: Array<{
    datetime: string;
    ticker: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

/**
 * Token Info
 */
export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

/**
 * Pool
 */
export interface Pool {
  block_num: number;
  datetime: string;
  transaction_id: string;
  factory: string;
  pool: string;
  token0: TokenInfo;
  token1: TokenInfo;
  fee: number;
  protocol: string;
  network_id: string;
}

/**
 * Pools Response
 */
export interface PoolsResponse {
  data: Pool[];
  pagination: {
    previous_page: number;
    current_page: number;
    next_page: number;
    total_pages: number;
  };
  total_results: number;
}

/**
 * Pools Parameters
 */
export interface PoolsParams {
  network_id?: NetworkId;
  token?: string;
  pool?: string;
  symbol?: string;
  factory?: string;
  protocol?: string;
  page?: number;
  page_size?: number;
  sort_by?: 'tvl' | 'creation_date';
  sort_direction?: 'asc' | 'desc';
  include_reserves?: boolean;
}

/**
 * Swap
 */
export interface Swap {
  block_num: number;
  datetime: string;
  transaction_id: string;
  caller: string;
  pool: string;
  factory?: string;
  sender: string;
  recipient: string;
  network_id: string;
  amount0: string;
  amount1: string;
  token0?: { address: string; symbol: string; decimals: number } | string;
  token1?: { address: string; symbol: string; decimals: number } | string;
  amount0_usd?: number;
  amount1_usd?: number;
  protocol?: string;
}

/**
 * Swaps Parameters
 */
export interface SwapsParams {
  network_id: NetworkId; // Required by API
  pool?: string;
  caller?: string;
  sender?: string;
  recipient?: string;
  tx_hash?: string;
  protocol?: string;
  page?: number;
  page_size?: number;
}