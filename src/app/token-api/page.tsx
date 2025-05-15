"use client";

import Link from 'next/link';
import { FiDatabase, FiDollarSign, FiUsers, FiRepeat, FiInfo, FiBarChart2 } from 'react-icons/fi';

export default function TokenApiDashboard() {
  const features = [
    {
      title: 'Token Metadata',
      icon: <FiInfo className="w-6 h-6" />,
      description: 'View detailed information about any ERC-20 token',
      link: '/token-api/metadata',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-500',
    },
    {
      title: 'Token Balances',
      icon: <FiDatabase className="w-6 h-6" />,
      description: 'Check balances for any wallet address',
      link: '/token-api/balances',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      borderColor: 'border-green-500',
    },
    {
      title: 'Holder Analysis',
      icon: <FiUsers className="w-6 h-6" />,
      description: 'Explore token distribution and top holders',
      link: '/token-api/holders',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      borderColor: 'border-purple-500',
    },
    {
      title: 'Transfer History',
      icon: <FiRepeat className="w-6 h-6" />,
      description: 'Track token transfers with filtering options',
      link: '/token-api/transfers',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      borderColor: 'border-orange-500',
    },
    {
      title: 'Price Analytics',
      icon: <FiDollarSign className="w-6 h-6" />,
      description: 'Visualize price history and trends',
      link: '/token-api/price',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      borderColor: 'border-red-500',
    },
    {
      title: 'Liquidity Pools',
      icon: <FiBarChart2 className="w-6 h-6" />,
      description: 'Explore liquidity pools and swap data',
      link: '/token-api/pools',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      borderColor: 'border-indigo-500',
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">The Graph Token API Explorer</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Explore token data across multiple networks using The Graph's Token API.
          Select a feature below to get started.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature) => (
          <Link 
            key={feature.title}
            href={feature.link}
            className={`card shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-white ${feature.color} ${feature.hoverColor}`}
          >
            <div className="card-body">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h2 className="card-title text-2xl">{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 bg-base-200 rounded-lg p-6 shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About The Graph Token API</h2>
        <p className="mb-4">
          The Graph's Token API provides unified access to token data across multiple EVM networks.
          It aggregates information from various sources to give you comprehensive insights into
          ERC-20 tokens, their holders, transfers, and market activity.
        </p>
        <p>
          This dashboard demonstrates the capabilities of the Token API with simple, reusable
          components that you can incorporate into your own projects.
        </p>
        <div className="mt-4">
          <a 
            href="https://thegraph.com/docs/en/token-api/quick-start/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View API Documentation
          </a>
        </div>
      </div>
    </div>
  );
}