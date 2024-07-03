import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetFearAndGreedDataQuery } from "@/app/lib/marketSlice";
import Gauge from "./Gauge";
import HistoricalData from "./HistoricalData";
import Image from "next/image";

const GreedAndFear = ({toggleGreedIndex}:{toggleGreedIndex: ()=>void }) => {
  const darkmode = useSelector(selectDarkmode);
  const crossColor = darkmode ? "white" : "black";
  const { data } = useGetFearAndGreedDataQuery(31);
  const todayData = data?.data[0]?.value;
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className="absolute sm:w-[90%] sm:left-[5%] left-[calc(50%-443px)] sm:top-5 top-[1rem] p-[1px] group">
        <form className={clsx("m-auto sm:w-full w-full sm:h-[630px] z-50 sm:p-4 p-[48px] rounded-[20px] border-[1px] border-cryptodark-350",{
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
              <div className={clsx("relative m-4 mt-6 rounded-md",{
                "bg-cryptodark-160" : darkmode,
                "bg-cryptoblue-100": !darkmode,
              })}>
                <Image className="absolute left-1/2 -ml-3 top-1/2" src="/bitcoin.svg" width={25} height={25} alt="Greed Index" />
                <Gauge greedIndex={todayData}/>
              </div>
            </div>
            <div className={clsx("sm:w-full w-[461px] text-base flex flex-col justify-between ml-4 rounded",{
              "bg-cryptodark-350" : darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}> 
              
            </div>
          </div>
          <div className="flex sm:flex-col sm:justify-center justify-between">
            <div className={clsx("w-[332px] rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}></div>
            <div className={clsx("w-[461px] ml-4 rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <HistoricalData data={data} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GreedAndFear;