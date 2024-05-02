import React, { useState, ChangeEvent } from "react";
import { timeInterval, info } from "./utils";
import Amount from "./Amount";
import DatePicker from "./DatePicker";
import SpentAmountDCA from "./SpentAmountDCA";
import { ToolTip } from "./ToolTip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import CustomButton from "../portfolioModal/CustomButton";

const DollarCostAverage = ({coin}:{coin: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const [state, setState] = useState({
    startDateTime: "2024-01-01 00:00",
    endDateTime: "2024-01-01 00:00",
    interval: 0,
    investment: 0,
    growAmount: 0
  });
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);
  const [showGrowInput, setShowGrowInput] = useState(false);
  const updateState = (key: string, value: string) => {
    setState(prevState => ({...prevState, [key]: value}));
  };
  const days = timeInterval(state.startDateTime);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = coin !== "" 
    && state.startDateTime !== ""
    && state.growAmount !== 0 
    && state.investment !== 0 
    && state.interval !== 0;
  const [shouldRenderSpentAmount, setShouldRenderSpentAmount] = useState(false);
  const displayInterval = () => {setVisibleInterval(!visibleInterval);};
  const displayInvestment = () => {setShowInvestment(!showInvestment);};
  const toggleGrowRate = () => {setShowGrowInput(!showGrowInput);};
  const dateHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState(name, value);
  };
  const amountHandler = (name: string, amount: string) => {
    updateState(name, amount);
  };
  const calculateDCA = () => {
    allowFetchData && setShouldRenderSpentAmount(true);
  };
  const pStyle = "flex items-center h-[52px] border-b-[1px] box-border border-cryptoblue-460 pt-[14px] pb-[13px] relative";
  const pStyleLast = "border-cryptoblue-460 pt-[14px] pb-[13px] relative";
  return (
    <div className=" w-full mb-8">
      <div className="flex relative text-base mb-4">
        <DatePicker 
          name="startDateTime" 
          value={state.startDateTime} 
          dateHandler={dateHandler} 
          info={info.startDate}
        />
        <DatePicker 
          name="endDateTime" 
          value={state.endDateTime} 
          dateHandler={dateHandler} 
          info={info.endDate}
        />
        <p className={clsx("py-2 h-9 w-[83px] text-center ml-auto rounded-lg text-sm text-cryptoblue-650",{
          "bg-cryptodark-350 ": darkmode,
          "bg-cryptoblue-350": !darkmode,
        })}>Q-ty</p>
      </div>
      <div className={clsx("text-base flex justify-between rounded-xl px-8 py-6 mb-8",{
        "bg-cryptodark-300": darkmode,
        "bg-cryptoblue-350": !darkmode,
      })}>
        <div className="w-[83%] h-[260px]">
          <p className={pStyle}>Contribution interval, days <ToolTip text={info.interval} /></p>
          <p className={pStyle}>Initial investment, $ <ToolTip text={info.initial} /></p>
          <p className={pStyle}>Investment added each interval, $  <ToolTip text={info.amountPerInterval} /></p>
          <p className={pStyle}>Total amount spent on investments, $<ToolTip text={info.total} /></p>
          <p className={pStyleLast}>Coins value, $<ToolTip text={info.value} /></p>
        </div>
        <div className="text-center w-[17%] h-[260px]">
          <Amount placeholder="Minimum 1d." name="interval" visible={visibleInterval} onToggle={displayInterval} getAmount={amountHandler} />
          <Amount placeholder="Minimum $1" name="investment" visible={showInvestment} onToggle={displayInvestment} getAmount={amountHandler} />
          <Amount placeholder="Minimum %1" name="growAmount" visible={showGrowInput} onToggle={toggleGrowRate} getAmount={amountHandler} />
          {shouldRenderSpentAmount ? 
            <SpentAmountDCA 
              query={query} 
              growAmount={state.growAmount} 
              interval={state.interval}
              initialAmount={state.investment}
              days={days}
              startTime={state.startDateTime}
              endTime={state.endDateTime}
            /> : 
            <>
              <p className="pt-[14px] h-[52px] border-b-[1px] box-border border-cryptodark-160 text-right pr-3">$</p>
              <p className="pt-[14px] h-[52px] text-right pr-3">$</p>
            </> 
          }
        </div>
      </div>
      <CustomButton name="Calculate (DCA)" handleClick={calculateDCA} active={true} disabled={false} width="w-full" padding="" />
    </div>
  );
};
export default DollarCostAverage;