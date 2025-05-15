'use client';
 
import { useEffect } from 'react';
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
    // Theme handled in pages/_app.js now
  }, [error]);
 
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-base-100 text-base-content">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-lg mb-6">We apologize for the inconvenience. Please try again.</p>
          <button
            onClick={() => reset()}
            className="bg-primary text-white font-bold py-2 px-4 rounded hover:opacity-80"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
