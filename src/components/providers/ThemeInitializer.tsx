'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    // Function to set the initial theme
    const setInitialTheme = () => {
      try {
        // Try to get theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        
        // If theme is saved, apply it immediately
        if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          // If no theme saved but user prefers dark mode
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        } else {
          // Default to light theme
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        }
        
        // Add transition class after initial load
        setTimeout(() => {
          document.documentElement.classList.add('theme-transition');
        }, 100);
      } catch (e) {
        // Fallback to default theme if localStorage is not available
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    // Set initial theme
    setInitialTheme();

  }, []);

  // This component doesn't render anything
  return null;
}
