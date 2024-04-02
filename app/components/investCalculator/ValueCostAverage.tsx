import React, { useState, useEffect } from "react";
import { timeInterval, info } from "./utils";
import Amount from "./Amount";
import SpentAmount from "./SpentAmount";
import { ToolTip, DateToolTip } from "./ToolTip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
const ValueCostAverage = ({coin}:{coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  //value cost averaging
  const [state, setState] = useState({
    startDateTime: "",
    endDateTime: "",
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
  const days = timeInterval(state.startDateTime);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allSetUp = coin !== "" 
    && state.startDateTime !== ""
    && state.growRate !== 0 
    && state.investment !== 0 
    && state.interval !== 0;
  const [shouldRenderSpentAmount, setShouldRenderSpentAmount] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowInput(!showGrowInput);};
  const getStartDateTime = (e: any) => {
    updateState("startDateTime", e.target.value);
  };
  const getEndDateTime = (e: any) => {
    updateState("endDateTime", e.target.value);
  };
  useEffect(() => {
    if (allSetUp) {
      setShouldRenderSpentAmount(true);
    }
  }, [state.startDateTime, allSetUp]);  
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
  const pStyle = "my-2 border-b-[1px] border-cryptodark-160 pb-2 relative";
  return (
    <div className=" w-full">
      <div className="text-xs flex justify-between">
        <div className="w-[calc(83%-0.5rem)]">
          <div className="flex border-b-[1px] border-cryptodark-160 relative">
            <input type="datetime-local" className="mr-1 my-2 bg-cryptodark-400 text-cryptoblue-650" onChange={getStartDateTime}/>
            <span className="relative mr-8"><DateToolTip text={info.startDate} /></span>
            <input type="datetime-local" className="my-2 ml-1 bg-cryptodark-400 text-cryptoblue-650" onChange={getEndDateTime} />
            <span className="relative ml-1"><DateToolTip text={info.endDate} /></span>
          </div>
          <p className={pStyle}>Contribution interval, days <ToolTip text={info.interval} /></p>
          <p className={pStyle}>Initial investment, $ <ToolTip text={info.initial} /></p>
          <p className={pStyle}>Grow rate per interval, % <ToolTip text={info.groWRate} /></p>
          <p className={pStyle}>Total amount spent on investments, $<ToolTip text={info.total} /></p>
          <p className="relative">Coins value, $<ToolTip text={info.value} /></p>
        </div>
        <div className="text-center divide-y divide-cryptodark-160 w-1/6 mt-[1px]">
          <p className="py-2">Q-ty</p>
          <Amount placeholder="Minimum 1d." visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
          <Amount placeholder="Minimum $1" visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
          <Amount placeholder="Minimum %1" visible={showGrowInput} toggleVisible={toggleGrowRate} getAmount={getGrowRate} />
          {shouldRenderSpentAmount ? 
            <SpentAmount 
              query={query} 
              growRate={state.growRate} 
              interval={state.interval}
              initialAmount={state.investment}
              days={days}
              startTime={state.startDateTime}
              endTime={state.endDateTime}
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