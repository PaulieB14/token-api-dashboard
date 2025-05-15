"use client";

import { PoolOHLCParams, PoolOHLCResponse } from "../_types/api";
import { cleanContractAddress } from "../_utils/utils";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching OHLC data for a liquidity pool
 * 
 * @param pool Pool contract address
 * @param params Optional parameters (network_id, from_timestamp, to_timestamp, resolution, etc.)
 * @param options Hook options
 * @returns Pool OHLC data, loading state, error state, and refetch function
 */
export function useTokenOHLCByPool(
  pool: string | undefined,
  params?: PoolOHLCParams,
  options = { skip: false }
) {
  // Normalize and clean the pool address
  const normalizedPool = pool ? cleanContractAddress(pool) : undefined;

  // Default skip to true if no pool address is provided
  const skip = options.skip || !normalizedPool;

  // Create the endpoint path
  const endpoint = normalizedPool ? `ohlc/pools/evm/${normalizedPool}` : "";

  // Call the base API hook with the proper configuration
  return useTokenApi<PoolOHLCResponse>(
    endpoint,
    { ...params },
    { ...options, skip }
  );
}
