'use client';

import { useEffect } from 'react';

export default function ClientThemeScript() {
  useEffect(() => {
    // Get the current theme or use a default
    const getInitialTheme = () => {
      if (typeof window === 'undefined') return 'light';
      
      try {
        const persistedColorPreference = window.localStorage.getItem('theme');
        if (persistedColorPreference) {
          return persistedColorPreference;
        }
        
        const hasMediaQueryPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (hasMediaQueryPreference) {
          return 'dark';
        }
        
        return 'light';
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return 'light';
      }
    };

    // Apply the theme
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store the theme
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
    
    // Add transition class after initial render
    const timer = setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
