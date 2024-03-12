"use client";
import React from "react";
import DataElement from "./DataElement";
import StatusBar from "./StatusBar";
import Image from "next/image";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery } from "../../lib/marketSlice";
const CoinCard = ({storageData}:{storageData:any}) => {
  const darkmode = useSelector(selectDarkmode);
  const { data } = useGetOneCoinDataQuery(storageData.coin.toLowerCase());
  const coin = {
    currentPrice: data?.market_data.current_price.usd,
    priceChange: data?.market_data.price_change_percentage_24h,
    marketCapVol: (Number(data?.market_data.total_volume.usd) / Number(data?.market_data.market_cap.usd)).toFixed(2)+"",
    circSupVsMaxSup: Number(data?.market_data.circulating_supply) / Number(data?.market_data.total_supply)+"",
  };
  return (
    <div className="flex text-cryptodark-100 mb-6">
      <div className="w-[calc(25%-2rem)] flex flex-col justify-center items-center bg-cryptodark-300">
        <div className={clsx("w-12 h-12 pl-[9px] pt-[10px] mb-4 rounded-lg",{
          "bg-cryptodark-160": darkmode,
        })}>
          <Image src={storageData.image} width={30} height={30} alt="coin" />
        </div>
        <p>{storageData.coin} ({storageData.symbol})</p>
      </div>
      <div className="w-[calc(75%+2rem)] p-5 bg-cryptodark-350 text-cryptodark-100">
        <div>
          <div className="flex justify-between mb-2 mt-4">
            <h2 className="text-xl">Market Price</h2>
            <div className="pt-1 pl-1 w-[30px] h-[30px] bg-[#3A3978] rounded-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg"  className="hover:opacity-70" fill="white" width="20" height="20"  viewBox="0 0 45 45" id="delete">
                <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z">
                </path>
                <path fill="none" d="M0 0h48v48H0z">
                </path>
              </svg>
            </div>
          </div>
          <div className="flex justify-between border-b pb-4">
            <DataElement name="Current price:" value={coin.currentPrice} width="w-1/6" />
            <DataElement name="Price cgange 24h:" value={coin.priceChange} width="w-1/6" />
            <StatusBar name="Market Cap vs Volume:" width={coin.marketCapVol} />
            <DataElement name="Circ supply vs max supply:" value={coin.circSupVsMaxSup}  width="w-1/4"/>
          </div>
        </div>
        <div>
          <div className="flex justify-between mt-4 mb-2">
            <h2 className="text-xl">Your coin</h2>
            <svg className="cursor-pointer hover:opacity-70" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="4" fill="#3A3978" className=""/>
              <path d="M21.2594 11.6002L13.0494 20.2902C12.7394 20.6202 12.4394 21.2702 12.3794 21.7202L12.0094 24.9602C11.8794 26.1302 12.7194 26.9302 13.8794 26.7302L17.0994 26.1802C17.5494 26.1002 18.1794 25.7702 18.4894 25.4302L26.6994 16.7402C28.1194 15.2402 28.7594 13.5302 26.5494 11.4402C24.3494 9.37022 22.6794 10.1002 21.2594 11.6002Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.8906 13.0498C20.3206 15.8098 22.5606 17.9198 25.3406 18.1998" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 30H29" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex justify-between">
            <DataElement name="Coin amount:" value={storageData.amount} width="w-1/6" />
            <DataElement name="Amount value:" value="0.00" width="w-1/6" />
            <DataElement name="Gain / Loss:" value="0.00"  width="w-1/4"/>
            <DataElement name="Purchase date:" value={storageData.purchaseTime}  width="w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinCard;
