import React from "react";
import PricePercentage from "./PricePercentage";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "../../lib/dynamicValuesSlice";
import { clsx } from "clsx";
import Image from "next/image";
import StatusBar from "./StatusBar";
import Chart from "./Chart";
import { Coin } from "@/app/types/types";

const CoinCard = ({coin, index}: {coin: Coin, index: number}) => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  return (
    <div>
      <div className={clsx("w-full h-[75px] text-center my-2 py-6 pl-6 pr-8 rounded-xl flex items-center text-xs",{
        "text-cryptoblue-400 bg-cryptodark-200": darkmode,
        "text-cryptodark-400 bg-cryptoblue-100": !darkmode,
      })}>
        <div className="w-1/2 flex items-center">
          <p className="mr-5">{index}</p>
          <div className="relative w-8 h-8">
            <Image src={coin.image} alt={coin.name} fill sizes="32px, 32px" />
          </div>
          <p className="w-1/6 flex justify-start ml-4 text-left">{coin.name} ({coin.symbol.toUpperCase()})</p>
          <p className="text-left w-1/12 ml-auto mr-5">{currency.sign + "" + coin.current_price.toFixed(2)}</p>
          <PricePercentage price={coin.price_change_percentage_1h_in_currency} />
          <PricePercentage price={coin.price_change_percentage_24h_in_currency} />
          <PricePercentage price={coin.price_change_percentage_7d_in_currency} />
        </div>
        <StatusBar unitOne={coin.total_volume} unitTwo={coin.market_cap} index={index} />
        <StatusBar unitOne={coin.circulating_supply} unitTwo={coin.total_supply} index={index} />
        <Chart data={coin.sparkline_in_7d.price} index={index} />
      </div>
    </div>
  );
};
export default CoinCard;
