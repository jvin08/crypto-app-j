import React, { useState, useEffect } from "react";
import { timeInterval } from "./utils";
import Amount from "./Amount";
import DateInput from "./DateInput";
import SpentAmount from "./SpentAmount";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
const ValueCostAverage = ({coin}:{coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  //value cost averaging
  const [state, setState] = useState({
    startDate: "", 
    startTime: "",
    interval: 0,
    investment: 0,
    growRate: 0
  });
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);
  const [showGrowInput, setShowGrowInput] = useState(false);
  const updateState = (key: string, value: string) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  const time = state.startDate + "T" + state.startTime;
  const days = timeInterval(time);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allSetUp = coin !== "" 
    && state.startDate !== "" 
    && state.startTime !== "" 
    && state.growRate !== 0 
    && state.investment !== 0 
    && state.interval !== 0;
  const [shouldRenderSpentAmount, setShouldRenderSpentAmount] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowInput(!showGrowInput);};
  const getStartTime = (time: string) => {
    updateState("startTime", time);
  };
  useEffect(() => {
    if (allSetUp) {
      setShouldRenderSpentAmount(true);
    }
  }, [state.startDate, allSetUp]);
  // set state with dynamyc key [name] for the following functions
  const getStartDate = (date: string) => {
    updateState("startDate", date);
    shouldRenderSpentAmount && setShouldRenderSpentAmount(false);
  };
  const getInterval = (interval: string) => {
    updateState("interval", interval);
    shouldRenderSpentAmount && setShouldRenderSpentAmount(false);
  };
  const getGrowRate = (rate: string) => {
    updateState("growRate", rate);
    shouldRenderSpentAmount && setShouldRenderSpentAmount(false);
  };
  const getInvestment = (amount: string) => {
    updateState("investment", amount);
  };
  const calculateVCA = () => {
    allSetUp && setShouldRenderSpentAmount(true);
  };
  const pStyle = "my-2 border-b-[1px] border-cryptodark-160 pl-2 pb-2";
  return (
    <div className=" w-full">
      <div className="text-xs flex justify-between">
        <div className="w-2/3">
          <p className={`${pStyle} flext justify-end`}>Start date: <span className="text-[0.62rem] ml-24 text-cryptoblue-650"> {state.startDate}</span><span className="text-[0.62rem] ml-10 text-cryptoblue-650">{state.startTime}</span></p>
          <p className={pStyle}>Contribution interval , days</p>
          <p className={pStyle}>Initial investment, $</p>
          <p className={pStyle}>Grow rate per interval, %</p>
          <p className={pStyle}>Total amount spent on investments, $</p>
          <p className="pl-2">Coins value today, $</p>
        </div>
        <div className="text-center divide-y divide-cryptodark-160 w-1/4 mt-[1px]">
          <DateInput getTime={getStartTime} getDate={getStartDate} date={state.startDate} time={state.startTime} />
          <Amount placeholder="Minimum 1day" visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
          <Amount placeholder="Minimum $1" visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
          <Amount placeholder="Minimum %1" visible={showGrowInput} toggleVisible={toggleGrowRate} getAmount={getGrowRate} />
          {shouldRenderSpentAmount ? 
            <SpentAmount 
              query={query} 
              growRate={state.growRate} 
              interval={state.interval}
              initialAmount={state.investment}
              days={days}
              startTime={time}
            /> : 
            <>
              <p className="py-2">$</p>
              <p className="py-2">$</p>
            </> 
          }
        </div>
      </div>
      <div className="flex">
        <button 
          className={clsx("text-center text-sm font-thin py-1 box-border border border-cryptodark-160 hover:border-cryptoblue-800 focus:bg-cryptodark-350 rounded-lg cursor-pointer ml-auto mb-3 w-32",{
            "focus:bg-cryptoblue-100": !darkmode,  
          })}
          onClick={calculateVCA}
        >calculate (VCA)</button>
      </div>
    </div>
  );
};
export default ValueCostAverage;