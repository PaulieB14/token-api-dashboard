/**
 * Network configuration for The Graph Token API
 */

/**
 * Network identifier types
 */
export type NetworkId = 'mainnet' | 'base' | 'arbitrum-one' | 'bsc' | 'optimism' | 'matic';

/**
 * Network information interface
 */
export interface EVMNetwork {
  id: NetworkId;
  name: string;
  blockExplorer: string;
}

/**
 * List of supported EVM networks
 */
export const EVM_NETWORKS: EVMNetwork[] = [
  { id: 'mainnet', name: 'Ethereum', blockExplorer: 'https://etherscan.io' },
  { id: 'base', name: 'Base', blockExplorer: 'https://basescan.org' },
  { id: 'arbitrum-one', name: 'Arbitrum', blockExplorer: 'https://arbiscan.io' },
  { id: 'bsc', name: 'BSC', blockExplorer: 'https://bscscan.com' },
  { id: 'optimism', name: 'Optimism', blockExplorer: 'https://optimistic.etherscan.io' },
  { id: 'matic', name: 'Polygon', blockExplorer: 'https://polygonscan.com' },
];

/**
 * Get network by ID
 * @param id Network ID
 * @returns Network information or undefined if not found
 */
export const getNetworkById = (id: NetworkId): EVMNetwork | undefined => {
  return EVM_NETWORKS.find((network) => network.id === id);
};

/**
 * Get network name by ID
 * @param id Network ID
 * @returns Network name or "Unknown Network" if not found
 */
export const getNetworkName = (id: NetworkId): string => {
  const network = getNetworkById(id);
  return network ? network.name : 'Unknown Network';
};

/**
 * Get block explorer URL for a token contract
 * @param networkId Network ID
 * @param tokenAddress Token contract address
 * @returns Block explorer URL for the token
 */
export const getBlockExplorerTokenUrl = (networkId: NetworkId, tokenAddress: string): string => {
  const network = getNetworkById(networkId);
  if (!network) return '';
  return `${network.blockExplorer}/token/${tokenAddress}`;
};

/**
 * Get block explorer URL for an address (wallet or contract)
 * @param networkId Network ID
 * @param address Wallet or contract address
 * @returns Block explorer URL for the address
 */
export const getBlockExplorerAddressUrl = (networkId: NetworkId, address: string): string => {
  const network = getNetworkById(networkId);
  if (!network) return '';
  return `${network.blockExplorer}/address/${address}`;
};

/**
 * Get block explorer URL for a transaction
 * @param networkId Network ID
 * @param txHash Transaction hash
 * @returns Block explorer URL for the transaction
 */
export const getBlockExplorerTxUrl = (networkId: NetworkId, txHash: string): string => {
  const network = getNetworkById(networkId);
  if (!network) return '';
  return `${network.blockExplorer}/tx/${txHash}`;
};
