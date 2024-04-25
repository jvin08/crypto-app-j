import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const Triangle = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className="flex justify-center">
      <svg 
        className="cursor-pointer" 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {}}
      >
        <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
          fill={clsx("",{
            "white": darkmode,
            "#3D3D7E": !darkmode,
          })}
        />
      </svg>
    </div>
  );
};
export default Triangle;