"use client";

import { TokenTransfersParams, TokenTransfersResponse } from "../_types/api";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching token transfers
 * 
 * @param address Address used as the 'to' parameter by default
 * @param params Optional parameters (network_id, from, contract, startTime, endTime, etc.)
 * @param options Hook options
 * @returns Token transfers, loading state, error state, and refetch function
 */
export const useTokenTransfers = (
  address: string | undefined, 
  params?: TokenTransfersParams,
  options = { skip: address ? false : true }
) => {
  // Endpoint for the base hook
  const endpoint = "transfers/evm";

  // Prepare query parameters, adding 'address' as 'to' param
  const queryParams: Record<string, any> = {
    ...params, // Spread other parameters like network_id, contract, limit, from
    to: address,
    network_id: params?.network_id, // Ensure network_id is passed
  };

  // Clean up undefined params
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] === undefined) {
      delete queryParams[key];
    }
  });

  // Call the base API hook
  return useTokenApi<TokenTransfersResponse>(endpoint, queryParams, options);
};
