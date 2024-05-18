import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";

export const Header = ({price, priceDate } : {price: number, priceDate: number}) => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const coinLastPrice = currency.sign + Number(price).toFixed(3);
  const day = new Date(priceDate);
  const dateNow = day.toLocaleString("default", { month: "long" }).slice(0,3) + " " + day.getDate() + ", " + day.getUTCFullYear();
  return (
    <div className="absolute left-3 top-5 text-left">
      <p className={clsx("text-2xl font-bold",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>Total: {coinLastPrice}</p>
      <p className={clsx("text-sm tabular-nums mt-2",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{dateNow}</p>
    </div>             
  );
};
