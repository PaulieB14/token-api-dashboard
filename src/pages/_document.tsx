import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload script to avoid FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
