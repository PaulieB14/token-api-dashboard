'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  // Make sure we're only rendering client-side to avoid serialization issues
  useEffect(() => {
    // This component only needs to run on the client
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}
