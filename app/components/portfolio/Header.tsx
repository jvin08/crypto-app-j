import React from "react";
import CoinSelect from "./CoinSelect";
import CustomButton from "../coinsConverter/CustomButton";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const Header = () => {
  const [showCoinSelect, setShowCoinSelect] = React.useState(false);
  const darkmode = useSelector(selectDarkmode);
  const toggleCoinSelect = () => {
    setShowCoinSelect(!showCoinSelect);
  };
  return (
    <div className={clsx("flex justify-between items-center pt-6",{
      "text-cryptodark-100": darkmode,
      "text-cryptoblue-810": !darkmode,
    })}>
      Your statistics
      <CustomButton name="Add Asset" handleClick={toggleCoinSelect} active={true} width="w-64" padding="py-2"/>
      {showCoinSelect && <CoinSelect toggleCoinSelect={toggleCoinSelect} />}
    </div>
  );
};
export default Header;
