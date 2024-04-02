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
    startTime
  }:{
    query:string, 
    growAmount:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined,
    startTime: string
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime);
  const spentMoney = amountInvestedDCA(initialAmount, coinPrices, growAmount);
  return (
    <>
      <p className="py-2">{spentMoney[0]}</p>
      <p className="py-2">{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmountDCA;