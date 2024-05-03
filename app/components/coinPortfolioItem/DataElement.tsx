"use client";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { formatTime } from "./utils";

export const DataElement = ({name, value, customStyles}:{name: string, value: string, customStyles: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const isNegative = Number(value) < 0;
  return (
    <div className={`flex flex-col items-center ${customStyles}`}>
      {name.includes("Gain") ?
        <p className="text-[11px] mb-1"><span className={clsx("text-cryptoblue-650",{
          "text-cryptoblue-660 font-bold": !darkmode,
        })}>Gain</span> / <span className="text-cryptoblue-750">Loss</span></p> : 
        <p className="text-[11px] mb-1">{name}</p>}
      <p className={clsx("text-xs",{
        "text-cryptoblue-650": darkmode,
        "text-cryptoblue-660": !darkmode,
        "text-cryptoblue-750": isNegative,
      })}>{value}</p>
    </div>
  );
};
export const PurchaseDate = ({name, value, customStyles}:{name: string, value: string, customStyles: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const formattedValue = formatTime(value);
  return (
    <div className={`flex flex-col items-center ${customStyles}`}>
      <p className="text-[11px] mb-1 ml-auto">{name}</p>
      <p className={clsx("text-xs ml-auto mr-2",{
        "text-cryptoblue-650": darkmode,
        "text-cryptoblue-660":  !darkmode,
      })}>{formattedValue}</p>
    </div>
  );
};