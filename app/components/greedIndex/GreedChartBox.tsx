import React from "react";
import CustomButton from "../charts/CustomButton";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import GreedChart from "./GreedChart";

const GreedChartBox = ({handleIndex, handleRange, days}:{handleIndex:Function, handleRange: Function, days:number}) => {
  const units = ["7D", "14D", "1M", "1Q", "1Y", "5Y"];
  const darkmode = useSelector(selectDarkmode);
  const intervals = [7, 14, 31, 93, 365, 1825];
  const toggleActive = (e: any, index: number) => {
    e.preventDefault();
    handleRange(intervals[index]);
  };
  return (
    <div>
      <div className={clsx("p-1 rounded-md flex w-fit sm:w-full ml-6 mt-4 sm:mt-0",{
        "bg-cryptodark-810": darkmode,
        "bg-cryptoblue-450": !darkmode,
      })}>
        {units.map((unit: string, index)=>{
          return <CustomButton  
            key={unit} 
            name={unit} 
            handleClick={(e)=>toggleActive(e, index)} 
            active={intervals[index] === days} 
            width="w-[58px] sm:w-full" 
            padding="py-1" />;
        })}
      </div>
      <div>
        <GreedChart range={days} handleIndex={handleIndex} />
      </div>
    </div>
  );
};
export default GreedChartBox;