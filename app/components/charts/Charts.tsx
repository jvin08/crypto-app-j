import React, {useState} from "react";
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
import {CrosshairPlugin} from "chartjs-plugin-crosshair";
import { Bar, Line } from "react-chartjs-2";
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice";
import { selectCoinOneSymbol, selectCoinTwoSymbol, selectCompare, selectCurrency } from "../../lib/dynamicValuesSlice" ;
import {  fiveYears, oneYear, oneQuater, oneMonth, fourteenDays, sevenDays, oneDay, getPriceFooterData, getVolumeFooterData } from "./utils";
import { options, barOptions, getChartData, barChartData } from "./options";
import { Header, VolumeHeader } from "./Header";  
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
import clsx from "clsx";
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
    CrosshairPlugin,
  );
export function Charts({range}:{range: number}) { 
    const coin = useSelector(selectCoinOneSymbol);
    const coinTwo = useSelector(selectCoinTwoSymbol);
    const compare = useSelector(selectCompare);
    const currency = useSelector(selectCurrency);
    const darkmode = useSelector(selectDarkmode);
    //key - chart duration, value - time"s step(index of array timeIntervals) minutes or days
    const intervalIndex: { [key: string]: number } = {
        "1": 0,
        "7": 1,
        "14": 2,
        "31": 3,
        "93": 4,
        "365": 5,
        "1825": 6,
      };
    const timeIntervals = [oneDay, sevenDays, fourteenDays, oneMonth, oneQuater, oneYear, fiveYears];
    const queryPart = `${coin[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
    const queryPartTwo = `${coinTwo[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
    const { data } = useGetCoinsIntervalDataQuery(queryPart);
    const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo);
    const [ priceIndex, setPriceIndex ] = useState<number>(data?.prices.length - 1);
    const [ volumeIndex, setVolumeIndex ] = useState<number>(data?.total_volumes.length - 1);
    const myData = data?.prices;
    const myDataTwo = dataTwo?.prices;
    const volumeOne = data?.total_volumes.map((volume: number[])=>{
        return volume;
    });
    const volumeTwo = compare ? dataTwo?.total_volumes.map((volume: number[])=>{
        return volume;
    }) : [];
    const timePoints = myData?.map((item:number[],)=>{
        return new Date(item[0]).toISOString().slice(0,20);
    });
    const coinOnePrices = myData?.map((item:number[])=>{
        return item[1];
    }); 
    const coinTwoPrices = compare ? myDataTwo?.map((item:number[])=>{
        return item[1];
    }) : [];
const lineChartData = getChartData(timePoints, coinOnePrices, coinTwoPrices, coin[0], coinTwo[0]);
const barData = barChartData(volumeOne, volumeTwo, coin[0], coinTwo[0]);
const priceOne = getPriceFooterData(coinOnePrices);
const priceTwo = compare ? getPriceFooterData(coinTwoPrices) : "";
const todayVolume = getVolumeFooterData(volumeOne);
const todayVolumeTwo = compare ? getVolumeFooterData(volumeTwo) : "";
const showCoinTwo = compare && coinTwo[0] !== "";
options.onHover = (event: any, price: any) => {
    setPriceIndex(price[0]?.index);
};
barOptions.onHover = (event: any, volume: any) => {
    !isNaN(volume[0]?.index) && setVolumeIndex(volume[0]?.index);
};
  return (<div className="flex w-full justify-between">
                <div className={clsx("w-[calc(50%-1rem)] mb-10  rounded-xl ", {
                    "bg-cryptodark-350": darkmode,
                    "bg-cryptoblue-100": !darkmode,
                })}>
                    <div className={compare ? "p-5 pb-10 relative" : "p-5 pb-12 relative"}>
                        <Header dataOne={coin} price={coinOnePrices?.[priceIndex] || coinOnePrices?.slice(-1)[0]} compare={compare} />
                        <div className={compare ? "h-52" : "h-64"}>
                            <Line options={options} data={lineChartData} height={216} />
                            <div className="flex justify-between my-2">
                                {timeIntervals[intervalIndex[range]].map((item:string, index: number)=>{
                                    return <p key={index+item} className="text-[10px] text-cryptoblue-500">{item}</p>;
                                    })}
                            </div>
                        </div>
                        <div className="flex">
                            <p className={compare ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-800 px-2.5 mr-2 rounded-sm"></span>
                                    {coin[0] + ` ${currency.sign}` + priceOne}
                            </p>
                            <p className={showCoinTwo ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-700 px-2.5 mr-2 ml-6 rounded-sm"></span>
                                    {coinTwo[0] + ` ${currency.sign}` + priceTwo}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={clsx("w-[calc(50%-1rem)] mb-10  rounded-xl ", {
                    "bg-cryptodark-300": darkmode,
                    "bg-cryptoblue-100": !darkmode,
                })}>
                    <div className={compare ? "p-5 pb-10 relative" : "p-5 pb-12 relative"}>
                    <VolumeHeader volume={[volumeOne?.[volumeIndex]] || volumeOne?.slice(-1)} compare={compare}/>
                        <div className={compare ? "h-52" : "h-64"}>
                            <Bar options={barOptions} data={barData} height={216} />
                            <div className="flex justify-between my-2">
                                {timeIntervals[intervalIndex[range]].map((item:string, index: number)=>{
                                    return <p key={index + item} className="text-[10px] text-cryptoblue-500">{item}</p>;
                                    })}
                            </div>
                        </div>
                        <div className="flex">
                            <p className={compare ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-800 px-2.5 mr-2 rounded-sm"></span>
                                    {coin[0] + ` ${currency.sign}` + todayVolume + " bln"}
                            </p>
                            <p className={showCoinTwo ? "mt-8 text-cryptoblue-900" : "hidden"}>
                                <span className="bg-cryptoblue-700 px-2.5 mr-2 ml-6 rounded-sm"></span>
                                    {coinTwo[0] + ` ${currency.sign}` + todayVolumeTwo + " bln"}
                            </p>
                        </div>
                    </div>
                </div>
    </div>);
}
