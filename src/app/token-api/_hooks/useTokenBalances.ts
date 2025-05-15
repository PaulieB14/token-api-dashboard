"use client";

import { TokenBalance, TokenBalancesParams } from "../_types/api";
import { useTokenApi } from "./useTokenApi";

/**
 * Response type for token balances
 */
type TokenBalancesResponse = TokenBalance[] | { data: TokenBalance[] };

/**
 * Hook for fetching token balances for a wallet address
 * 
 * @param address Wallet address
 * @param params Optional parameters (network_id, page, page_size, min_amount, contract_address)
 * @param options Hook options
 * @returns Token balances, loading state, error state, and refetch function
 */
export const useTokenBalances = (
  address: string | undefined,
  params?: TokenBalancesParams,
  options = { skip: address ? false : true }
) => {
  // Normalize the address
  const normalizedAddress =
    address && !address.startsWith("0x") ? `0x${address}` : address;

  // Call the base hook with the appropriate endpoint
  const result = useTokenApi<TokenBalancesResponse>(
    normalizedAddress ? `balances/evm/${normalizedAddress}` : "",
    { ...params },
    options
  );

  // Format the result for easier consumption
  let formattedData: TokenBalance[] = [];
  if (result.data) {
    if (Array.isArray(result.data)) {
      formattedData = result.data;
    } else if ("data" in result.data && Array.isArray(result.data.data)) {
      formattedData = result.data.data;
    }
  }

  return {
    ...result,
    data: formattedData,
  };
};
