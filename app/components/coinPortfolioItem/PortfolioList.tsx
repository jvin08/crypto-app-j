import React from "react";
import CoinCard from "./CoinCard";
import { useGetOneCoinDataQuery } from "../../lib/marketSlice";
const PortfolioList = () => {
  const { data } = useGetOneCoinDataQuery("bitcoin");
  const coin = {
    currentPrice: data?.market_data.current_price.usd,
    priceChange: data?.market_data.price_change_percentage_24h,
    marketCap: data?.market_data.market_cap.usd,
    volume: data?.market_data.total_volume.usd,
    circulatingSupply: data?.market_data.circulating_supply,
    maxSupply: data?.market_data.total_supply,
  };
  return (
    <>
      <CoinCard coin={coin} />
    </>
  );
};
export default PortfolioList;