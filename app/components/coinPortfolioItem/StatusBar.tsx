import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const StatusBar = ({name, width}:{name: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const statusWidth = Number(width) * 100 < 20 ? "0.5rem" : Number(width) * 100 >= 100 ? "4.7rem" : Number(width) * 100 + "%";
  return (
    <div className="w-1/4">
      <p className="text-[11px] mb-1 text-center">{name}</p>
      <div className="flex items-center px-auto">
        <p className={clsx("text-xs text-right w-1/3",{
          "text-cryptoblue-100": darkmode,
          "text-cryptodark-200": !darkmode,
        })}>{(Number(width) * 100).toFixed(2)}%</p>
        <div className="relative w-2/3">
          <div className="absolute -bottom-1 start-[15%] w-[5rem] h-1.5 z-2 rounded-sm px-px bg-cryptoblue-650 opacity-40"></div>
          <div className={clsx("absolute -bottom-1 start-[15%] h-1.5 rounded-l-sm z-2 px-px",{
            "bg-cryptoblue-200": darkmode,
            "bg-cryptoblue-660": !darkmode,
          })} style={{width: statusWidth}}></div>
        </div>
      </div>
    </div>
  );
};
export default StatusBar;
