import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const CoinSelect = ({toggleCoinSelect}: {toggleCoinSelect: ()=>void}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className="absolute top-0 left-0 flex bg-cryptodark-900 bg-opacity-75 w-full h-full">
      <div className={clsx("m-auto w-1/2 h-2/5 z-50 p-8 rounded-lg",{
        "bg-cryptodark-400": darkmode,
      })}>
        <div className="flex justify-between ">
          <p>Select coins</p>
          <svg 
            className="cursor-pointer" 
            onClick={toggleCoinSelect}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.17188 14.8299L14.8319 9.16992" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.8319 14.8299L9.17188 9.16992" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default CoinSelect;