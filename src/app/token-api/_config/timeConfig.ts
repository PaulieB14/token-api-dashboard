/**
 * Time interval configuration for The Graph Token API
 */

/**
 * Time interval interface
 */
export interface TimeInterval {
  id: string;
  name: string;
}

/**
 * Time span interface with duration in seconds
 */
export interface TimeSpan {
  id: string;
  name: string;
  seconds: number;
}

/**
 * Available time intervals for data resolution
 */
export const TIME_INTERVALS: TimeInterval[] = [
  { id: '1h', name: '1 Hour' },
  { id: '4h', name: '4 Hours' },
  { id: '1d', name: '1 Day' },
  { id: '1w', name: '1 Week' },
];

/**
 * Available time spans for data range selection
 */
export const TIME_SPANS: TimeSpan[] = [
  { id: '1d', name: 'Last 24 Hours', seconds: 86400 },
  { id: '7d', name: 'Last 7 Days', seconds: 604800 },
  { id: '30d', name: 'Last 30 Days', seconds: 2592000 },
  { id: '90d', name: 'Last 90 Days', seconds: 7776000 },
  { id: '180d', name: 'Last 180 Days', seconds: 15552000 },
  { id: '1y', name: 'Last Year', seconds: 31536000 },
  { id: 'all', name: 'All Time', seconds: 0 },
];

/**
 * Get a time span by ID
 * @param id Time span ID
 * @returns Time span object or undefined if not found
 */
export const getTimeSpanById = (id: string): TimeSpan | undefined => {
  return TIME_SPANS.find((span) => span.id === id);
};

/**
 * Get a time interval by ID
 * @param id Time interval ID
 * @returns Time interval object or undefined if not found
 */
export const getTimeIntervalById = (id: string): TimeInterval | undefined => {
  return TIME_INTERVALS.find((interval) => interval.id === id);
};

/**
 * Get time range (start and end timestamps) based on a time span
 * @param timeSpanId Time span ID
 * @returns Object with start and end timestamps in seconds
 */
export const getTimeRange = (timeSpanId: string) => {
  const timeSpan = getTimeSpanById(timeSpanId);
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  
  if (!timeSpan) {
    return {
      startTime: now - 86400, // Default to 24 hours
      endTime: now,
    };
  }
  
  // If 'all' time, use a far past date (Jan 1, 2020)
  const startTime = timeSpan.id === 'all' ? 1577836800 : now - timeSpan.seconds;
  
  return {
    startTime,
    endTime: now,
  };
};
