import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetFearAndGreedDataQuery } from "@/app/lib/marketSlice";
import Gauge from "./Gauge";
import HistoricalData from "./HistoricalData";
import Image from "next/image";
import NextUpdate from "./NextUpdate";
import GreedChartBox from "./GreedChartBox";

const GreedAndFear = ({toggleGreedIndex}:{toggleGreedIndex: ()=>void }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [days, setDays ] = useState(7);
  const darkmode = useSelector(selectDarkmode);
  const crossColor = darkmode ? "white" : "black";
  const { data } = useGetFearAndGreedDataQuery(days);
  const todayData = data?.data[activeIndex]?.value;
  const date = new Date(data?.data[activeIndex]?.timestamp * 1000).toDateString().slice(4);
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full sm:overflow-y-scroll">
      <div className="absolute sm:w-full sm:left-0 left-[calc(50%-443px)] sm:top-0 top-[1rem] p-[1px] group">
        <form className={clsx("m-auto w-full sm:flex sm:flex-col z-50 sm:p-4 p-[48px] rounded-[20px] border-[1px] border-cryptodark-350 sm:h-full",{
          "bg-cryptodark-400 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100 text-cryptoblue-900": !darkmode,
        })}>
          <div className="flex justify-between sm:text-lg text-xl items-center">
            <p>Greed and Fear Index</p>
            <svg 
              className="cursor-pointer" 
              onClick={toggleGreedIndex}
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={crossColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.17188 14.8299L14.8319 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8319 14.8299L9.17188 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex sm:flex-col sm:justify-center justify-between sm:mt-1 mt-8 pb-4">
            <div className={clsx("sm:m-auto sm:w-full sm:pt-0 rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <div className={clsx("relative m-4 rounded-md",{
                "bg-cryptodark-160" : darkmode,
                "bg-cryptoblue-100": !darkmode,
              })}>
                <Image className="absolute left-1/2 -ml-3 top-1/2" src="/bitcoin.svg" width={25} height={25} alt="Greed Index" />
                <Gauge greedIndex={todayData} />
                <p className="absolute left-1/2 -ml-9 bottom-2 text-xs">{date}</p>
              </div>
            </div>
            <div className={clsx("sm:w-full w-[461px] text-base flex flex-col justify-between sm:ml-0 ml-4 rounded",{
              "bg-cryptodark-350" : darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}> 
              <GreedChartBox  handleIndex={setActiveIndex} handleRange={setDays} days={days}/>
            </div>
          </div>
          <div className="flex sm:flex-col sm:justify-center justify-between">
            <div className={clsx("sm:w-full w-[332px] rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <NextUpdate />
            </div>
            <div className={clsx("sm:w-full w-[461px] sm:ml-0 ml-4 rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <HistoricalData />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GreedAndFear;