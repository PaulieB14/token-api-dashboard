import { useEffect } from 'react';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Set theme from localStorage or default to light
    try {
      const savedTheme = localStorage.getItem('theme');
      document.documentElement.setAttribute(
        'data-theme', 
        savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      );
      
      // Add transition class after initial load
      setTimeout(() => {
        document.documentElement.classList.add('theme-transition');
      }, 100);
    } catch (e) {
      console.error('Error applying theme:', e);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
