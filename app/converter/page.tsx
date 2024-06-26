"use client";
import React from "react";
import ButtonsBox from "../components/coinsConverter/ButtonsBox";
import CoinInputsBox from "../components/coinsConverter/CoinInputsBox";
import Time from "../components/coinsConverter/Time";
import clsx from "clsx";
import ChartBox from "../components/charts/ChartBox";
import Chart from "../components/coinsConverter/Chart";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../lib/dynamicValuesSlice";

const Converter = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("max-w-[1296px] mx-auto sm:max-w-[480px] sm:px-4 pb-10 pt-[56px]", {
      "bg-cryptoblue-350": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <ButtonsBox />
      <p className={clsx("text-sm mt-10 sm:mt-6 sm:text-xl",{
        "text-cryptoblue-810": !darkmode,
        "text-cryptodark-550": darkmode,
      })}>Online currency convertor</p>
      <Time darkmode={darkmode} />
      <CoinInputsBox />
      <ChartBox Charts={Chart} />
    </div>
  );
};
export default Converter;
