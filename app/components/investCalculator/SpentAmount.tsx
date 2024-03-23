import React from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
const SpentAmount = (
  {
    query, 
    growRate, 
    interval, 
    initialAmount
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = data?.prices.filter((item:number[], index:number) => {
    if(index % interval === 0){
      return item;
    }
  }).map((item:number[]) => {
    return item[1];
  });
  const growArray = [initialAmount] as number[];
  const actualGrowArray = [0] as number[];
  for(let i=1;i<coinPrices.length;i++){
    initialAmount = initialAmount * (100 + Number(growRate)) / 100;
    growArray.push(initialAmount);
    const actualRate = coinPrices[i] / coinPrices[i-1] * 100 - 100;
    actualGrowArray.push(actualRate);
  }
  return <p>Spent</p>;
};
export default SpentAmount;