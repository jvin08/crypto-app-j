import React from "react";
import Coins from "./Coins";
import { useSelector } from "react-redux";
import { useGetMarketDataQuery, useGetCoinsDataQuery } from "../../lib/marketSlice";
import { selectCurrency, selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import Exchange from "./Exchange";
import Volume from "./Volume";
import Cap from "./Cap";
import FirstCoin from "./FirstCoin";
import SecondCoin from "./SecondCoin";
import clsx from "clsx";
export const TopNavbar: React.FC = () => {
  const currency = useSelector(selectCurrency);
  const darkmode = useSelector(selectDarkmode);
  const query = currency.label.toLowerCase();
  const { data, isLoading } = useGetMarketDataQuery("");
  const { data: dataBTC, } = useGetCoinsDataQuery(query);
  const newData = data?.data;
  const btcData = dataBTC?.[0];
  const market = {
    totalMarket: Number((btcData?.market_cap / (newData?.market_cap_percentage["btc"] / 100) / Math.pow(10,12)).toFixed(2)) ,
    coins: newData?.active_cryptocurrencies,
    exchange: newData?.markets,
    marketCap: Number((Math.floor(newData?.total_market_cap["btc"]) / 1000000).toFixed(2)),
    marketVolume: Number((Math.floor(newData?.total_volume["btc"]) / 1000000).toFixed(2)),
    marketPercentageFirst: Math.floor(newData?.market_cap_percentage["btc"]),
    marketPercentageSecond: Math.floor(newData?.market_cap_percentage["eth"]),
  };
  return (
    <div className={clsx("flex justify-center text-xs text-cryptoblue-100 py-3",{
      "bg-cryptodark-300": darkmode,
      "bg-cryptoblue-900": !darkmode,
    })}>
      <Coins quantity={market.coins}/>
      <Exchange quantity={market.exchange} />
      <Volume quantity={market.totalMarket} isLoading={isLoading} />
      <Cap quantity={market.marketCap} percentage={Math.floor(market.marketCap / market.totalMarket)}  isLoading={isLoading} />
      <FirstCoin quantity={market.marketPercentageFirst} isLoading={isLoading} />
      <SecondCoin quantity={market.marketPercentageSecond}  isLoading={isLoading} />
    </div>
  );
};
