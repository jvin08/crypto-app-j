import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const InputTime = ({time,handleTime}:{time:string,handleTime:any}) => {
  const darkmode = useSelector(selectDarkmode);
  return <input type="time" value={time}  onChange={handleTime} className={clsx("focus:outline-none top-6 m-0 absolute w-full p-2 pt-0 rounded-b-lg border-t-0 border",{
    "bg-cryptodark-200": darkmode,
    "bg-cryptoblue-100": !darkmode,
  })} />;
};
export default InputTime;