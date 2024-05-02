import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import BitcoinImg from "../../../public/bitcoin.png";
import Search from "../portfolioModal/Search";
import ValueCostAverage from "./ValueCostAverage";
import DollarCostAverage from "./DollarCostAverage";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import CustomButton from "../portfolioModal/CustomButton";
import { capitalize } from "../coinPortfolioItem/utils";

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
  const toggleStrategies = () => {
    setShowDCACalculator(!showDCACalculator);
  };
  const VSACursor = showDCACalculator ? "cursor-pointer" : "cursor-not-allowed";
  const DCACursor = !showDCACalculator ? "cursor-pointer" : "cursor-not-allowed";
  const formatSelectedCoinName = selectedCoin[0].length > 20 ? capitalize(`${selectedCoin[0].slice(0, 20)}...`) : capitalize(selectedCoin[0]);
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full overflow-auto">
      <div className="absolute left-[calc(50%-443px)] top-1 p-[1px] rounded-[2.1rem]">
        <div className={clsx("m-auto w-[886px] h-[810px] z-50 pt-10 p-12 rounded-[20px]",{
          "bg-cryptodark-400 text-cryptodark-100": darkmode,
          "bg-cryptodark-100 text-cryptoblue-900": !darkmode,
        })}>
          <div className="flex justify-between mb-8">
            <p className="text-2xl">Investments Calculator</p>
            <svg 
              className="cursor-pointer" 
              onClick={toggleCalculator}
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={closeSvgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.17188 14.8299L14.8319 9.16992" stroke={closeSvgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8319 14.8299L9.17188 9.16992" stroke={closeSvgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex justify-between mb-8">
            <div className={clsx("flex items-center w-[270px] text-base rounded-lg p-2",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <div className={clsx("w-7 h-7 rounded-lg p-1 mr-2",{
                "bg-cryptodark-160": darkmode,
                "bg-cryptodark-100": !darkmode,
              })}>
                <div>
                  <Image src={coinImage} alt="coin" width={20} height={20}/>
                </div>
              </div>
              <p className="text-center text-base font-bold">{selectedCoin[0]?formatSelectedCoinName:"Your Crypto"} ({selectedCoin[0]?selectedCoin[1]:"ABC"})</p>
            </div>
            <div className="w-[488px] text-xs flex flex-col justify-between"> 
              <Search handleCoin={handleCoin} />
            </div>
          </div>
          <div className="flex justify-between text-center mt-3 mb-4">
            <CustomButton name="Value cost averaging" handleClick={toggleStrategies} active={!showDCACalculator} disabled={!showDCACalculator} width="w-1/2" padding={`py-2 ${VSACursor}`} />
            <CustomButton name="Dollar cost averaging" handleClick={toggleStrategies} active={showDCACalculator} disabled={showDCACalculator} width="w-1/2" padding={`py-2 ${DCACursor}`} />
          </div>        
          <div className="flex justify-between mt-0">
            {!showDCACalculator 
              ? <ValueCostAverage coin={selectedCoin[0]} />
              : <DollarCostAverage coin={selectedCoin[0]} />}
          </div>
          <div className={clsx("text-sm",{
            "font-normal": !darkmode,
            "font-thin": darkmode,
          })}>
            {!showDCACalculator ? <p className="mb-3">Value-cost averaging (VCA) -- is an investment strategy focuses on the value of the investment rather than the number of coins purchased. In VCA, investors aim to invest a consistent amount of money at regular intervals, but instead of buying a fixed quantity of assets each time.</p>
              : <p className="mb-3">Dollar-cost averaging (DCA) -- is to reduce the impact of market volatility on the average cost of acquiring the investment. By consistently investing over time, investors may be able to lower their average cost per coin and potentially benefit from long-term market appreciation</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
