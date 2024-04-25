"use client";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import CoinView from "../../components/coinPage/CoinView";

const Coin = ({ params } : { params : { coinId: string }}) => {
  const darkmode = useSelector(selectDarkmode);
  const coinId = params.coinId.endsWith("market") ? params.coinId.slice(0,-6) : params.coinId.slice(0,-12);
  const storageId = params.coinId.endsWith("market") ? "" : params.coinId.slice(-11);
  return (
    <div className={clsx("pt-[184px]",{
      "bg-cryptodark-400": darkmode,
      "bg-cryptoblue-400": !darkmode,
    })}>
      <CoinView coinId={coinId} id={storageId} />
    </div>
  );
};
export default Coin;