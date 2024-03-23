import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import BitcoinImg from "../../../public/bitcoin.png";
import Search from "../portfolioModal/Search";
import Triangle from "./Triangle";
import Amount from "./Amount";
import DateInput from "./DateInput";
import SpentAmount from "./SpentAmount";
import { timeInterval } from "./utils";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { formattedDate, formattedTime } from "./utils";
const Calculator = ({toggleCalculator}:{toggleCalculator:()=>void}) => {
  const darkmode = useSelector(selectDarkmode);
  const [coinImage, setCoinImage] = useState(BitcoinImg);
  const [selectedCoin, setSelectedCoin] = useState(["", ""]);
  //value averaging
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [interval, setInterval] = useState(0);
  const [showInvestment, setShowInvestment] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [showGrowInput, setShowGrowInput] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endTime, setEndTime] = useState(formattedTime);
  const [endDate, setEndDate] = useState(formattedDate);
  const [growRate, setGrowRate] = useState(0);
  const time = startDate + "T" + startTime;
  const days = timeInterval(time);
  const query = `${selectedCoin[0]}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = selectedCoin[0] !== "" && startDate !== "" && startTime !== "" && endDate !== "" && endTime !== "";
  const [visible, setAllowFetchData] = useState(false);
  //value cost averaging
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.id, coin.symbol]);
  };
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowInput(!showGrowInput);};
  const getStartTime = (time: string) => {
    setStartTime(time);
  };
  const getStartDate = (date: string) => {
    setStartDate(date);
  };
  const getEndTime = (time: string) => {
    setEndTime(time);
  };
  const getEndDate = (date: string) => {
    setEndDate(date);
  };
  const getInterval = (interval: number) => {setInterval(interval);};
  const getGrowRate = (rate: number) => {setGrowRate(rate);};
  const getInvestment = (amount: number) => {setInvestment(amount);};
  const calculateVCA = () => {
    allowFetchData ? setAllowFetchData(true) : setAllowFetchData(false);
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
          <div className="text-xs mb-2 flex justify-between w-[calc(50%-0.5rem)]">
            <div className="divide-y divide-cryptodark-160">
              <h3 className="text-sm mb-2">Value averaging</h3>
              <p>Start date: <span className="text-[0.65rem] ml-1 text-cryptoblue-650"> {startDate + " " + startTime}</span></p>
              <p>End date: <span className="text-[0.65rem] ml-1 text-cryptoblue-650"> {endDate + " " + endTime}</span></p>
              <p>Investment interval, days</p>
              <p>Initial investment, $</p>
              <p>Grow rate per interval, %</p>
              <p>Total amount spent, $</p>
              <p>Potential Gain/Loss, $</p>
            </div>
            <div className="text-center divide-y divide-cryptodark-160 w-[4.5rem]">
              <h3 className="text-sm mb-2">Q-ty</h3>
              <DateInput getTime={getStartTime} getDate={getStartDate} date={startDate} time={startTime} />
              <DateInput getTime={getEndTime} getDate={getEndDate} date={endDate} time={endTime} />
              <Amount visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
              <Amount visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
              <Amount visible={showGrowInput} toggleVisible={toggleGrowRate} getAmount={getGrowRate} />
              {visible ? 
                <SpentAmount 
                  query={query} 
                  growRate={growRate} 
                  interval={interval}
                  initialAmount={investment}
                /> : 
                <p>$</p>}
              <p>$</p>
            </div>
          </div>
          <div className="text-xs mb-2 flex justify-between w-[calc(50%-0.5rem)]">
            <div className="divide-y divide-cryptodark-160">
              <h3 className="text-sm mb-2">Dollar cost averaging</h3>
              <p>Start date</p>
              <p>End date</p>
              <p>Investment interval, days</p>
              <p>Initial investment, $</p>
              <p>Investment per interval, $</p>
              <p>Total amount spent, $</p>
              <p>Potential Gain/Loss, $</p>
            </div>
            <div className="text-center divide-y divide-cryptodark-160 w-[4.5rem]">
              <h3 className="text-sm mb-2">Q-ty</h3>
              <Triangle />
              <Triangle />
              <Triangle />
              <Triangle />
              <Triangle />
              <p>$</p>
              <p>$</p>
            </div>
          </div>
        </div>
        <div className="flex text-sm font-thin">
          <button 
            className="border border-cryptodark-160 rounded cursor-pointer m-auto mb-3 w-32"
            onClick={calculateVCA}
          >calculate (VCA)</button>
          <button className="border border-cryptodark-160 rounded cursor-pointer m-auto mb-3 w-32">calculate (DCA)</button>
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