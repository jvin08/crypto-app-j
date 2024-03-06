import React, {useState} from "react";
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
import {CrosshairPlugin} from "chartjs-plugin-crosshair";
import { Line } from "react-chartjs-2";
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice";
import { selectCoinOneSymbol, selectCoinTwoSymbol, selectCurrency } from "../../lib/dynamicValuesSlice" ;
import { 
  fiveYearFormat ,
  oneDayFormat,
  formatStandardDate,
} from "../charts/utils";
import { options, getChartData } from "./options"; 
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
import clsx from "clsx";
import { capitalize } from "../charts/utils";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CrosshairPlugin,
);
const Chart = ({range}:{range: number}) => { 
  const coin = useSelector(selectCoinOneSymbol);
  const coinTwo = useSelector(selectCoinTwoSymbol);
  const defaultCoinTwo = coinTwo[0] === "" ? ["ethereum","eth"] : coinTwo;
  const currency = useSelector(selectCurrency);
  const darkmode = useSelector(selectDarkmode);
  const queryPart = `${coin[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const queryPartTwo = `${defaultCoinTwo[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const { data } = useGetCoinsIntervalDataQuery(queryPart);
  const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo);
  const [ priceIndex, setPriceIndex ] = useState<number>(data?.prices.length - 1);
  const myData = data?.prices;
  const myDataTwo = dataTwo?.prices;
  //key - timelabels adjustments base on interval
  const timePoints = myData?.map((item:number[])=>{
    switch (range) {
    case 1:
      return oneDayFormat(new Date(item[0]));
    case 1825:
      return fiveYearFormat(new Date(item[0]));
    default:
      return formatStandardDate(new Date(item[0]));
    }
  });
  const coinTwoPrices = myDataTwo?.map((item:number[])=>{
    return item[1];
  });
  const coinToCoinPrices = myData?.map((item:number[], index:number)=>{
    return item[1] / myDataTwo?.[index]?.[1];
  });
  const lineChartData = getChartData(timePoints, coinToCoinPrices, coinTwoPrices, coin[0], "");
  ChartJS.defaults.font.size = 9;
  options.onHover = (event: any, price: any) => {
    price[0]?.index && setPriceIndex(price[0]?.index);
  };
  return (<div className="flex w-full justify-between">
    <div className={clsx("w-full mb-10  rounded-xl ", {
      "bg-cryptodark-350": darkmode,
      "bg-cryptoblue-100": !darkmode,
    })}>
      <h2 className="ml-8 mt-5 text-cryptodark-100">{capitalize(coin[0])} ({coin[1].toUpperCase()}) <span className="text-cryptodark-550">to</span> {capitalize(defaultCoinTwo[0])} ({defaultCoinTwo[1].toUpperCase()}) - {coinToCoinPrices?.[priceIndex]?.toFixed(5)}</h2>
      <div className="h-64 p-5">
        <Line options={options} data={lineChartData} height={216} />
      </div>
    </div>
  </div>);
};
export default Chart;