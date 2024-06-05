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
    <div className={`flex flex-col sm:flex-row items-center ${customStyles}`}>
      <p className="text-[11px] mb-1 ml-auto sm:mb-0 sm:ml-0">{name}</p>
      <p className={clsx("text-xs ml-auto sm:ml-2 mr-2",{
        "text-cryptoblue-650": darkmode,
        "text-cryptoblue-660":  !darkmode,
      })}>{formattedValue}</p>
    </div>
  );
};

export const MobileDataElement = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("text-xs text-left pl-3 rounded-lg border h-[68px]",{
      "bg-cryptodark-180 border-cryptodark-170": darkmode,
      "bg-cryptoblue-350": !darkmode,
    })}>
      {children}
    </div>
  );
};