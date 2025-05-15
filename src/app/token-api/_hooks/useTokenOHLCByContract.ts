"use client";

import { ContractOHLCResponse } from "../_types/api";
import { NetworkId } from "../_config/networks";
import { useTokenApi } from "./useTokenApi";

/**
 * Options for useTokenOHLCByContract hook
 */
export interface UseTokenOHLCByContractOptions {
  contract?: string;
  network?: NetworkId;
  timeframe?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  enabled?: boolean;
}

/**
 * Hook for fetching OHLC data for a token contract
 * 
 * @param options Configuration options
 * @returns Contract OHLC data, loading state, error state, and refetch function
 */
export function useTokenOHLCByContract(
  options: UseTokenOHLCByContractOptions = {}
) {
  const {
    contract,
    network,
    timeframe = 86400,
    limit = 100,
    enabled = true,
    startTime,
    endTime,
  } = options;

  const normalizedContract = contract?.toLowerCase();
  const endpoint = normalizedContract
    ? `ohlc/prices/evm/${normalizedContract}`
    : "";

  return useTokenApi<ContractOHLCResponse>(
    endpoint,
    {
      network_id: network,
      interval: timeframe === 86400 ? "1d" : "1h",
      limit,
      startTime,
      endTime,
    },
    {
      skip: !normalizedContract || !enabled,
    }
  );
}