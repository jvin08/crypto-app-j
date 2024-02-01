import React from "react";
import { useSelector } from "react-redux";
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
} from "chart.js/auto";
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
import { selectCoinOneSymbol, selectCoinTwoSymbol } from '../../lib/dynamicValuesSlice' 
import { getChartData, options, fiveYears, oneYear, oneMonth, fourteenDays, sevenDays, oneDay } from "./utils";
  

export function LineChart({range}:{range: number}) { 
    const coin = useSelector(selectCoinOneSymbol)
    const coinTwo = useSelector(selectCoinTwoSymbol)
    //key - chart duration, value - time's step(index of array timeIntervals) minutes or days
    const intervalIndex: { [key: string]: number } = {
        '1': 0,
        '7': 1,
        '14': 2,
        '31': 3,
        '365': 4,
        '1825': 5,
      };
    
    const timeIntervals = [oneDay, sevenDays, fourteenDays, oneMonth, oneYear, fiveYears]

    const queryPart = `${coin[0]}/market_chart?vs_currency=usd&days=${range}`
    const queryPartTwo = `${coinTwo[0]}/market_chart?vs_currency=usd&days=${range}`

    const { data, error, isLoading } = useGetCoinsIntervalDataQuery(queryPart)  
    const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo)  
    const myData = data?.prices
    const myDataTwo = dataTwo?.prices
    
    const timePoints = myData?.map((item:number[],)=>{
        return new Date(item[0]).toISOString().slice(0,10)
    });
    const coinOnePrices = myData?.map((item:number[])=>{
        return item[1]
    }); 
    const coinTwoPrices = myDataTwo?.map((item:number[])=>{
        return item[1]
    })
    

const chartData = getChartData(timePoints, coinOnePrices, coinTwoPrices)
   
  return <div className="w-1/2 mb-10 mt-10">
        <div className="h-80 p-5 pb-16 rounded-xl bg-cryptoblue-100">
            <p>{coin[0].toUpperCase() + ' '}({coin[1].toUpperCase()})</p>
            <Line className="h-64" options={options} data={chartData} />
            <div className="flex justify-between my-2">
                {timeIntervals[intervalIndex[range]].map((item:string)=>{
                    return <p key={uid()} className="text-[10px] text-cryptoblue-500">{item}</p>
                    })}
            </div>
            
        </div>
    </div>;
}
