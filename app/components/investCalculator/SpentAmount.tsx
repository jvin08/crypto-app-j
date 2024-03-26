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
    startTime
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
    startTime: string
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime);
  const spentMoney = amountInvested(initialAmount, coinPrices, growRate);
  return (
    <>
      <p>{spentMoney[0]}</p>
      <p>{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmount;