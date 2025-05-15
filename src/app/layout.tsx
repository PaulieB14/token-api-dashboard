import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/ui/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Header from '@/components/ui/Header';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Graph Token API Dashboard',
  description: 'A comprehensive dashboard for The Graph Token API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
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
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-screen bg-base-100 text-base-content">
            <Header />
            <div className="container mx-auto px-4">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
