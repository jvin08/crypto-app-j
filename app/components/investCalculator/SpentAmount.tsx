import React, { useEffect } from "react";
import { useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { amountInvested, filterPrices, info } from "./utils";
import { ToolTip } from "./ToolTip";

const SpentAmount = (
  {
    query, 
    growRate, 
    interval, 
    initialAmount,
    days,
    startTime,
    endTime,
    getChartData,
    innerStyle,
    outerStyle
  }:{
    query:string, 
    growRate:number, 
    interval:number, 
    initialAmount: number,
    days: number | undefined
    startTime: string,
    endTime: string,
    getChartData: Function,
    innerStyle: string,
    outerStyle: string
  }) => {
  const { data } = useGetCoinDataByDateQuery(query);
  const coinPrices = filterPrices(data, days, interval, startTime, endTime);
  const define = amountInvested(initialAmount, coinPrices, growRate);
  const chartData = define.investValuePerPeriod as number[][];
  useEffect(() => {
    getChartData(chartData);
  },[chartData, getChartData]);
  return (
    <>
      <div className={outerStyle + " sm:h-[93px]"}>
        <div className={innerStyle + " sm:h-14"}>
          <p className="mr-2">Total amount spent on investments</p><ToolTip text={info.total} />
        </div>
        <p className="sm:h-10 h-[52px] text-right pr-3 flex items-center">{define.spentAmount}</p> 
      </div>
      <div className="relative w-full flex sm:items-start justify-between items-center sm:flex-col h-[52px] sm:h-[82px]">
        <div className={innerStyle + " sm:h-14"}>
          <p className="mr-2">Coins value, $</p><ToolTip text={info.value} />
        </div>
        <p className="sm:h-10 h-[52px] text-right pr-3 flex items-center">{define.lastValue}</p> 
      </div>
    </>
  );
};
export default SpentAmount;
