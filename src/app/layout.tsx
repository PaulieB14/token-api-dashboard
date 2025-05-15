import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/ui/Footer';

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
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <main className="min-h-screen bg-base-100 text-base-content">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
