'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
    // Ensure theme is applied
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  }, [error]);
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-6">We apologize for the inconvenience. Please try again.</p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-content font-bold py-2 px-4 rounded hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}
