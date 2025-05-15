import Link from 'next/link';

export default function TokenApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-12">
      {/* Header with navigation */}
      <header className="bg-base-200 shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold">Token API Dashboard</Link>
            
            <nav className="flex space-x-4">
              <Link href="/token-api" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Home
              </Link>
              <Link href="/token-api/metadata" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Metadata
              </Link>
              <Link href="/token-api/balances" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Balances
              </Link>
              <Link href="/token-api/holders" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Holders
              </Link>
              <Link href="/token-api/transfers" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Transfers
              </Link>
              <Link href="/token-api/price" className="px-3 py-2 rounded-md hover:bg-base-300 transition-colors">
                Price
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
