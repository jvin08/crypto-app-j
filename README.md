This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Crypto App

Crypto App is a web application that allows users to track cryptocurrency prices, volumes, view historical price charts, create and manage portfolios, compare information between different cryptocurrencies, and view charts with various time periods. The app fetches data from the CoinGecko API and utilizes various technologies including Next.js, Redux, React, Tailwind CSS, HTML, CSS, clsx, React Redux, React Chart.js 2, npm, and chartjs-plugin-crosshair.

## Functionalities

### Track Crypto Prices and Volumes
- View real-time cryptocurrency prices and trading volumes.
- Monitor changes in prices and volumes over time.

### Historical Price Charts
- View historical price charts for cryptocurrencies.
- Charts display data for up to 5 years back, allowing users to analyze long-term trends.

### Create and Manage Portfolio
- Create a personalized cryptocurrency portfolio.
- Save portfolio data in local storage for easy access.
- Calculate profits based on portfolio holdings and current prices.

### Get Details About Crypto Coins
- Access detailed information about individual cryptocurrency coins.
- View key metrics such as market cap, circulating supply, and price changes.

### Compare Information Between Coins
- Compare information between two chosen cryptocurrencies.
- Analyze differences in price, volume, market cap, and other metrics.

### View Charts with Different Time Periods
- View cryptocurrency charts with various time periods including:
  - 1 day
  - 7 days
  - 14 days
  - 1 month
  - 1 quarter
  - 1 year
  - 5 years

## Technologies Used
- Next.js
- Redux
- React
- Tailwind CSS
- HTML
- CSS
- clsx
- React Redux
- React Chart.js 2
- npm
- chartjs-plugin-crosshair

## Installation
1. Clone the repository.
2. Install dependencies using npm:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Access the app at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License
This project is licensed under the [MIT License](LICENSE).