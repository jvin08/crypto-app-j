import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { filterPrices, amountInvestedDCA } from "./utils";
const SpentAmountDCA = (
  {
    query, 
    growAmount, 
    interval, 
    initialAmount,
    days
  }:{
    query:string, 
    growAmount:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval);
  const spentMoney = amountInvestedDCA(initialAmount, coinPrices, growAmount);
  return (
    <>
      <p>{spentMoney[0]}</p>
      <p>{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmountDCA;