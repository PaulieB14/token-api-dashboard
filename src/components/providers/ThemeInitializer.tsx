'use client';

import ThemeInit from '@/lib/theme';
import Script from 'next/script';

// This component serves two purposes:
// 1. Runs the ThemeInit hook to set the theme on the client side
// 2. Provides an inline script for immediate theme application before hydration
export default function ThemeInitializer() {
  return (
    <>
      <ThemeInit />
      <Script
        id="theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            })();
          `,
        }}
      />
    </>
  );
}
