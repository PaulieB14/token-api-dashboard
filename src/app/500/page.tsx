'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom500() {
  // Make sure we're only rendering client-side to avoid serialization issues
  useEffect(() => {
    // This component only needs to run on the client
    try {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
      <p className="text-lg mb-6">Something went wrong on our end. Please try again later.</p>
      <Link href="/" className="bg-primary text-white font-bold py-2 px-4 rounded hover:opacity-80">
        Return to Home
      </Link>
    </div>
  );
}
