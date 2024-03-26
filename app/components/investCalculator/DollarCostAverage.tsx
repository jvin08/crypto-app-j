import React, { useState } from "react";
import { timeInterval } from "./utils";
import Amount from "./Amount";
import DateInput from "./DateInput";
import SpentAmountDCA from "./SpentAmountDCA";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const DollarCostAverage = ({coin}:{coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [interval, setInterval] = useState(0);
  const [showInvestment, setShowInvestment] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [showGrowAmountInput, setShowGrowAmountInput] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [growAmount, setGrowAmount] = useState(0);
  const time = startDate + "T" + startTime;
  const days = timeInterval(time);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = coin !== "" && startDate !== "" && startTime !== "" && growAmount !== 0 && investment !== 0 && interval !== 0;
  const [visible, setAllowFetchData] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowAmountInput(!showGrowAmountInput);};
  const getStartTime = (time: string) => {
    setStartTime(time);
  };
  const getStartDate = (date: string) => {
    setStartDate(date);
  };
  const getInterval = (interval: number) => {setInterval(interval);};
  const getGrowAmount = (amount: number) => {setGrowAmount(amount);};
  const getInvestment = (amount: number) => {setInvestment(amount);};
  const calculateDCA = () => {
    allowFetchData ? setAllowFetchData(true) : setAllowFetchData(false);
  };
  return (
    <div className="w-[calc(50%-0.5rem)]">
      <div className="text-xs mb-2 flex justify-between">
        <div className="divide-y divide-cryptodark-160">
          <h3 className="text-sm mb-2">Dollar cost averaging</h3>
          <p>Start date: <span className="text-[0.65rem] ml-1 text-cryptoblue-650"> {startDate + " " + startTime}</span></p>
          <p>Investment interval, days</p>
          <p>Initial investment, $</p>
          <p>Investment per interval, $</p>
          <p>Total amount spent, $</p>
          <p>Coins value, $</p>
        </div>
        <div className="text-center divide-y divide-cryptodark-160 w-[4.5rem]">
          <h3 className="text-sm mb-2">Q-ty</h3>
          <DateInput getTime={getStartTime} getDate={getStartDate} date={startDate} time={startTime} />
          <Amount visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
          <Amount visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
          <Amount visible={showGrowAmountInput} toggleVisible={toggleGrowRate} getAmount={getGrowAmount} />
          {visible ? 
            <SpentAmountDCA
              query={query} 
              growAmount={growAmount} 
              interval={interval}
              initialAmount={investment}
              days={days}
              startTime={time}
            /> : 
            <>
              <p>$</p>
              <p>$</p>
            </> 
          }
        </div>
      </div> 
      <div className="flex">
        <button 
          className={clsx("text-center text-sm font-thin py-1 box-border border border-cryptodark-160 hover:border-cryptoblue-800 focus:bg-cryptodark-350 rounded-2xl cursor-pointer m-auto mb-3 w-32",{
            "focus:bg-cryptoblue-100": !darkmode,  
          })}
          onClick={calculateDCA}
        >calculate (DCA)</button>
      </div>
    </div>
  );
};
export default DollarCostAverage;