import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import BitcoinImg from "../../../public/bitcoin.png";
import Search from "../portfolioModal/Search";
import ValueCostAverage from "./ValueCostAverage";
import DollarCostAverage from "./DollarCostAverage";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const Calculator = ({toggleCalculator}:{toggleCalculator:()=>void}) => {
  const darkmode = useSelector(selectDarkmode);
  const [coinImage, setCoinImage] = useState(BitcoinImg);
  const [selectedCoin, setSelectedCoin] = useState(["", ""]);
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.id, coin.symbol]);
  };
  const closeSvgColor = darkmode ? "white" : "black";
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className={clsx("m-auto w-[35rem] h-2/3 z-50 p-8 rounded-[2rem]",{
        "bg-cryptodark-400 text-cryptodark-100": darkmode,
        "bg-cryptodark-100 text-cryptoblue-900": !darkmode,
      })}>
        <div className="flex justify-between ">
          <p>Investments Calculator</p>
          <svg 
            className="cursor-pointer" 
            onClick={toggleCalculator}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={closeSvgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.17188 14.8299L14.8319 9.16992" stroke={closeSvgColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.8319 14.8299L9.17188 9.16992" stroke={closeSvgColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex justify-between mt-1 pb-3">
          <div className="flex items-center">
            <div>
              <Image src={coinImage} alt="coin" width={30} height={30}/>
            </div>
            <p className="text-center text-xs ml-3">{selectedCoin[0]?selectedCoin[0]:"Your Crypto"} ({selectedCoin[0]?selectedCoin[1]:"ABC"})</p>
          </div>
          <div className="w-[60%] text-xs flex flex-col justify-between"> 
            <Search handleCoin={handleCoin} />
          </div>
        </div>
        <div className="flex justify-between">
          <ValueCostAverage coin={selectedCoin[0]} />
          <DollarCostAverage coin={selectedCoin[0]} />
        </div>
        <div className="text-xs font-thin">
          <p className="mb-3">Value-cost averaging (VCA) -- is to systematically buy more coins when prices are low and fewer coins when prices are high, thereby potentially increasing the overall return of the investment portfolio over time</p>
          <p>Dollar-cost averaging (DCA) -- is to reduce the impact of market volatility on the average cost of acquiring the investment. By consistently investing over time, investors may be able to lower their average cost per coin and potentially benefit from long-term market appreciation</p>
        </div>
      </div>
    </div>
  );
};
export default Calculator;