import Script from 'next/script';

// This is a simple script tag that runs a small script before any React
// rendering happens to set the theme and avoid any flash of unstyled content
export default function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
    >{`
      (function() {
        try {
          // Try to get theme from localStorage
          const savedTheme = localStorage.getItem('theme');
          
          // If theme is saved, apply it immediately to avoid flashing
          if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
          } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no theme saved but user prefers dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            // Default to light theme
            document.documentElement.setAttribute('data-theme', 'light');
          }
        } catch (e) {
          // Fallback to default theme if localStorage is not available
          document.documentElement.setAttribute('data-theme', 'light');
        }
      })();
    `}</Script>
  );
}
