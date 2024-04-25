import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import BitcoinImg from "../../../public/bitcoin.png";
import Search from "../portfolioModal/Search";
import ValueCostAverage from "./ValueCostAverage";
import DollarCostAverage from "./DollarCostAverage";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { BackgroundGradient } from "../coinPortfolioItem/BackgroundGradient";

const Calculator = ({toggleCalculator}:{toggleCalculator:()=>void}) => {
  const darkmode = useSelector(selectDarkmode);
  const [coinImage, setCoinImage] = useState(BitcoinImg);
  const [selectedCoin, setSelectedCoin] = useState(["", ""]);
  const [showDCACalculator, setShowDCACalculator] = useState(false);
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.id, coin.symbol]);
  };
  const closeSvgColor = darkmode ? "white" : "black";
  const dcaStyle = showDCACalculator ? "bg-cryptodark-400 cursor-default" : "cursor-pointer rounded-lg  bg-cryptodark-200 text-cryptodark-510 opacity-40";
  const dcaLight = showDCACalculator ? "bg-cryptodark-100 cursor-default" : "cursor-pointer rounded-lg  bg-cryptodark-100 text-cryptodark-520 opacity-40";
  const vcaStyle = showDCACalculator ? "cursor-pointer rounded-lg  bg-cryptodark-200 text-cryptodark-510 opacity-40" : "bg-cryptodark-400 cursor-default";
  const vcaLight = showDCACalculator ? "cursor-pointer rounded-lg  bg-cryptodark-100 text-cryptodark-520 opacity-40" : "bg-cryptodark-100 cursor-default";
  const toggleStrategies = () => {
    setShowDCACalculator(!showDCACalculator);
  };
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <BackgroundGradient animate={true} outerStyle="absolute left-[calc(50%-17.5rem)] top-[6rem] p-[1px] group" rounded="rounded-[2.1rem]">
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
          <div className="flex justify-between text-center mt-3">
            <button 
              className={`${darkmode ? vcaStyle : vcaLight} text-sm w-1/2 py-2`}
              onClick={toggleStrategies}
              disabled={!showDCACalculator}
            >Value cost averaging</button>
            <button 
              className={`${darkmode ? dcaStyle : dcaLight} text-sm w-1/2 py-2`}
              onClick={toggleStrategies}
              disabled={showDCACalculator}
            >Dollar cost averaging</button>
          </div>        
          <div className="flex justify-between mt-0">
            {!showDCACalculator 
              ? <ValueCostAverage coin={selectedCoin[0]} />
              : <DollarCostAverage coin={selectedCoin[0]} />}
          </div>
          <div className={clsx("text-xs",{
            "font-normal": !darkmode,
            "font-thin": darkmode,
          })}>
            {!showDCACalculator ? <p className="mb-3">Value-cost averaging (VCA) -- is an investment strategy focuses on the value of the investment rather than the number of coins purchased. In VCA, investors aim to invest a consistent amount of money at regular intervals, but instead of buying a fixed quantity of assets each time.</p>
              : <p className="mb-3">Dollar-cost averaging (DCA) -- is to reduce the impact of market volatility on the average cost of acquiring the investment. By consistently investing over time, investors may be able to lower their average cost per coin and potentially benefit from long-term market appreciation</p>}
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};
export default Calculator;