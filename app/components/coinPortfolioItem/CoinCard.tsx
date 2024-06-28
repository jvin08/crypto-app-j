"use client";
import React from "react";
import { DataElement, PurchaseDate } from "./DataElement";
import StatusBar from "./StatusBar";
import CoinImage from "./CoinImage";
import { ToolTipMui }  from "./ToolTip";
import clsx from "clsx";
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
  return (
    <div  className={clsx("",{
      "bg-cryptoblue-200": !darkmode,
      "bg-cryptodark-350": darkmode,
    })}>
      <div className={clsx("flex sm:flex-col cursor-pointer sm:h-[630px] h-[292px] sm:px-4",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-200": !darkmode,
      })}>
        <CoinImage data={storageData} />
        <div className={clsx("sm:w-full w-[calc(80%+2rem)] sm:p-0 sm:pb-0 p-8 pb-[28px] sm:h-[450px]",{
          "bg-cryptodark-350": darkmode,
          "bg-cryptoblue-200": !darkmode,
        })}>
          <div className={clsx("sm:h-[220px] h-[110px] border-b sm:p-0",{
            "border-cryptodark-500": darkmode,
            "border-cryptoblue-500": !darkmode,
          })}>
            <div className="flex justify-between mb-0 mt-[10px] rounded-[22px]">
              <h2 className="text-xl m-0 p-0">Market Price</h2>
              <div className="-mr-4 -mb-4">
                <ToolTipMui text="Delete coin" eventHandler={(e: any)=>toggleDeleteModal(e, storageData.id)} marginBottom="8px"/>
              </div>
            </div>
            <div className="sm:h-[146px] sm:grid sm:grid-cols-2 flex justify-between sm:pb-0 pb-4 mt-5">
              <DataElement name="Current price:" value={coin.currentPrice} customStyles="sm:w-full w-1/12" />
              <DataElement name="Price cgange 24h:" value={coin.priceChange} customStyles="sm:w-full w-1/3 ml-auto" />
              <StatusBar name="Market Cap vs Volume:" width={coin.marketCapVol} />
              <DataElement name="Circ supply vs max supply:" value={coin.circSupVsMaxSup.toFixed(2)}  customStyles="sm:w-full w-[15%]"/>
            </div>
          </div>
          <div>
            <div className="flex justify-between mt-7 mb-2">
              <h2 className="text-xl">Your coin</h2>
              <div className="-mr-4">
                <ToolTipMui text="Edit coin data" eventHandler={(e: any)=>toggleEditModal(e, storageData.id)} marginBottom="25px"/>
              </div>
            </div>
            <div className="sm:h-[146px] sm:grid sm:grid-cols-2 flex justify-between">
              <DataElement name="Coin amount:" value={storageData.amount} customStyles="sm:w-full w-1/12" />
              <DataElement name="Amount value:" value={coin.amountValue} customStyles="sm:w-full w-1/3 ml-auto" />
              <DataElement name="Gain / Loss:" value={gainOrLoss}  customStyles="sm:w-full w-1/3"/>
              <PurchaseDate name="Purchase date:" value={storageData.purchaseTime}  customStyles="w-[15%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinCard;