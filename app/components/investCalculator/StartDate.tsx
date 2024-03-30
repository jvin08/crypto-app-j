import React, { useState } from "react";
import clsx from "clsx";
import InputDate from "./InputDate";
import InputTime from "./InputTime";
import { useSelector } from "react-redux";
import { useClickOutside } from "../portfolioModal/hooks";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const DateInput = ({getTime, getDate, date, time}:{getTime: any, getDate: any, date: string, time: string}) => {
  const [visible, setVisible] = useState(false);
  const darkmode = useSelector(selectDarkmode);
  const dateRef = useClickOutside(() => {
    setVisible(false);
  });
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getDate(e.target.value);
    setVisible(false);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getTime(e.target.value);
    setVisible(false);
  };
  return (
    <div>
      {!visible ? <div className={clsx("w-full text-xs flex justify-center py-2 px-0",{
        "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
        "bg-cryptodark-400 text-cryptodark-510": darkmode,
      })}
      >
        <svg 
          className="cursor-pointer" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleVisible}
        >
          <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
            fill={clsx("",{
              "white": darkmode,
              "#3D3D7E": !darkmode,
            })}
          />
        </svg>
      </div> :
        <div ref={dateRef} className={clsx("relative w-full h-8 text-xs flex justify-between py-0 px-0",{
          "bg-cryptoblue-200 text-cryptoblue-900": !darkmode,
          "bg-cryptodark-400 text-cryptodark-510": darkmode,
        })}>
          <InputDate date={date} handleDate={handleDate} /> 
          <InputTime time={time} handleTime={handleTime} />
        </div>  
      }
    </div>
  );
};
export default DateInput;