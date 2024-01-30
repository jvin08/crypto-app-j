import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Bubble, Line } from "react-chartjs-2";
import { uid } from "uid";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice"
import { getChartData, options, fiveYears, oneYear, oneMonth, fourteenDays, sevenDays, oneDay } from "./utils";
  

export function LineChart({range}:{range: number}) { 
    //key chart duration, value time's step min or days
    const intervalIndex: { [key: string]: number } = {
        '1': 0,
        '7': 1,
        '14': 2,
        '31': 3,
        '365': 4,
        '1825': 5,
      };
    
    const timeIntervals = [oneDay, sevenDays, fourteenDays, oneMonth, oneYear, fiveYears]
  console.log('span: ', timeIntervals[intervalIndex[range]])
    const { data, error, isLoading } = useGetCoinsIntervalDataQuery(range)  

    const myData = data?.prices
    
    
    const oneDayLabels = myData?.map((item:number[],)=>{
        return new Date(item[0])
    });
    const oneDayPrices = myData?.map((item:number[])=>{
        return Math.floor(item[1])
    }); 
    
const chartData = getChartData(oneDayLabels, oneDayPrices)
   
  return <div className="w-1/2 my-10">
    <Line options={options} data={chartData} />
        <div className="flex justify-between">
            {timeIntervals[intervalIndex[range]].map((item:string)=>{
                return <p key={uid()} className="text-xs text-cryptoblue-900">{item}</p>
                })}
        </div>
    </div>;
}
