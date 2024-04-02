import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
export const ToolTip = ({text}:{text: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <span className="absolute -top-1 tooltip-info tooltip-right tooltip ml-2 text-[0.5rem] text-cryptodark-400" data-tip={text}>
      <button className={clsx("px-[3px] h-[10px] text-[0.5rem] leading-3 rounded-full",{
        "bg-cryptoblue-100": darkmode,
        "bg-cryptodark-150 text-cryptoblue-100": !darkmode
      })}>?</button>
    </span>
  );
};
export const DateToolTip = ({text}:{text: string}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <span className="absolute top-2 tooltip-info tooltip-right tooltip ml-1 text-[0.5rem] text-cryptodark-400" data-tip={text}>
      <button className={clsx("px-[3px] h-[10px] text-[0.5rem] leading-3 rounded-full",{
        "bg-cryptoblue-100": darkmode,
        "bg-cryptodark-150 text-cryptoblue-100": !darkmode
      })}>?</button>
    </span>
  );
};