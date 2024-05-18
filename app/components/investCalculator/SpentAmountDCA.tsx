import React, { useEffect } from "react";
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
    endTime,
    getChartData
  }:{
    query:string, 
    growAmount:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined,
    startTime: string,
    endTime: string,
    getChartData: Function
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime, endTime);
  const define = amountInvestedDCA(initialAmount, coinPrices, growAmount);
  const chartData = define.investValuePerPeriod as number[][];
  useEffect(() => {
    getChartData(chartData);
  },[chartData, getChartData]);
  return (
    <>
      <p className="pt-[14px] h-[52px] text-right border-b-[1px] border-cryptodark-160">{define.spentAmount}</p>
      <p className="pt-[14px] h-[52px] text-right">{define.lastValue}</p>
    </>
  );
};
export default SpentAmountDCA;
