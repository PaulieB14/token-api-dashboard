import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">The Graph Token API Dashboard</h1>
        <p className="text-xl mb-8">Explore token data across multiple networks using The Graph's Token API</p>
        
        <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-3">
          <Link 
            href="/token-api"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Token API Explorer</h2>
            <p>Comprehensive toolkit for exploring token data</p>
          </Link>
          
          <Link 
            href="/token-api/metadata"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Token Metadata</h2>
            <p>View detailed information about any ERC-20 token</p>
          </Link>
          
          <Link 
            href="/token-api/balances"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Token Balances</h2>
            <p>Check balances for any wallet address</p>
          </Link>
          
          <Link 
            href="/token-api/holders"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Holder Analysis</h2>
            <p>Explore token distribution and top holders</p>
          </Link>
          
          <Link 
            href="/token-api/transfers"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Transfer History</h2>
            <p>Track token transfers with filtering options</p>
          </Link>
          
          <Link 
            href="/token-api/price"
            className="card bg-base-200 hover:bg-base-300 transition-colors p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">Price Analytics</h2>
            <p>Visualize price history and trading activity</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
