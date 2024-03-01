"use client";
import React from "react";
import ButtonsBox from "../components/coinsConvertor/ButtonsBox";
import Time from "../components/coinsConvertor/Time";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../lib/dynamicValuesSlice";
const Convertor = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("w-full py-9 px-12", {
      "bg-cryptoblue-400": !darkmode,
      "bg-cryptodark-400": darkmode,
  })}>
     <ButtonsBox />
     <p className={clsx("text-xl mt-8",{
        "text-cryptoblue-810": !darkmode,
        "text-cryptodark-550": darkmode,
     })}>Online currency convertor</p>
      <Time darkmode={darkmode} />
    </div>
  );
};
export default Convertor;
