import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { amountInvested, filterPrices } from "./utils";
const SpentAmount = (
  {
    query, 
    growRate, 
    interval, 
    initialAmount,
    days,
    startTime,
    endTime
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
    startTime: string,
    endTime: string
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime, endTime);
  const spentMoney = amountInvested(initialAmount, coinPrices, growRate);
  return (
    <>
      <p className="py-2">{spentMoney[0]}</p>
      <p className="py-2">{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmount;