import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { amountInvested } from "./utils";
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
  const coinPrices = data?.prices.filter((item:number[], index:number) => {
    const adjustedInterval = Number(days) < 91 ? Math.floor(interval * 24) : interval * 1;
    if(index % Number(adjustedInterval) === 0){
      return item;
    }
  }).map((item:number[]) => {
    return item[1];
  });
  coinPrices.push(data?.prices.slice(-1)[0][1]);
  const spentMoney = amountInvested(initialAmount, coinPrices, growRate);
  return (
    <>
      <p>{spentMoney[0]}</p>
      <p>{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmount;