import React from "react";
import clsx from "clsx";
const Price = ({price, currency, darkMode}:{price:number, currency: any, darkMode: boolean}) => {
  return (
    <>
      <p className={clsx("text-xs mt-4",{
        "font-thin": darkMode,
        "font-normal": !darkMode,
      })}>1 {currency.label} = {currency.sign}{price}</p>
    </>
  );
};
export default Price;