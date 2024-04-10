"use client";
import React from "react";
import DataElement from "./DataElement";
import StatusBar from "./StatusBar";
import CoinImage from "./CoinImage";
import { ToolTipCoinCard }  from "./ToolTip";
import clsx from "clsx";
import { BackgroundGradient } from "./BackgroundGradient";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery, useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { timeInterval, calculatePrice } from "./utils";
const CoinCard = ({ storageData, toggleDeleteModal, toggleEditModal }:{ storageData:any, toggleDeleteModal: any, toggleEditModal: any }) => {
  const darkmode = useSelector(selectDarkmode);
  const { data } = useGetOneCoinDataQuery(storageData.coin);
  const days = timeInterval(storageData.purchaseTime);
  const coinId = storageData.coin;
  const query = `${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const { data: pricesByDate } = useGetCoinDataByDateQuery(query);
  const purchasePrice = calculatePrice(pricesByDate?.prices, storageData.purchaseTime);
  const gainOrLoss = ((data?.market_data.current_price.usd - purchasePrice) * storageData.amount).toFixed(2);
  const coin = {
    currentPrice: data?.market_data.current_price.usd,
    priceChange: data?.market_data.price_change_percentage_24h,
    marketCapVol: (Number(data?.market_data.total_volume.usd) / Number(data?.market_data.market_cap.usd)).toFixed(2)+"",
    circSupVsMaxSup: Number(data?.market_data.circulating_supply) / Number(data?.market_data.total_supply),
    amountValue: (data?.market_data.current_price.usd * storageData.amount).toFixed(2) + "",
  };
  const coinData = [gainOrLoss, storageData.coin, storageData.id];
  return (
    <BackgroundGradient  className={clsx("",{
      "bg-cryptoblue-200": !darkmode,
      "bg-cryptodark-350": darkmode,
    })} outerStyle="relative p-[4px] group" rounded="">
      <div className={clsx("flex cursor-pointer",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-200": !darkmode,
      })}>
        <CoinImage data={storageData} />
        <div className={clsx("w-[calc(80%+2rem)] p-5",{
          "bg-cryptodark-350": darkmode,
          "bg-cryptoblue-200": !darkmode,
        })}>
          <div>
            <div className="flex justify-between mb-2 mt-4 rounded-[22px]">
              <h2 className="text-xl">Market Price</h2>
              <div className={clsx("pt-1 pl-1 w-[30px] h-[30px] rounded-sm cursor-pointer",{
                "bg-[#3A3978] hover:border-cryptoblue-800 hover:border-[1px] box-border" : darkmode,
                "bg-cryptoblue-800" : !darkmode,
              })} >
                <ToolTipCoinCard name="Sell your coin" eventHandler={(e: any)=>toggleDeleteModal(e,coinData)}/>
              </div>
            </div>
            <div className="flex justify-between border-b pb-4">
              <DataElement name="Current price:" value={coin.currentPrice} width="w-1/6" />
              <DataElement name="Price cgange 24h:" value={coin.priceChange} width="w-1/6" />
              <StatusBar name="Market Cap vs Volume:" width={coin.marketCapVol} />
              <DataElement name="Circ supply vs max supply:" value={coin.circSupVsMaxSup.toFixed(2)}  width="w-1/4"/>
            </div>
          </div>
          <div>
            <div className="flex justify-between mt-4 mb-2">
              <h2 className="text-xl">Your coin</h2>
              <div className="-mr-4">
                <ToolTipCoinCard name="Edit coin data" eventHandler={(e: any)=>toggleEditModal(e, storageData.id)} />
              </div>
            </div>
            <div className="flex justify-between">
              <DataElement name="Coin amount:" value={storageData.amount} width="w-1/6" />
              <DataElement name="Amount value:" value={coin.amountValue} width="w-1/6" />
              <DataElement name="Gain / Loss:" value={gainOrLoss}  width="w-1/4"/>
              <DataElement name="Purchase date:" value={storageData.purchaseTime}  width="w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
};
export default CoinCard;