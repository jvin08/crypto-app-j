import React from "react";
import clsx from "clsx";

const Price = ({price, currency, darkMode, coin}:{price:number, currency: any, darkMode: boolean, coin: string[]}) => {
  return (
    <>
      <p className={clsx("text-xs mt-4",{
        "font-thin": darkMode,
        "font-normal": !darkMode,
      })}>1 {coin[1].toLocaleUpperCase()} = {currency.sign}{price}</p>
    </>
  );
};
export default Price;