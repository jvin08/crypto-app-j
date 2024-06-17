import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import { timeInterval, info, formattedDateTime } from "./utils";
import DatePicker from "./DatePicker";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import CustomButton from "../portfolioModal/CustomButton";
import Chart from "./Chart";
import Table from "./Table";

const DollarCostAverage = ({coin}:{coin: string}) => {
  const dataRef = useRef([[0, 0]]);
  const darkmode = useSelector(selectDarkmode);
  const [state, setState] = useState({
    startDateTime: "2024-01-01 00:00",
    endDateTime:  formattedDateTime(new Date()).replace("T", " "),
    interval: 0,
    investment: 0,
    growRate: 0,
    showChart: false
  });
  const [visibleInterval, setVisibleInterval] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);
  const [showGrowInput, setShowGrowInput] = useState(false);
  const updateState = (key: string, value: any) => {
    setState(prevState => ({...prevState, [key]: value}));
  };
  const days = timeInterval(state.startDateTime);
  const query = `${coin}/market_chart?vs_currency=usd&days=${days}`;
  const allowFetchData = coin !== "" 
    && state.startDateTime !== ""
    && state.growRate !== 0 
    && state.investment !== 0 
    && state.interval !== 0;
  const [showSpentAmount, setShowSpentAmount] = useState(false);
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
    allowFetchData && setShowSpentAmount(true);
  };
  const getChartData = useCallback((data: number[][]) => {
    dataRef.current = data;
  },[]);
  const handleChart = () => {
    if(dataRef.current.length > 1){
      updateState("showChart", !state.showChart);
    }
  };
  const openChart = state.showChart ? "openingchart" : "w-0";
  const notAllowed = dataRef.current.length === 1 ? "not-allowed" : "pointer";
  return (
    <div className=" w-full mb-8">
      <div className="flex sm:flex-col relative text-base mb-4">
        <button className={clsx("py-2 px-auto h-9 w-[83px] mr-4 rounded-lg text-sm font-semibold",{
          "bg-cryptodark-350 text-cryptoblue-650": darkmode,
          "bg-cryptoblue-350 text-cryptoblue-660": !darkmode,
        })}
        onClick={handleChart}
        style={{cursor: notAllowed}}
        >{!state.showChart 
            ? <div className="flex items-center justify-start relative"><svg className="mr-2 ml-8 mb-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 20H4V19.46L9 14.46L12.8 18.26C12.9874 18.4463 13.2408 18.5508 13.505 18.5508C13.7692 18.5508 14.0226 18.4463 14.21 18.26L21.71 10.76C21.8037 10.667 21.8781 10.5564 21.9289 10.4346C21.9797 10.3127 22.0058 10.182 22.0058 10.05C22.0058 9.91799 21.9797 9.78728 21.9289 9.66542C21.8781 9.54356 21.8037 9.43296 21.71 9.34C21.5226 9.15375 21.2692 9.04921 21.005 9.04921C20.7408 9.04921 20.4874 9.15375 20.3 9.34L13.5 16.14L9.71 12.34C9.52264 12.1537 9.26919 12.0492 9.005 12.0492C8.74081 12.0492 8.48736 12.1537 8.3 12.34L4 16.63V11.46L9 6.46L11.8 9.26C11.9874 9.44625 12.2408 9.55079 12.505 9.55079C12.7692 9.55079 13.0226 9.44625 13.21 9.26L18 4.47L20.19 6.66C20.3783 6.84698 20.6332 6.95149 20.8985 6.95056C21.1639 6.94962 21.418 6.8433 21.605 6.655C21.792 6.4667 21.8965 6.21183 21.8956 5.94646C21.8946 5.6811 21.7883 5.42698 21.6 5.24L18.69 2.35C18.5026 2.16375 18.2492 2.05921 17.985 2.05921C17.7208 2.05921 17.4674 2.16375 17.28 2.35L12.48 7.15L9.69 4.35C9.50264 4.16375 9.24919 4.05921 8.985 4.05921C8.72081 4.05921 8.46736 4.16375 8.28 4.35L4 8.63V3C4 2.73478 3.89464 2.48043 3.70711 2.29289C3.51957 2.10536 3.26522 2 3 2C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20Z" 
                fill={"#1fcac0"}  fillOpacity={1} />
            </svg>
            </div> 
            : <span className="absolute top-1 left-8 text-lg">☶</span>
          }</button>
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
        <p className={clsx("sm:hidden py-2 h-9 w-[83px] text-center ml-auto rounded-lg text-sm text-cryptoblue-650",{
          "bg-cryptodark-350 ": darkmode,
          "bg-cryptoblue-350": !darkmode,
        })}>Q-ty</p>
      </div>
      <div className={`${openChart} overflow-hidden absolute top-30 left-[60px] h-[307.97px] z-[199]`}>
        <Chart data={dataRef.current} coin={coin} />
      </div>
      <div className={clsx("text-base flex justify-between rounded-xl px-8 py-6 mb-8",{
        "bg-cryptodark-300": darkmode,
        "bg-cryptoblue-350": !darkmode,
      })}>
        <Table 
          name="Dollar cost averaging"
          visibleInterval={visibleInterval}
          displayInterval={displayInterval}
          amountHandler={amountHandler}
          showInvestment={showInvestment}
          displayInvestment={displayInvestment}
          showGrowInput={showGrowInput}
          toggleGrowRate={toggleGrowRate}
          state={state}
          getChartData={getChartData}
          showSpentAmount={showSpentAmount}
          days={days}
          query={query}
          rowThreeName="Funds added per interval, $"
        />
        {/* <div className="w-[83%] h-[260px]">
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
              getChartData={getChartData}
            /> : 
            <>
              <p className="pt-[14px] h-[52px] border-b-[1px] box-border border-cryptodark-160 text-right pr-3">$</p>
              <p className="pt-[14px] h-[52px] text-right pr-3">$</p>
            </> 
          }
        </div> */}
      </div>
      <CustomButton name="Calculate (DCA)" handleClick={calculateDCA} active={true} disabled={false} width="w-full" padding="" />
    </div>
  );
};
export default DollarCostAverage;