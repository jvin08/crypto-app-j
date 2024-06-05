"use client";
import React from "react";
import Image from "next/image";
import { MobileDataElement } from "./DataElement";
import { MobileStatusBar } from "./StatusBar";
import { MobTriangle } from "./CoinCardSVG";
import { isPositive } from "../coinPage/utils";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery, useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { timeInterval, calculatePrice, capitalize, formatTime } from "./utils";

const CoinCardMobile = ({ storageData }:{ storageData:any }) => {
  const darkmode = useSelector(selectDarkmode);
  const { data } = useGetOneCoinDataQuery(storageData.coin);
  const days = timeInterval(storageData.purchaseTime);
  const coinId = storageData.coin;
  const query = `${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const { data: pricesByDate } = useGetCoinDataByDateQuery(query);
  const purchasePrice = calculatePrice(pricesByDate?.prices, storageData.purchaseTime);
  const coin = {
    currentPrice: data?.market_data.current_price.usd,
    priceChange: data?.market_data.price_change_percentage_24h,
    marketCapVol: (Number(data?.market_data.total_volume.usd) / Number(data?.market_data.market_cap.usd)).toFixed(2)+"",
    circSupVsMaxSup: Number(data?.market_data.circulating_supply) / Number(data?.market_data.total_supply),
    amountValue: (data?.market_data.current_price.usd * storageData.amount).toFixed(2) + "",
  };
  return (
    <div  className={clsx("w-full rounded-xl",{
      "bg-cryptoblue-200": !darkmode,
      "bg-cryptodark-350": darkmode,
    })}>
      <div className="flex justify-between w-full px-3 pt-4 items-center">
        <div className="w-2/3">
          <p className={clsx("",{
            "text-cryptodark-100": darkmode,
          })}>{capitalize(storageData.coin)} ({storageData.symbol})</p>
          <p className="text-xs mt-2">Purchase date: {formatTime(storageData.purchaseTime)}</p>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <Image src={storageData.image} width={36} height={36} alt="coin" />
        </div>
      </div>
      <div className="flex items-center mt-5 ml-3 mb-4">
        <p className={clsx("text-xl mr-3",{
          "text-cryptodark-100": darkmode,
        })}>${purchasePrice?.toFixed(4)}</p>
        <MobTriangle percentage={((coin.currentPrice / purchasePrice) * 100) - 100} />
        <p className={clsx("ml-2",{
          "text-cryptoblue-650": isPositive(((coin.currentPrice / purchasePrice) * 100) - 100),
          "text-cryptoblue-750": !isPositive(((coin.currentPrice / purchasePrice) * 100) - 100),
        })}>{Math.abs(((coin.currentPrice / purchasePrice) * 100) - 100).toFixed(2)}%</p>
      </div>
      <div className={clsx("grid grid-rows-2 grid-cols-2 gap-2 text-xs text-left px-3 pt-4 pb-4 rounded-b-xl",{
        "bg-cryptodark-200": darkmode,
      })}>
        <MobileDataElement>
          <p className={clsx("text-base mt-3 text-left",{
            "text-cryptodark-100": darkmode,
          })}>${coin.currentPrice}</p>
          <p className="mt-1 text-left">Current price</p>
        </MobileDataElement>
        <MobileDataElement>
          <div className="mt-3 flex items-center justify-start">
            <MobTriangle percentage={coin.priceChange} />
            <p className={clsx("text-base ml-2",{
              "text-cryptoblue-650": isPositive(coin.priceChange),
              "text-cryptoblue-750": !isPositive(coin.priceChange),
            })}>{coin.priceChange?.toFixed(2)}%</p>
          </div>  
          <p className="mt-1 text-left">24h %</p>
        </MobileDataElement>
        <MobileDataElement>
          <MobileStatusBar name="Market Cap vs Volume:" width={coin.marketCapVol} />
        </MobileDataElement>
        <MobileDataElement>
          <div>Circ supply vs mark supply</div>
        </MobileDataElement>
      </div>
    </div>
  );
};
export default CoinCardMobile;
