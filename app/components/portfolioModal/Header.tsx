import React, { useState } from "react";
import CoinSelect from "./CoinSelect";
import Calculator from "../investCalculator/Calculator";
import CustomButton from "../coinsConverter/CustomButton";
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
    <div className={clsx("flex justify-between items-center pt-6 mt-24",{
      "text-cryptodark-100": darkmode,
      "text-cryptoblue-810": !darkmode,
    })}>
      Your statistics
      <div className="grid grid-cols-2 gap-4">
        <CustomButton name="Investments Calculator" handleClick={toggleCalculator} active={true} width="w-64" padding="py-2"/>
        <CustomButton name="Add Asset" handleClick={toggleCoinSelect} active={true} width="w-64" padding="py-2"/>
      </div>
      {showCalculator && <Calculator toggleCalculator={toggleCalculator} />}
      {showCoinSelect && <CoinSelect toggleCoinSelect={toggleCoinSelect} onCoinAdded={handleCoinAdded}  id="" />}
    </div>
  );
};
export default Header;
