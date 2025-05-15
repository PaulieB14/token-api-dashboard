"use client";

import { PoolsParams, PoolsResponse } from "../_types/api";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching liquidity pools
 * 
 * @param params Optional parameters (network_id, token, pool, symbol, factory, protocol, etc.)
 * @param options Hook options
 * @returns Pools data, loading state, error state, and refetch function
 */
export const useTokenPools = (params?: PoolsParams, options = {}) => {
  return useTokenApi<PoolsResponse>("pools/evm", { ...params }, options);
};
