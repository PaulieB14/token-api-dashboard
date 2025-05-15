'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="navbar bg-base-200">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          The Graph Token API
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/token-api">Explorer</Link>
          </li>
          <li>
            <Link href="/token-api/metadata">Metadata</Link>
          </li>
          <li>
            <Link href="/token-api/balances">Balances</Link>
          </li>
          <li>
            <a href="https://thegraph.com/docs/en/token-api/quick-start/" target="_blank" rel="noopener noreferrer">
              API Docs
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
}
