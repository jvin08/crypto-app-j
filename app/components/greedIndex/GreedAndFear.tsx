import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useGetFearAndGreedDataQuery } from "@/app/lib/marketSlice";
import Gauge from "./Gauge";

const GreedAndFear = ({toggleGreedIndex}:{toggleGreedIndex: ()=>void }) => {
  const darkmode = useSelector(selectDarkmode);
  const crossColor = darkmode ? "white" : "black";
  const { data } = useGetFearAndGreedDataQuery("");
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className="absolute sm:w-[90%] sm:left-[5%] left-[calc(50%-443px)] sm:top-5 top-[12rem] p-[1px] group">
        <form className={clsx("m-auto sm:w-full w-[886px] sm:h-[630px] h-[393px] z-50 sm:p-4 p-[48px] rounded-[20px]",{
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
          <div className="flex sm:flex-col sm:justify-center justify-between h-5/6 sm:mt-1 mt-8 pb-3">
            <div className={clsx("sm:m-auto sm:w-full sm:pt-0 rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <div className={clsx("m-4 mt-6 rounded-md",{
                "bg-cryptodark-160" : darkmode,
                "bg-cryptoblue-100": !darkmode,
              })}>
                <Gauge greedIndex={data?.data[0]?.value}/>
              </div>
            </div>
            <div className="sm:w-full w-[461px] text-base flex flex-col justify-between"> 

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GreedAndFear;