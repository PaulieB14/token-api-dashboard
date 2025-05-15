# The Graph Token API Dashboard

A comprehensive dashboard for interacting with The Graph Token API. This application allows you to explore token data, visualize metrics, and analyze blockchain token activity across multiple networks.

## Features

- **Token Metadata**: View detailed information about any ERC-20 token
- **Token Balances**: Check balances for any wallet address
- **Holder Analysis**: Explore token distribution and top holders
- **Transfer History**: Track token transfers with filtering options
- **Price Charts**: Visualize price history and trends
- **Liquidity Pools**: Monitor liquidity pool data
- **Swap Analysis**: Analyze DEX swap data
- **Theme Support**: Toggle between light and dark themes with persistent storage

## Getting Started

### Prerequisites

- Node.js 20.18.3 or later
- Yarn package manager
- A Graph API token from [The Graph Market](https://thegraph.market/)

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/PaulieB14/token-api-dashboard.git
   cd token-api-dashboard
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Create an `.env.local` file in the root directory with your Graph API token
   ```
   NEXT_PUBLIC_GRAPH_TOKEN=your_graph_api_token_here
   ```

4. Start the development server
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

This dashboard is optimized for deployment on Vercel. Follow these steps to deploy your own instance:

1. Fork this repository to your GitHub account
2. Create an account on [Vercel](https://vercel.com) if you don't have one
3. From your Vercel dashboard, click "New Project"
4. Import your forked repository
5. In the project configuration screen:
   - Set "Framework Preset" to Next.js
   - Add an environment variable:
     - Name: `NEXT_PUBLIC_GRAPH_TOKEN`
     - Value: Your Graph API token
6. Click "Deploy"

Your dashboard will be automatically built and deployed. Vercel will provide you with a unique URL where your dashboard is accessible.

## Theme Implementation

The dashboard implements a light/dark theme system with the following features:

- Theme preference is saved in local storage
- System preference detection (automatically uses dark theme if your system prefers it)
- Fast theme switching with no UI flashes
- Smooth transitions between themes after initial load
- Theme toggle button in the header

## Usage

The dashboard provides a user-friendly interface for interacting with various Token API endpoints:

- Enter any contract address to view token details
- Search for wallet addresses to view token balances
- Filter token transfers by address, contract, or time period
- View interactive price charts with different time intervals
- Explore liquidity pools and swap data across multiple networks
- Toggle between light and dark themes using the theme button in the header

## Supported Networks

- Ethereum (mainnet)
- Arbitrum
- Base
- BSC (Binance Smart Chain)
- Optimism
- Polygon (Matic)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
