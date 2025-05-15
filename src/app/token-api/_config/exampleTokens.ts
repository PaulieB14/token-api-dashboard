import { NetworkId } from './networks';

/**
 * Example token information interface
 */
export interface TokenExample {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  description?: string;
}

/**
 * Example tokens for each network
 * These are used for testing and demonstration purposes
 */
export const EXAMPLE_TOKENS: Record<NetworkId, TokenExample[]> = {
  mainnet: [
    {
      address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7',
      name: 'The Graph',
      symbol: 'GRT',
      decimals: 18,
      description: 'Indexing protocol for querying networks',
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
      description: 'Governance token for Uniswap protocol',
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      description: 'Decentralized stablecoin pegged to USD',
    },
  ],
  'arbitrum-one': [
    {
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      name: 'Arbitrum',
      symbol: 'ARB',
      decimals: 18,
      description: 'Governance token for Arbitrum DAO',
    },
    {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      description: 'Stablecoin pegged to USD',
    },
  ],
  base: [
    {
      address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      description: 'Decentralized stablecoin pegged to USD',
    },
    {
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      description: 'Stablecoin pegged to USD',
    },
  ],
  bsc: [
    {
      address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      name: 'PancakeSwap Token',
      symbol: 'CAKE',
      decimals: 18,
      description: 'Governance token for PancakeSwap',
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 18,
      description: 'Stablecoin pegged to USD',
    },
  ],
  optimism: [
    {
      address: '0x4200000000000000000000000000000000000042',
      name: 'Optimism',
      symbol: 'OP',
      decimals: 18,
      description: 'Governance token for Optimism',
    },
    {
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      description: 'Stablecoin pegged to USD',
    },
  ],
  matic: [
    {
      address: '0x0000000000000000000000000000000000001010',
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
      description: 'Native token of Polygon network',
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      description: 'Stablecoin pegged to USD',
    },
  ],
};

/**
 * Get example tokens for a specific network
 * @param networkId Network ID
 * @returns Array of example tokens for the network
 */
export const getExampleTokensForNetwork = (networkId: NetworkId): TokenExample[] => {
  return EXAMPLE_TOKENS[networkId] || [];
};

/**
 * Get the first example token for a network
 * @param networkId Network ID
 * @returns First example token or undefined if none exist
 */
export const getFirstExampleTokenForNetwork = (networkId: NetworkId): TokenExample | undefined => {
  const tokens = getExampleTokensForNetwork(networkId);
  return tokens.length > 0 ? tokens[0] : undefined;
};

/**
 * Get an example token address for a network
 * @param networkId Network ID
 * @returns Example token address or empty string if none exist
 */
export const getExampleTokenAddress = (networkId: NetworkId): string => {
  const token = getFirstExampleTokenForNetwork(networkId);
  return token ? token.address : '';
};
