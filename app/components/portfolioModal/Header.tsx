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
    <div className={clsx("flex justify-between items-center mt-[128px] sm:hidden",{
      "text-cryptodark-100": darkmode,
      "text-cryptoblue-810": !darkmode,
    })}>
      Your statistics
      <div className="grid grid-cols-2 gap-2">
        <CustomButton name="Investments Calculator" handleClick={toggleCalculator} active={true} width="w-[244px]" padding="py-2" disabled={false}/>
        <CustomButton name="Add Asset" handleClick={toggleCoinSelect} active={true} width="w-[244px]" padding="py-2" disabled={false}/>
      </div>
      {showCalculator && <Calculator toggleCalculator={toggleCalculator} />}
      {showCoinSelect && <CoinSelect toggleCoinSelect={toggleCoinSelect} onCoinAdded={handleCoinAdded}  id="" />}
    </div>
  );
};
export default Header;
