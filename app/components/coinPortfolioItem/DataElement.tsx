"use client";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { formatTime } from "./utils";

export const DataElement = ({name, value, width}:{name: string, value: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const colorRed = Number(value) < 0 && true;
  return (
    <div className={`flex flex-col items-center ${width}`}>
      {name.includes("Gain") ?
        <p className="text-[11px] mb-1"><span className={clsx("text-cryptoblue-650",{
          "text-cryptoblue-660 font-bold": !darkmode,
        })}>Gain</span> / <span className="text-cryptoblue-750">Loss</span></p> : 
        <p className="text-[11px] mb-1">{name}</p>}
      <p className={clsx("text-xs",{
        "text-cryptoblue-650": darkmode,
        "text-cryptoblue-660": !darkmode,
        "text-cryptoblue-750": colorRed,
      })}>{value}</p>
    </div>
  );
};
export const PurchaseDate = ({name, value, width}:{name: string, value: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const formattedValue = formatTime(value);
  return (
    <div className={`flex flex-col items-center ${width}`}>
      <p className="text-[11px] mb-1 ml-auto">{name}</p>
      <p className={clsx("text-xs ml-auto mr-2",{
        "text-cryptoblue-650": darkmode,
        "text-cryptoblue-660":  !darkmode,
      })}>{formattedValue}</p>
    </div>
  );
};