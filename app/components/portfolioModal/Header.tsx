import React, { useState } from "react";
import CoinSelect from "./CoinSelect";
import Calculator from "../investCalculator/Calculator";
import CustomButton from "./CustomButton";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";

const Header = ({handleCoinAdded}:{handleCoinAdded: ()=>void}) => {
  const [showCoinSelect, setShowCoinSelect] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const darkmode = useSelector(selectDarkmode);
  const toggleCoinSelect = () => {
    setShowCoinSelect(!showCoinSelect);
  };
  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };
  return (
    <div className={clsx("flex justify-between sm:w-full sm:flex-col-reverse items-center sm:mt-20 mt-[128px]",{
      "text-cryptodark-100": darkmode,
      "text-cryptoblue-810": !darkmode,
    })}>
      <p className="sm:mt-6 sm:text-left sm:w-full">Your statistics</p>
      <div className="flex sm:flex-col sm:w-full flex-row gap-4">
        <CustomButton name="Greed & Fear Index" handleClick={()=>{}} active={true} width="sm:w-full w-[244px]" padding="py-2" disabled={false}/>
        <CustomButton name="Investments Calculator" handleClick={toggleCalculator} active={true} width="sm:w-full w-[244px]" padding="py-2" disabled={false}/>
        <CustomButton name="Add Asset" handleClick={toggleCoinSelect} active={true} width="sm:w-full w-[244px]" padding="py-2" disabled={false}/>
      </div>
      {showCalculator && <Calculator toggleCalculator={toggleCalculator} />}
      {showCoinSelect && <CoinSelect toggleCoinSelect={toggleCoinSelect} onCoinAdded={handleCoinAdded}  id="" />}
    </div>
  );
};
export default Header;
