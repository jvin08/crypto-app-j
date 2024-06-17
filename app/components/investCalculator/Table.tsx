import React from "react";
import Amount from "./Amount";
import { ToolTip } from "./ToolTip";
import { info } from "./utils";
import SpentAmount from "./SpentAmount";
import SpentAmountDCA from "./SpentAmountDCA";

type State = {
  startDateTime: string,
  endDateTime: string,
  interval: number,
  investment: number,
  growRate: number,
}
const Table = ({
  name,
  visibleInterval,
  displayInterval,
  amountHandler,
  showInvestment,
  displayInvestment,
  showGrowInput,
  toggleGrowRate,
  state,
  getChartData,
  showSpentAmount,
  days,
  query,
  rowThreeName
}:{
    name: string,
    visibleInterval:boolean,
    displayInterval:()=>void,
    amountHandler:Function,
    showInvestment:boolean,
    displayInvestment:()=>void,
    showGrowInput:boolean,
    toggleGrowRate:()=>void,
    state: State,
    getChartData: Function,
    showSpentAmount: boolean,
    days: number | undefined,
    query: string,
    rowThreeName: string,
}) => {
  const outerStyle = "relative w-full flex sm:items-start justify-between items-center sm:flex-col border-b-[1px] box-border border-cryptoblue-460 h-[52px]";
  const innerStyle = "sm:w-full sm:flex flex flex-row sm:justify-between sm:items-center";
  const isVCA = name === "Value cost averaging";
  return (
    <div className="w-full sm:h-[430px] h-[260px]">
      <div className={outerStyle + " sm:h-[82px]"}>
        <div className={innerStyle + " sm:h-10"}>
          <p>Contribution interval, days</p> <ToolTip text={info.interval} />
        </div>
        <Amount placeholder="Minimum 1d." name="interval" visible={visibleInterval} onToggle={displayInterval} getAmount={amountHandler} />
      </div> 
      <div className={outerStyle + " sm:h-[82px]"}>
        <div className={innerStyle + " sm:h-10"}>
          <p>Initial investment, $</p> <ToolTip text={info.initial} />
        </div>
        <Amount placeholder="Minimum $1" name="investment" visible={showInvestment} onToggle={displayInvestment} getAmount={amountHandler} /> 
      </div>
      <div className={outerStyle + " sm:h-[82px]"}>
        <div className={innerStyle + " sm:h-10"}>
          <p>{rowThreeName} </p> <ToolTip text={info.groWRate} />
        </div>
        <Amount placeholder="Minimum %1" name="growRate" visible={showGrowInput} onToggle={toggleGrowRate} getAmount={amountHandler} /> 
      </div>
      {showSpentAmount 
        ? (isVCA ? <SpentAmount 
          query={query} 
          growRate={state.growRate} 
          interval={state.interval}
          initialAmount={state.investment}
          days={days}
          startTime={state.startDateTime}
          endTime={state.endDateTime}
          getChartData={getChartData}
          innerStyle={innerStyle}
          outerStyle={outerStyle}
        /> 
          : <SpentAmountDCA query={query} 
            growRate={state.growRate} 
            interval={state.interval}
            initialAmount={state.investment}
            days={days}
            startTime={state.startDateTime}
            endTime={state.endDateTime}
            getChartData={getChartData}
            innerStyle={innerStyle}
            outerStyle={outerStyle}/>)
        : <>
          <div className={outerStyle + " sm:h-[93px]"}>
            <div className={innerStyle + " sm:h-14"}>
              <p>Total amount spent on investments, $</p><ToolTip text={info.total} />
            </div>
            <p className="sm:h-10 h-[52px] text-right pr-3 flex items-center">$</p> 
          </div>
          <div className="relative w-full flex sm:items-start justify-between items-center sm:flex-col h-[52px] sm:h-[82px]">
            <div className={innerStyle + " sm:h-14"}>
              <p>Coins value, $</p><ToolTip text={info.value} />
            </div>
            <p className="sm:h-10 h-[52px] text-right pr-3 flex items-center">$</p> 
          </div>
        </>
      }
    </div>
  );
};
export default Table;