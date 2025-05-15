"use client";

import { Swap, SwapsParams } from "../_types/api";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching DEX swap events
 * 
 * @param params Query parameters (network_id is required)
 * @param options Hook options
 * @returns Swaps data, loading state, error state, and refetch function
 */
export const useTokenSwaps = (
  params: SwapsParams,
  options: { skip?: boolean } = {}
) => {
  return useTokenApi<Swap[]>("swaps/evm", params, options);
};
