'use client';

import { useEffect } from 'react';

// Theme types and utilities
export type Theme = 'light' | 'dark';

// Get theme from localStorage or system preference
export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    // First check localStorage
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) return storedTheme;
    
    // Then check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Error getting theme preference:', e);
  }
  
  // Default to light theme
  return 'light';
};

// Set theme in DOM and localStorage
export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
  
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.error('Error setting theme preference:', e);
  }
};

// Enable transitions after initial load
export const enableThemeTransitions = (): void => {
  if (typeof window === 'undefined') return;
  
  // Add transition class after a small delay to prevent initial flash
  setTimeout(() => {
    document.documentElement.classList.add('theme-transition');
  }, 100);
};

// Theme initializer component
export default function ThemeInit() {
  useEffect(() => {
    const theme = getTheme();
    setTheme(theme);
    enableThemeTransitions();
  }, []);
  
  return null;
}
