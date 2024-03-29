"use client";
import React from "react";
import ButtonsBox from "../components/coinsConverter/ButtonsBox";
import CoinInputsBox from "../components/coinsConverter/CoinInputsBox";
import dynamic from "next/dynamic";
import clsx from "clsx";
import ChartBox from "../components/charts/ChartBox";
import Chart from "../components/coinsConverter/Chart";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../lib/dynamicValuesSlice";
const Time = dynamic(() => import("../components/coinsConverter/Time"), { ssr: false });
const Converter = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("w-full py-9 px-12", {
      "bg-cryptoblue-400": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <ButtonsBox />
      <p className={clsx("text-sm mt-8",{
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
