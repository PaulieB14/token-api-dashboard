"use client";

import { TokenMetadata, TokenMetadataParams } from "../_types/api";
import { cleanContractAddress } from "../_utils/utils";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching token metadata
 * 
 * @param contract Token contract address
 * @param params Optional parameters (network_id, include_market_data)
 * @param options Hook options
 * @returns Token metadata, loading state, error state, and refetch function
 */
export const useTokenMetadata = (
  contract: string | undefined,
  params?: TokenMetadataParams,
  options = { skip: contract ? false : true }
) => {
  // Clean and normalize the contract address
  const normalizedContract = cleanContractAddress(contract);
  
  // Call the base hook with the appropriate endpoint
  return useTokenApi<TokenMetadata>(
    normalizedContract ? `tokens/evm/${normalizedContract}` : "",
    { ...params },
    options
  );
};
