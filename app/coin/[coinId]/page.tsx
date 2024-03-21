"use client";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import CoinView from "../../components/coinPage/CoinView";
const Coin = ({ params } : { params : { coinId: string }}) => {
  const darkmode = useSelector(selectDarkmode);
  const coinId = params.coinId.slice(0,-12);
  return (
    <div className={clsx("px-12 pt-32",{
      "bg-cryptodark-400": darkmode,
      "bg-cryptoblue-400": !darkmode,
    })}>
      <CoinView coinId={coinId} id={params.coinId.slice(-11)} />
    </div>
  );
};
export default Coin;