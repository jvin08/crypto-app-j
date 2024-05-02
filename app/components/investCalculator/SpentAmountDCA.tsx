import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { filterPrices, amountInvestedDCA } from "./utils";

const SpentAmountDCA = (
  {
    query, 
    growAmount, 
    interval, 
    initialAmount,
    days,
    startTime,
    endTime
  }:{
    query:string, 
    growAmount:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined,
    startTime: string,
    endTime: string
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime, endTime);
  const spentMoney = amountInvestedDCA(initialAmount, coinPrices, growAmount);
  return (
    <>
      <p className="pt-[14px] h-[52px] text-right border-b-[1px] border-cryptodark-160">{spentMoney[0]}</p>
      <p className="pt-[14px] h-[52px] text-right">{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmountDCA;