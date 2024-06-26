import React, {useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification, setShowNotification, setError } from "../../lib/dynamicValuesSlice";
import useWindowWidth from "../hooks/hooks";
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
import { ChartsLoader } from "./Loader";
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice";
import { selectCoinOneSymbol, selectCoinTwoSymbol, selectCompare, selectCurrency } from "../../lib/dynamicValuesSlice" ;
import { 
  getPriceFooterData, 
  getVolumeFooterData, 
  capitalize, 
  fiveYearFormat ,
  oneDayFormat,
  formatStandardDate,
  adjustedDataSet,
} from "./utils";
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
  const width = useWindowWidth();
  const coin = useSelector(selectCoinOneSymbol);
  const coinTwo = useSelector(selectCoinTwoSymbol);
  const compare = useSelector(selectCompare);
  const currency = useSelector(selectCurrency);
  const darkmode = useSelector(selectDarkmode);
  //key - chart duration, value - time"s step(index of array timeIntervals) minutes or days
  const queryPart = `${coin[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const secondCoin = coinTwo[0] === "" ? ["ethereum","eth"] : coinTwo;
  const queryPartTwo = `${secondCoin[0]}/market_chart?vs_currency=${currency.label.toLowerCase()}&days=${range}`;
  const { data, error, isLoading } = useGetCoinsIntervalDataQuery(queryPart);
  const { data: dataTwo } = useGetCoinsIntervalDataQuery(queryPartTwo);
  const [ priceIndex, setPriceIndex ] = useState<number>(data?.prices.length - 1);
  const [ volumeIndex, setVolumeIndex ] = useState<number>(data?.prices.length - 1);
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
  }, [error, dispatch, handleNotification]);
  let volumeOne = data?.total_volumes.map((volume: number[])=>{
    return volume;
  });
  let volumeTwo = compare ? dataTwo?.total_volumes.map((volume: number[])=>{
    return volume;
  }) : [];
  if(range === 1825 && volumeOne?.length !== volumeTwo?.length && coinTwo[0] !== "") {
    const { dataOne, dataTwo } = adjustedDataSet(volumeOne, volumeTwo);
    volumeOne = dataOne;
    volumeTwo = dataTwo;
  }
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
  const barTimePoints = volumeOne?.map((item:number[])=>{
    switch (range) {
    case 1:
      return oneDayFormat(new Date(item[0]));
    case 1825:
      return fiveYearFormat(new Date(item[0]));
    default:
      return formatStandardDate(new Date(item[0]));
    }
  });
  const coinOnePrices = myData?.map((item:number[])=>{
    return item[1];
  }); 
  const coinTwoPrices = compare ? myDataTwo?.map((item:number[])=>{
    return item[1];
  }) : [];
  const chartHeight = width < 481 ? 120 : 216;
  const isMobile = width < 481;
  const lineChartData = getChartData(timePoints, coinOnePrices, coinTwoPrices, coin[0], coinTwo[0], isMobile);
  const barData = barChartData(barTimePoints, volumeOne, volumeTwo, isMobile);
  const priceOne = getPriceFooterData(coinOnePrices, priceIndex);
  const priceTwo = compare ? getPriceFooterData(coinTwoPrices, priceIndex) : "";
  const todayVolume = getVolumeFooterData(volumeOne, volumeIndex);
  const todayVolumeTwo = compare ? getVolumeFooterData(volumeTwo, volumeIndex) : "";
  const showCoinTwo = compare && coinTwo[0] !== "";
  options.onHover = (event: any, price: any) => {
    setPriceIndex(price[0]?.index);
  };
  barOptions.onHover = (_: any, volume: any) => {
    setVolumeIndex(prevIndex => volume?.[0]?.index ?? prevIndex);
  };
  barOptions.animations = false;
  ChartJS.defaults.font.size = 9;
  return (<div className="flex w-full sm:flex-col justify-between">
    {error || isLoading 
      ? <ChartsLoader dataOne={coin} dataTwo={coinTwo} compare={compare} /> 
      : <div className={clsx("w-[calc(50%-1rem)] sm:w-full mb-10 sm:mb-2  rounded-xl h-[404px] sm:h-[224px]", {
        "bg-cryptodark-350": darkmode && !error && !isLoading,
        "bg-cryptoblue-100": !darkmode && !error && !isLoading,
      })}>
        <div className={compare ? "sm:p-4 p-10 relative" : "sm:p-4 p-10 sm:pb-4 pb-12 relative"}>
          <Header 
            dataOne={coin} 
            price={coinOnePrices?.[priceIndex] || coinOnePrices?.slice(-1)[0]} 
            compare={compare} 
            priceDate={data?.prices?.[priceIndex]?.[0] || data?.prices?.[data?.prices?.length-1]?.[0]}
          />
          <div className={compare ? "h-[188px] sm:h-[122px] -ml-3 sm:ml-0" : "sm:ml-0 -ml-3 h-[236px] sm:h-[140px]"}>
            <Line options={options} data={lineChartData} height={chartHeight} />
          </div>
          <div className="flex">
            <p className={compare ? "mt-8 sm:mt-1 text-cryptoblue-900" : "hidden"}>
              <span className="tabular-nums text-[0.75rem] text-cryptoblue-800">{capitalize(coin[0]) + ` ${currency.sign}` + priceOne}</span>  
            </p>
            <p className={showCoinTwo ? "mt-8 sm:mt-1 text-cryptoblue-900" : "hidden"}>
              <span className="tabular-nums text-[0.75rem] text-cryptoblue-700 ml-5">{capitalize(coinTwo[0]) + ` ${currency.sign}` + priceTwo}</span> 
            </p>
          </div>
        </div>
      </div>}
    {error || isLoading 
      ? <ChartsLoader dataOne={coin} dataTwo={coinTwo} compare={compare} /> 
      : 
      <div className={clsx("w-[calc(50%-1rem)] sm:w-full mb-10 sm:mb-2  rounded-xl sm:h-[224px]", {
        "bg-cryptodark-300": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
        <div className={compare ? "sm:p-4 p-10 relative" : "sm:p-4 sm:pb-4 p-10 pb-12 relative"}>
          <VolumeHeader 
            volume={data?.total_volumes?.[volumeIndex] || data?.total_volumes?.[data?.total_volumes?.length-1]} 
            compare={compare}
            volumeDate={data?.total_volumes?.[volumeIndex]?.[0] || data?.total_volumes?.[data?.total_volumes?.length-1]?.[0]}
          />
          <div className={compare ? "h-[188px] sm:h-[122px] -ml-3 sm:ml-0" : "sm:ml-0 -ml-3 h-[236px] sm:h-[140px]"}>
            <Bar options={barOptions} data={barData} height={chartHeight} />
          </div>
          <div className="flex">
            <p className={compare ? "mt-8 sm:mt-1 text-cryptoblue-900" : "hidden"}>
              <span className="tabular-nums text-[0.75rem] text-cryptoblue-800">{capitalize(coin[0]) + ` ${currency.sign}` + todayVolume + " bln"}</span>
            </p>
            <p className={showCoinTwo ? "mt-8 sm:mt-1 text-cryptoblue-900" : "hidden"}>
              <span className="tabular-nums text-[0.75rem] text-cryptoblue-700 ml-5">{capitalize(coinTwo[0]) + ` ${currency.sign}` + todayVolumeTwo + " bln"}</span>
            </p>
          </div>
        </div>
      </div>}
  </div>
  );
}