import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { amountInvested, filterPrices } from "./utils";
const SpentAmount = (
  {
    query, 
    growRate, 
    interval, 
    initialAmount,
    days
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval);
  const spentMoney = amountInvested(initialAmount, coinPrices, growRate);
  return (
    <>
      <p>{spentMoney[0]}</p>
      <p>{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmount;