import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { uid } from "uid";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice"
import { selectCoinOneSymbol, selectCoinTwoSymbol, selectCompare } from '../../lib/dynamicValuesSlice' 
import {  fiveYears, oneYear, oneQuater, oneMonth, fourteenDays, sevenDays, oneDay } from "./utils";
import { options, barOptions, getChartData, barChartData } from './options'
import { Header, VolumeHeader } from "./Header";  

export function Charts({range}:{range: number}) { 
    const coin = useSelector(selectCoinOneSymbol)
    const coinTwo = useSelector(selectCoinTwoSymbol)
    const compare = useSelector(selectCompare)

    //key - chart duration, value - time's step(index of array timeIntervals) minutes or days
    const intervalIndex: { [key: string]: number } = {
        '1': 0,
        '7': 1,
        '14': 2,
        '31': 3,
        '93': 4,
        '365': 5,
        '1825': 6,
      };
    
    const timeIntervals = [oneDay, sevenDays, fourteenDays, oneMonth, oneQuater, oneYear, fiveYears]


    const queryPart = `${coin[0]}/market_chart?vs_currency=usd&days=${range}`
    const queryPartTwo = `${coinTwo[0]}/market_chart?vs_currency=usd&days=${range}`

    const { data, error, isLoading } = useGetCoinsIntervalDataQuery(queryPart)  
    const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo)  
    const myData = data?.prices
    const myDataTwo = dataTwo?.prices
    const volumeOne = data?.total_volumes.map((volume: number[])=>{
        return volume
    })
    const volumeTwo = compare ? dataTwo?.total_volumes.map((volume: number[])=>{
        return volume
    }) : []

    
    const timePoints = myData?.map((item:number[],)=>{
        return new Date(item[0]).toISOString().slice(0,20)
    });
    const coinOnePrices = myData?.map((item:number[])=>{
        return item[1]
    }); 
    const coinTwoPrices = compare ? myDataTwo?.map((item:number[])=>{
        return item[1]
    }) : []
    
const lineChartData = getChartData(timePoints, coinOnePrices, coinTwoPrices, coin[0], coinTwo[0])
const barData = barChartData(volumeOne, volumeTwo, coin[0], coinTwo[0])

const priceOne = Number(coinOnePrices?.slice(-1)).toFixed(3)
const priceTwo = compare ? Number(coinTwoPrices?.slice(-1)).toFixed(3) : ''
const todayVolume = (Number(volumeOne?.slice(-1)[0][1]) / Math.pow(10,9)).toFixed(3)
const todayVolumeTwo = compare ? (Number(volumeTwo?.slice(-1)[0][1]) / Math.pow(10,9)).toFixed(3) : ''
const showCoinTwo = compare && coinTwo[0] !== ''
  return (<div className="flex w-full justify-between">
                <div className="w-[calc(50%-1rem)] mb-10  rounded-xl bg-cryptoblue-100">
                    <div className={compare ? "p-5 pb-10" : "p-5 pb-12"}>
                        <Header dataOne={coin} price={coinOnePrices?.slice(-1)} compare={compare} />

                        <div className={compare ? "h-52" : "h-64"}>
                            <Line options={options} data={lineChartData} height={216} />
                            <div className="flex justify-between my-2">
                                {timeIntervals[intervalIndex[range]].map((item:string)=>{
                                    return <p key={uid()} className="text-[10px] text-cryptoblue-500">{item}</p>
                                    })}
                            </div>
                        </div>
                        <div className="flex">
                            <p className={compare ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-800 px-2.5 mr-2 rounded-sm"></span>
                                    {coin[0] + ' $' + priceOne}
                            </p>
                            <p className={showCoinTwo ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-700 px-2.5 mr-2 ml-6 rounded-sm"></span>
                                    {coinTwo[0] + ' $' + priceTwo}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[calc(50%-1rem)] mb-10 rounded-xl bg-cryptoblue-100">
                    <div className={compare ? "p-5 pb-10" : "p-5 pb-12"}>
                    <VolumeHeader volume={volumeOne?.slice(-1)} compare={compare}/>

                        <div className={compare ? "h-52" : "h-64"}>
                            <Bar options={barOptions} data={barData} height={216} />
                            <div className="flex justify-between my-2">
                                {timeIntervals[intervalIndex[range]].map((item:string)=>{
                                    return <p key={uid()} className="text-[10px] text-cryptoblue-500">{item}</p>
                                    })}
                            </div>
                        </div>
                        <div className="flex">
                            <p className={compare ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-800 px-2.5 mr-2 rounded-sm"></span>
                                    {coin[0] + ' $' + todayVolume + ' bln'}
                            </p>
                            <p className={showCoinTwo ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-700 px-2.5 mr-2 ml-6 rounded-sm"></span>
                                    {coinTwo[0] + ' $' + todayVolumeTwo + ' bln'}
                            </p>
                        </div>
                    </div>
                </div>
    </div>)
}
