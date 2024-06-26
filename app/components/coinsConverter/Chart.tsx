import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowWidth from "../hooks/hooks";
import { ChartsLoader } from "./Loader";
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
import { setError, setNotification, setShowNotification, selectCoinOneSymbol, selectCoinTwoSymbol, selectCurrency, selectDarkmode, selectCompare } from "../../lib/dynamicValuesSlice" ;
import { 
  fiveYearFormat ,
  oneDayFormat,
  formatStandardDate,
} from "../charts/utils";
import { options, getChartData } from "./options"; 
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
  const width = useWindowWidth();
  const coinTwo = useSelector(selectCoinTwoSymbol);
  const defaultCoinTwo = coinTwo[0] === "" ? ["ethereum","eth"] : coinTwo;
  const currency = useSelector(selectCurrency);
  const darkmode = useSelector(selectDarkmode);
  const compare = useSelector(selectCompare);
  const queryPart = `${coin[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const queryPartTwo = `${defaultCoinTwo[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const { data, error, isLoading } = useGetCoinsIntervalDataQuery(queryPart);
  const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo);
  const [ priceIndex, setPriceIndex ] = useState<number>(data?.prices.length - 1);
  const myData = data?.prices;
  const myDataTwo = dataTwo?.prices;
  const dispatch = useDispatch();
  const handleNotification = useCallback((message: string) => {
    dispatch(setError(true));
    dispatch(setNotification(message));
    dispatch(setShowNotification(""));
  },[dispatch]);
  useEffect(() => {
    if(error){
      handleNotification("Error fetching data");
      const timer = setTimeout(() => {
        dispatch(setError(false));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [handleNotification, error, dispatch]);
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
  const isMobile = width < 481;
  options.scales.x.ticks.maxTicksLimit = isMobile ? 5 : 13;
  return (<div className="flex w-full justify-between">
    {error || isLoading 
      ? <div className={clsx("w-full mb-10 flex rounded-xl", {
        "bg-cryptodark-350": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
        <ChartsLoader dataOne={coin} dataTwo={coinTwo} compare={compare}  />
      </div>
      : <div className={clsx("w-full mb-10 h-[303px] sm:h-[223px]  rounded-xl ", {
        "bg-cryptodark-350": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
        <h2 className={clsx("ml-10 mt-8 sm:ml-5 sm:mt-4 sm:text-xs",{
          "text-cryptodark-100": darkmode,
          "text-cryptoblue-900": !darkmode,
        })}>{capitalize(coin[0])} ({coin[1].toUpperCase()}) <span 
            className={clsx("",{
              "text-cryptodark-550 opacity-80": darkmode,
              "text-cryptoblue-900 opacity-70": !darkmode,
            })}>to</span> {capitalize(defaultCoinTwo[0])} ({defaultCoinTwo[1].toUpperCase()}) - {coinToCoinPrices?.[priceIndex || coinToCoinPrices.length-1]?.toFixed(2)}</h2>
        <div className="h-64 sm:h-44 p-10 sm:p-4 sm:pb-0 pt-3 pl-7 pb-8 relative">
          <Line options={options} data={lineChartData} height={isMobile ? 136 : 216} />
          <div className={clsx("absolute border-b-4 w-[1210px] sm:hidden left-[calc(50%-605px)] bottom-[55px]",{
            "border-b-cryptodark-100 ": !darkmode,
            "border-b-cryptodark-350": darkmode,
          })}></div>
        </div>
      </div>
    }
  </div>);
};
export default Chart;