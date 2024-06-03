import React, { useState } from "react";
import CustomButton from "./CustomButton";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../../lib/dynamicValuesSlice";

const ChartBox = ({Charts}: {Charts: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const [days, setDays ] = useState(1);
  const intervals = [1, 7, 14, 31, 93, 365, 1825];
  const units = ["1D", "7D", "14D", "1M", "1Q", "1Y", "5Y"];
  const toggleActive = (e: any, index: number) => {
    e.preventDefault();
    setDays(intervals[index]);
  };
  return (
    <div >
      <div className="flex pt-10 sm:pt-6">
        <Charts range={days} />
      </div>
      <div className={clsx("p-1 rounded-md flex w-fit sm:w-full mt-4 sm:mt-0",{
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
    </div>
  );
};
export default ChartBox;