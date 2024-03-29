"use client";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const DataElement = ({name, value, width}:{name: string, value: string, width: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={`flex flex-col items-center ${width}`}>
      {name.includes("Gain") ?
        <p className="text-[11px] mb-1"><span className={clsx("text-cryptoblue-650",{
          "text-cryptoblue-660 font-bold": !darkmode,
        })}>Gain</span> / <span className="text-cryptoblue-750">Loss</span></p> : 
        <p className="text-[11px] mb-1">{name}</p>}
      <p className={clsx("text-xs",{
        "text-cryptoblue-650": Number(value) > 0 && darkmode,
        "text-cryptoblue-660": Number(value) > 0 && !darkmode,
        "text-cryptoblue-750": Number(value) < 0,
      })}>{value}</p>
    </div>
  );
};
export default DataElement;