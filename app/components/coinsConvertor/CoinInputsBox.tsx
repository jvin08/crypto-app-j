import React from "react";
import CoinInput from "./CoinInput";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCoinOneSymbol, selectCoinTwoSymbol } from "@/app/lib/dynamicValuesSlice";
const CoinInputsBox = () => {
  const darkmode = useSelector(selectDarkmode);
  const coinOneSymbol = useSelector(selectCoinOneSymbol);
  const coinTwoSymbol = useSelector(selectCoinTwoSymbol);
  const coinTwoDefault = coinTwoSymbol[0] === "" ? ["ethereum","eth"] : coinTwoSymbol;
  return (
    <div className={clsx("flex w-full justify-between mt-6 mb-6",{})}>
      <CoinInput header="You buy" darkmode={darkmode} coin={coinOneSymbol} />
      <div className="w-6"></div>
      <CoinInput header="You sell" darkmode={darkmode} coin={coinTwoDefault} />
    </div>
  );
};
export default CoinInputsBox;