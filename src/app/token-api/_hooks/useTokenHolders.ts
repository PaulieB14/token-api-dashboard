"use client";

import { TokenHoldersParams, TokenHoldersResponse } from "../_types/api";
import { cleanContractAddress } from "../_utils/utils";
import { useTokenApi } from "./useTokenApi";

/**
 * Hook for fetching token holders
 * 
 * @param contract Token contract address
 * @param params Optional parameters (network_id, page, page_size, order_by)
 * @param options Hook options
 * @returns Token holders, loading state, error state, and refetch function
 */
export const useTokenHolders = (
  contract: string | undefined,
  params?: TokenHoldersParams,
  options = { skip: contract ? false : true }
) => {
  // Clean and normalize the contract address
  const normalizedContract = cleanContractAddress(contract);

  // Call the base hook with the appropriate endpoint
  return useTokenApi<TokenHoldersResponse>(
    normalizedContract ? `holders/evm/${normalizedContract}` : "",
    { ...params },
    options
  );
};
