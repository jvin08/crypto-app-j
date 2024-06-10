import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const StatusBar = ({name, width}:{name: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const statusWidth = Number(width) * 100 < 20 ? "0.5rem" : Number(width) * 100 >= 100 ? "4.7rem" : Number(width) * 100 + "%";
  return (
    <div className="sm:w-full sm:mt-4 w-1/3">
      <p className="text-[11px] mb-1 text-center sm:text-left">{name}</p>
      <div className="flex items-center">
        <p className={clsx("text-xs w-[30%] sm:text-left text-right mr-1",{
          "text-cryptoblue-100": darkmode,
          "text-cryptodark-200": !darkmode,
        })}>{(Number(width) * 100).toFixed(2)}%</p>
        <div className="relative w-[55%]">
          <div className="absolute -bottom-1 start-[5%] w-[53px] h-1.5 z-2 rounded-sm px-px bg-cryptoblue-650 opacity-40"></div>
          <div className={clsx("absolute -bottom-1 start-[5%] h-1.5 rounded-l-sm z-2 px-px",{
            "bg-cryptoblue-200": darkmode,
            "bg-cryptoblue-660": !darkmode,
          })} style={{width: statusWidth}}></div>
        </div>
      </div>
    </div>
  );
};
export const MobileStatusBar = ({name, width}:{name: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const percentageWidth = Number(width) * 100;
  const statusWidth = percentageWidth < 20 ? "0.5rem" : percentageWidth >= 100 ? "4.7rem" : `${percentageWidth}%`;
  return (
    <div className="w-full pt-3">
      <div className="flex items-center">
        <p className={clsx("text-xs w-[25%] text-left mr-1",{
          "text-cryptoblue-100": darkmode,
          "text-cryptodark-200": !darkmode,
        })}>{(Number(width) * 100).toFixed(2)}%</p>
        <div className="relative w-[75%]">
          <div className="absolute -bottom-1 start-[5%] w-[53px] h-1.5 z-2 rounded-sm px-px bg-cryptoblue-650 opacity-40"></div>
          <div className={clsx("absolute -bottom-1 start-[5%] h-1.5 rounded-l-sm z-2 px-px",{
            "bg-cryptoblue-200": darkmode,
            "bg-cryptoblue-660": !darkmode,
          })} style={{width: statusWidth}}></div>
        </div>
      </div>
      <p className="text-[11px] mb-1 mt-2 text-left">{name}</p>
    </div>
  );
};
export default StatusBar;

