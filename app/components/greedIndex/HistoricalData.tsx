import React from "react";
import { ToolTip } from "./ToolTip";
import { color, toolTipInfo } from "./utils";

const HistoricalData = ({data}:{data:any}) => {
  const todayData = data?.data[0]?.value;
  const yesterdayData = data?.data[1]?.value;
  const lastWeekData = data?.data[7]?.value;
  const lastMonthData = data?.data[30]?.value;
  const colorToday = color(todayData);
  const colorYesterday = color(yesterdayData);
  const colorLastWeek = color(lastWeekData);
  const colorLastMonth = color(lastMonthData);
  return (
    <div className="flex justify-between p-4 px-[26px] text-cryptoblue-460">
      <div className="text-sm sm:text-base w-full">
        <ToolTip text={toolTipInfo(todayData)}>
          <p className={`cursor-help rounded-lg mt-0 p-1 px-3 flex ${colorToday}`}>Now: <span className="ml-auto">{todayData}</span></p>
        </ToolTip>
        <ToolTip text={toolTipInfo(yesterdayData)}>
          <p className={`cursor-help rounded-lg mt-3 p-1 px-3 flex ${colorYesterday}`}>Yesterday: <span className="ml-auto">{yesterdayData}</span></p>
        </ToolTip>
        <ToolTip text={toolTipInfo(lastWeekData)}>  
          <p className={`cursor-help rounded-lg mt-3.5 p-1 px-3 flex ${colorLastWeek}`}>Last Week: <span className="ml-auto">{lastWeekData}</span></p>
        </ToolTip>
        <ToolTip text={toolTipInfo(lastMonthData)}>  
          <p className={`cursor-help rounded-lg mt-3.5 p-1 px-3 flex ${colorLastMonth}`}>Last Month: <span className="ml-auto">{lastMonthData}</span></p>
        </ToolTip>
      </div>
    </div>
  );
};
export default HistoricalData;