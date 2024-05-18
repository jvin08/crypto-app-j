import React, { useEffect } from "react";
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
    endTime,
    getChartData
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
    startTime: string,
    endTime: string
    getChartData: Function
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime, endTime);
  const spentMoney = amountInvested(initialAmount, coinPrices, growRate);
  const chartData = spentMoney[2] as number[][];
  useEffect(()=>{
    getChartData(chartData);
  },[chartData]);
  return (
    <>
      <p className="pt-[14px] h-[52px] text-right border-b-[1px] border-cryptodark-160">{spentMoney[0]}</p>
      <p className="pt-[14px] h-[52px] text-right">{spentMoney[1]}</p>
    </>
  );
};
export default SpentAmount;
