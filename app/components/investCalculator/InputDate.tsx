import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const InputDate = ({date,handleDate}:{date:string,handleDate:any}) => {
  const darkmode = useSelector(selectDarkmode);
  return <input type="date" value={date} onChange={handleDate} className={clsx("focus:outline-none absolute w-full p-2 rounded-t-lg border",{
    "bg-cryptodark-200": darkmode,
    "bg-cryptoblue-100": !darkmode,
  })}/>;
};
export default InputDate;