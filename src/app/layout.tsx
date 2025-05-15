import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/ui/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Header from '@/components/ui/Header';
import ThemeHeadScript from '@/components/providers/ThemeHeadScript';
import ThemeInit from '@/lib/theme';

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
        <ThemeHeadScript />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeInit />
          <main className="min-h-screen bg-base-100 text-base-content">
            <Header />
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
