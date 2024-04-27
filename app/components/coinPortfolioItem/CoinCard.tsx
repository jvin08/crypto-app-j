"use client";
import React from "react";
import DataElement from "./DataElement";
import StatusBar from "./StatusBar";
import CoinImage from "./CoinImage";
import { ToolTipCoinCard }  from "./ToolTip";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery, useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { timeInterval, calculatePrice, formatTime } from "./utils";

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
  return (
    <div  className={clsx("",{
      "bg-cryptoblue-200": !darkmode,
      "bg-cryptodark-350": darkmode,
    })}>
      <div className={clsx("flex cursor-pointer h-[292px]",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-200": !darkmode,
      })}>
        <CoinImage data={storageData} />
        <div className={clsx("w-[calc(80%+2rem)] p-8 pb-[26px]",{
          "bg-cryptodark-350": darkmode,
          "bg-cryptoblue-200": !darkmode,
        })}>
          <div className="h-[116px] border-b">
            <div className="flex justify-between mb-0 mt-[10px] rounded-[22px]">
              <h2 className="text-xl m-0 p-0">Market Price</h2>
              <div className="-mr-4 -mb-4">
                <ToolTipCoinCard name="Delete coin" eventHandler={(e: any)=>toggleDeleteModal(e, storageData.id)}/>
              </div>
            </div>
            <div className="flex justify-between pb-4 mt-5">
              <DataElement name="Current price:" value={coin.currentPrice} width="w-1/12" />
              <DataElement name="Price cgange 24h:" value={coin.priceChange} width="w-1/3" />
              <StatusBar name="Market Cap vs Volume:" width={coin.marketCapVol} />
              <DataElement name="Circ supply vs max supply:" value={coin.circSupVsMaxSup.toFixed(2)}  width="w-1/4"/>
            </div>
          </div>
          <div>
            <div className="flex justify-between mt-8 mb-2">
              <h2 className="text-xl">Your coin</h2>
              <div className="-mr-4">
                <ToolTipCoinCard name="Edit coin data" eventHandler={(e: any)=>toggleEditModal(e, storageData.id)} />
              </div>
            </div>
            <div className="flex justify-between">
              <DataElement name="Coin amount:" value={storageData.amount} width="w-1/12" />
              <DataElement name="Amount value:" value={coin.amountValue} width="w-1/3" />
              <DataElement name="Gain / Loss:" value={gainOrLoss}  width="w-1/4"/>
              <DataElement name="Purchase date:" value={formatTime(storageData.purchaseTime)}  width="w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinCard;