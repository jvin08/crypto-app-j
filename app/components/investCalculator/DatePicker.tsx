import React, { useRef } from "react";
import clsx from "clsx";
import { ToolTipMui } from "./ToolTip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import CalendarIcon from "./CalendarIcon";

const DatePicker = ({name, value, info, dateHandler}:{name: string, value: string, info: string, dateHandler: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const dateRef = useRef(null);
  const iconDateHandler = () => {
    if(dateRef.current){
      (dateRef.current as any).showPicker();
      (dateRef.current as any).focus();
    }
  };
  return (
    <div className={clsx("flex items-center sm:w-full w-[245px] h-9 pl-3 pr-1 mr-4 rounded-lg cursor-pointer sm:mt-2 sm:mr-0",{
      "bg-cryptodark-350": darkmode,
      "bg-cryptoblue-350": !darkmode
    })}>
      <button name={name} onClick={iconDateHandler} className={clsx("w-5 h-5 mr-3 rounded outline-none",{
        "bg-cryptodark-160": darkmode,
        "bg-cryptoblue-250 ": !darkmode
      })}>
        <CalendarIcon />
      </button>
      <div className="iconremover">
        <input 
          type="datetime-local" 
          name={name}
          value={value}
          className={clsx("outline-none w-[175px] text-sm font-semibold",{
            "bg-cryptodark-350 text-cryptoblue-650": darkmode,
            "bg-cryptoblue-350 text-cryptoblue-660": !darkmode
          })} 
          onChange={dateHandler}
          ref={dateRef}
        />
      </div>
      <div className="relative pr-2 sm:mr-8 sm:ml-auto"><ToolTipMui text={info} /></div>
    </div>
  );
};
export default DatePicker;