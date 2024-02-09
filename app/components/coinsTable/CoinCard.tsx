import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
import { clsx } from "clsx";
const CoinCard = ({coin}: {coin: any}) => {
    const darkmode = useSelector(selectDarkmode);
  return (
    <div>
      <div className={clsx("w-full text-center py-6 rounded-xl",{
        "text-cryptoblue-400": darkmode,
        "text-cryptodark-400": !darkmode,
    })}>coin - {coin}</div>
    </div>
  );
};
export default CoinCard;
