/**
 * Utility functions for the Token API
 */

/**
 * Cleans a contract address by removing spaces, converting to lowercase, and ensuring 0x prefix
 * @param address The contract address to clean
 * @returns The cleaned address or empty string if no address provided
 */
export function cleanContractAddress(address?: string): string {
  if (!address) return '';

  // Remove spaces, convert to lowercase
  let cleaned = address.trim().toLowerCase();

  // Ensure it has the 0x prefix
  if (!cleaned.startsWith('0x')) {
    cleaned = '0x' + cleaned;
  }

  return cleaned;
}

/**
 * Shortens an Ethereum address for display
 * @param address The address to shorten
 * @param chars Number of characters to keep at each end
 * @returns Shortened address (e.g., 0x1234...5678)
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  const cleaned = cleanContractAddress(address);
  if (cleaned.length <= chars * 2 + 2) return cleaned; // Don't shorten if already short
  
  return `${cleaned.substring(0, chars + 2)}...${cleaned.substring(cleaned.length - chars)}`;
}

/**
 * Formats a number with commas as thousands separators
 * @param num Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Formats a currency value with specified number of decimal places
 * @param value Value to format
 * @param decimals Number of decimal places
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats a percentage value
 * @param value Percentage value (e.g., 0.05 for 5%)
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formats a token amount with respect to its decimals
 * @param amount Token amount in wei/smallest unit
 * @param decimals Token decimals
 * @returns Formatted token amount
 */
export function formatTokenAmount(amount: string, decimals: number): string {
  if (!amount) return '0';
  
  const value = parseFloat(amount) / Math.pow(10, decimals);
  
  // Use scientific notation for very large or small numbers
  if (value > 1e9 || (value < 1e-4 && value > 0)) {
    return value.toExponential(4);
  }
  
  // Show appropriate decimal places based on value
  if (value >= 1000) {
    return formatNumber(Math.floor(value * 100) / 100); // 2 decimal places
  } else if (value >= 1) {
    return formatNumber(Math.floor(value * 1000) / 1000); // 3 decimal places
  } else if (value > 0) {
    // For small values, show more decimal places but limit to 8
    const places = Math.min(8, Math.max(4, Math.abs(Math.floor(Math.log10(value))) + 2));
    return value.toFixed(places);
  }
  
  return '0';
}
