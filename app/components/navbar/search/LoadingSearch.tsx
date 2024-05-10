import React from "react";
import { useClickOutside } from "../../portfolioModal/hooks";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const LoadingSearch = ({closeLoader}:{closeLoader: any}) => {
  const darkmode = useSelector(selectDarkmode);
  const ref = useClickOutside(()=>{
    closeLoader();
  });
  return (
    <div className={clsx("box-border text-sm w-72 left-0 top-[47px] absolute z-50 rounded-b-md",{
      "bg-cryptoblue-200 text-cryptoblue-500": !darkmode,
      "text-cryptodark-100 border-cryptodark-170 border-[1px]": darkmode,
    })} ref={ref}>
      <div 
        className={clsx("flex items-center h-12 pl-3 py-1 rounded-b-md",{
          "bg-gradient-to-r from-cryptodark-200 to-cryptodark-350": darkmode,
        })}
      >
        <p className="ml-4 mr-2 text-sm text-cryptoblue-500 blinking-text">🌀 Loading...</p>
      </div>
    </div>
  );
};
export default LoadingSearch;
