import React, { useState } from "react";
import { timeInterval } from "./utils";
import Amount from "./Amount";
import DateInput from "./DateInput";
import SpentAmount from "./SpentAmount";
const ValueCostAverage = ({coin}:{coin: string}) => {
  //value cost averaging
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [interval, setInterval] = useState(0);
  const [showInvestment, setShowInvestment] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [showGrowInput, setShowGrowInput] = useState(false);
  const [startTime, setStartTime] = useState("15:50");
  const [startDate, setStartDate] = useState("25-02-2024");
  const [growRate, setGrowRate] = useState(0);
  const time = startDate + "T" + startTime;
  const days = timeInterval(time);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = coin !== "" && startDate !== "" && startTime !== "" && growRate !== 0 && investment !== 0 && interval !== 0;
  const [visible, setAllowFetchData] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowInput(!showGrowInput);};
  const getStartTime = (time: string) => {
    setStartTime(time);
  };
  const getStartDate = (date: string) => {
    setStartDate(date);
  };
  const getInterval = (interval: number) => {
    setInterval(interval);
    visible && setAllowFetchData(false);
  };
  const getGrowRate = (rate: number) => {
    setGrowRate(rate);
    visible && setAllowFetchData(false);
  };
  const getInvestment = (amount: number) => {
    setInvestment(amount);
  };
  const calculateVCA = () => {
    allowFetchData ? setAllowFetchData(true) : setAllowFetchData(false);
  };
  return (
    <div className=" w-[calc(50%-0.5rem)]">
      <div className="text-xs mb-2 flex justify-between">
        <div className="divide-y divide-cryptodark-160">
          <h3 className="text-sm mb-2">Value averaging</h3>
          <p>Start date: <span className="text-[0.65rem] ml-1 text-cryptoblue-650"> {startDate + " " + startTime}</span></p>
          <p>Investment interval, days</p>
          <p>Initial investment, $</p>
          <p>Grow rate per interval, %</p>
          <p>Total amount spent, $</p>
          <p>Coins value, $</p>
        </div>
        <div className="text-center divide-y divide-cryptodark-160 w-[4.5rem]">
          <h3 className="text-sm mb-2">Q-ty</h3>
          <DateInput getTime={getStartTime} getDate={getStartDate} date={startDate} time={startTime} />
          <Amount visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
          <Amount visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
          <Amount visible={showGrowInput} toggleVisible={toggleGrowRate} getAmount={getGrowRate} />
          {visible ? 
            <SpentAmount 
              query={query} 
              growRate={growRate} 
              interval={interval}
              initialAmount={investment}
              days={days}
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
          className="text-center text-sm font-thin border border-cryptodark-160 rounded cursor-pointer m-auto mb-3 w-32"
          onClick={calculateVCA}
        >calculate (VCA)</button>
      </div>
    </div>
  );
};
export default ValueCostAverage;