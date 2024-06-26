import React from "react";
import PricePercentage from "./PricePercentage";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "../../lib/dynamicValuesSlice";
import { clsx } from "clsx";
import Image from "next/image";
import StatusBar from "./StatusBar";
import Chart from "./Chart";
import { Coin } from "@/app/types/types";
import useWindowWidth from "../hooks/hooks";

const CoinCard = ({coin, index}: {coin: Coin, index: number}) => {
  const width = useWindowWidth();
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const emptyImage = "/bitcoin.png";
  const coinPrice = coin.current_price !== null 
    ? coin.current_price < 1 
      ? coin.current_price.toFixed(4) 
      : coin.current_price.toFixed(2) 
    : "n/a";
  const isMobile = width < 481;
  return (
    <div>
      <div className={clsx("w-full h-[75px] sm:h-16 text-center my-2 py-6 pl-6 pr-8 sm:pr-1 sm:pl-3 rounded-xl flex items-center text-xs",{
        "text-cryptoblue-400 bg-cryptodark-200": darkmode,
        "text-cryptodark-400 bg-cryptoblue-100": !darkmode,
      })}>
        <div className="w-1/2 sm:w-full flex sm:justify-between items-center">
          <p className="mr-5 w-5 sm:hidden">{index || "n/a"}</p>
          <div className="relative w-8 h-8">
            {coin.image.startsWith("https") 
              ? <Image src={coin.image} alt={coin.name} width={31.36} height={32} style={{height: "auto", maxWidth: "100%"}} />
              : <Image src={emptyImage} alt="n/a" fill sizes="32px, 32px" />}
          </div>
          <div className="w-1/6 flex justify-start ml-4 sm:ml-1 sm:flex-col-reverse text-left"><p className="text-cryptodark-510">{coin.name}</p> <p>({coin.symbol.toUpperCase()})</p></div>
          {coin.current_price 
            ? <p className="text-left w-1/12 ml-auto sm:ml-1 mr-5">{currency.sign + "" + coinPrice}</p>
            : <p className="text-left w-1/12 ml-auto mr-6">n/a</p>
          }
          <PricePercentage price={coin.price_change_percentage_1h_in_currency} />
          <PricePercentage price={coin.price_change_percentage_24h_in_currency} />
          {!isMobile && <PricePercentage price={coin.price_change_percentage_7d_in_currency} />}
        </div>
        <StatusBar unitOne={coin.total_volume} unitTwo={coin.market_cap} index={index} />
        <StatusBar unitOne={coin.circulating_supply} unitTwo={coin.total_supply} index={index} />
        <Chart data={coin.sparkline_in_7d.price} index={index} />
      </div>
    </div>
  );
};
export default CoinCard;
