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
  const define = amountInvested(initialAmount, coinPrices, growRate);
  const chartData = define.investValuePerPeriod as number[][];
  useEffect(() => {
    getChartData(chartData);
  },[chartData]);
  return (
    <>
      <p className="pt-[14px] h-[52px] text-right border-b-[1px] border-cryptodark-160">{define.spentAmount}</p>
      <p className="pt-[14px] h-[52px] text-right">{define.lastValue}</p>
    </>
  );
};
export default SpentAmount;
