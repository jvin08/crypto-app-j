import React from "react";
import { HeaderBackUp } from "./Header";
import { capitalize } from "./utils";

export const Loader = () => <div className="loader"/>;
export const SmallLoader = () => <div className="loader small"/>;
export const ChartsLoader = ({dataOne, dataTwo, compare} : {dataOne: string, dataTwo: string, compare: boolean}) => {
  const showCoinTwo = compare && dataTwo[0] !== "";
  return (
    <div className="sm:w-full w-[calc(50%-1rem)] sm:mb-2 mb-10  rounded-xl sm:h-[224px] h-[404px]">
      <div className="sm:h-[224px] loaderChart">
        <HeaderBackUp dataOne={dataOne} compare={compare} />
        <div className="flex">
          <p className={compare ? "mt-64 text-cryptoblue-900" : "hidden"}>
            <span className="tabular-nums text-[0.75rem] text-cryptoblue-800">{capitalize(dataOne[0]) + " - N/A"}</span>  
          </p>
          <p className={showCoinTwo ? "mt-64 text-cryptoblue-900" : "hidden"}>
            <span className="tabular-nums text-[0.75rem] text-cryptoblue-700 ml-5">{capitalize(dataTwo[0]) + " - N/A"}</span> 
          </p>
        </div>
      </div>
    </div>
  );
};