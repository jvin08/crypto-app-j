import React, { useState } from "react";
import { timeInterval, info } from "./utils";
import Amount from "./Amount";
import SpentAmountDCA from "./SpentAmountDCA";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import  { DateToolTip, ToolTip } from "./ToolTip";
const DollarCostAverage = ({coin}:{coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [interval, setInterval] = useState(0);
  const [showInvestment, setShowInvestment] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [showGrowAmountInput, setShowGrowAmountInput] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [growAmount, setGrowAmount] = useState(0);
  const days = timeInterval(startDateTime);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = coin !== "" && startDateTime !== "" && growAmount !== 0 && investment !== 0 && interval !== 0;
  const [shouldRenderSpentAmount, setShouldRenderSpentAmount] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowAmountInput(!showGrowAmountInput);};
  const getStartDateTime = (e: any) => {
    setStartDateTime(e.target.value);
  };
  const getEndDateTime = (e: any) => {
    setEndDateTime(e.target.value);
  };
  const getInterval = (interval: number) => {setInterval(interval);};
  const getGrowAmount = (amount: number) => {setGrowAmount(amount);};
  const getInvestment = (amount: number) => {setInvestment(amount);};
  const calculateDCA = () => {
    allowFetchData && setShouldRenderSpentAmount(true);
  };
  const pStyle = "relative my-2 border-b-[1px] border-cryptodark-160 pb-2";
  return (
    <div className="w-full">
      <div className="text-xs flex justify-between">
        <div className="w-[calc(83%-0.5rem)]">
          <div className="flex border-b-[1px] border-cryptodark-160 relative">
            <input 
              type="datetime-local" 
              className={clsx("mr-1 my-2 text-cryptoblue-650",{
                "bg-cryptodark-400 ": darkmode,
                "bg-cryptoblue-200 text-cryptoblue-750": !darkmode
              })} 
              onChange={getStartDateTime}/>
            <span className="relative mr-8"><DateToolTip text={info.startDate} /></span>
            <input 
              type="datetime-local" 
              className={clsx("mr-1 my-2 text-cryptoblue-650",{
                "bg-cryptodark-400 ": darkmode,
                "bg-cryptoblue-200 text-cryptoblue-750": !darkmode
              })}  
              onChange={getEndDateTime} />
            <span className="relative"><DateToolTip text={info.endDate} /></span>
          </div>
          <p className={pStyle}>Contribution interval, days <ToolTip text={info.interval} /> </p>
          <p className={pStyle}>Initial investment, $  <ToolTip text={info.initial} /></p>
          <p className={pStyle}>Investment added each interval, $  <ToolTip text={info.amountPerInterval} /></p>
          <p className={pStyle}>Total amount spent on investments, $  <ToolTip text={info.total} /></p>
          <p className="relative">Coins value, $ <ToolTip text={info.value} /></p>
        </div>
        <div className="text-center divide-y divide-cryptodark-160 w-1/6 mt-[1px]">
          {/* <h3 className="text-sm mb-2">Q-ty</h3> */}
          <p className="py-2 pb-[0.55rem]">Q-ty</p>
          <Amount placeholder="minimum 1 day" visible={visibleInterval} toggleVisible={displayInterval} getAmount={getInterval} />
          <Amount placeholder="minimum $1" visible={showInvestment} toggleVisible={displayInvestment} getAmount={getInvestment} />
          <Amount placeholder="minimum $1" visible={showGrowAmountInput} toggleVisible={toggleGrowRate} getAmount={getGrowAmount} />
          {shouldRenderSpentAmount ? 
            <SpentAmountDCA
              query={query} 
              growAmount={growAmount} 
              interval={interval}
              initialAmount={investment}
              days={days}
              startTime={startDateTime}
              endTime={endDateTime}
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
          onClick={calculateDCA}
        >calculate (DCA)</button>
      </div>
    </div>
  );
};
export default DollarCostAverage;