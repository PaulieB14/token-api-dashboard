import { useEffect } from 'react';
import Link from 'next/link';

function Error({ statusCode }) {
  useEffect(() => {
    // Set theme from localStorage or default to light
    try {
      const savedTheme = localStorage.getItem('theme');
      document.documentElement.setAttribute(
        'data-theme', 
        savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      );
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        {statusCode ? `Error ${statusCode}` : 'An Error Occurred'}
      </h1>
      <p className="text-lg mb-6">
        {statusCode
          ? `A server-side error occurred.`
          : 'An error occurred on client.'}
      </p>
      <Link href="/" className="bg-primary text-white font-bold py-2 px-4 rounded hover:opacity-80">
        Return to Home
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
