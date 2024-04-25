import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "../../lib/dynamicValuesSlice";
import clsx from "clsx";

export const Header = ({dataOne, price, compare, priceDate } : {dataOne: string, price: number, compare: boolean, priceDate: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const coinLastPrice = currency.sign + Number(price).toFixed(3);
  const firstCoinName = dataOne?.[0][0].toUpperCase() + dataOne?.[0].slice(1);
  const dateNow = new Date(priceDate).toLocaleString("default", { month: "long" }).slice(0,3) + " " + new Date(priceDate).getDate() + ", " + new Date(priceDate).getUTCFullYear();
  return (
    <div>
      {compare ? <p className={clsx("text-2xl font-bold tabular-nums", {
        "text-cryptodark-550": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{dateNow}</p> : <p className={clsx("text-xl",{
        "text-cryptodark-550": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{firstCoinName + " "} ( {dataOne[1].toUpperCase()} ) </p>}
      {compare ? <p className={clsx("text-xl ",{
        "text-cryptodark-350": darkmode,
        "text-cryptoblue-100": !darkmode,
      })}>.</p> : <p className={clsx("text-2xl font-bold",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{coinLastPrice}</p>}
      {compare ? <p className={clsx("text-sm",{
        "text-cryptoblue-100": !darkmode,
        "text-cryptodark-350": darkmode,
      })}>.</p> : <p className={clsx("text-sm tabular-nums ",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{dateNow}</p>}
    </div>             
  );
};
export const HeaderBackUp = ({dataOne, compare} : {dataOne: string, compare: boolean}) => {
  const darkmode = useSelector(selectDarkmode);
  const firstCoinName = dataOne?.[0][0].toUpperCase() + dataOne?.[0].slice(1);
  return (
    <div>
      {compare ? <p className={clsx("text-2xl font-bold tabular-nums", {
        "text-cryptodark-350": darkmode,
        "text-cryptodark-400": !darkmode,
      })}></p> : <p className={clsx("text-xl",{
        "text-cryptodark-550": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>{firstCoinName + " "} ( {dataOne[1].toUpperCase()} ) </p>}
      {compare ? <p className={clsx("text-sm ",{
        "text-cryptodark-550": darkmode,
        "text-cryptoblue-100": !darkmode,
      })}>Oops, something went wrong. Please try again later.</p> : <p className={clsx("text-xl",{
        "text-cryptodark-100": darkmode,
        "text-cryptodark-400": !darkmode,
      })}>N/A</p>}
      <p className={clsx("text-sm",{
        "text-cryptoblue-100": !darkmode,
        "text-cryptodark-350": darkmode,
      })}>.</p>
    </div>             
  );
};
export const VolumeHeader = ({volume, compare, volumeDate } : {volume: number[][], compare: boolean, volumeDate: number}) => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const volumeToShow = currency.sign + (Number(volume?.[1]) / Math.pow(10,9)).toFixed(3)  + "bln";
  const dateNow = new Date(volumeDate).toLocaleString("default", { month: "long" }).slice(0,3) + " " + new Date(volumeDate).getDate() + ", " + new Date(volumeDate).getUTCFullYear();
  return (
    <div className={clsx("",{
      "text-cryptodark-400": !darkmode,
    })}>
      {compare ? <p className={clsx("text-2xl font-bold", {
        "text-cryptodark-100": darkmode,
      })}>Volume 24h</p> : <p className={clsx("text-xl", {
        "text-cryptodark-550": darkmode,
      })}>Volume 24h</p>}
      {compare ? <p className={clsx("text-sm",{
        "text-cryptodark-550": darkmode,
      })}>{dateNow}</p> : <p className={clsx("text-2xl font-bold",{
        "text-cryptodark-100": darkmode,
      })}>{volumeToShow}</p>}
      {compare ? <p className={clsx("text-xl",{
        "text-cryptodark-350": darkmode,
        "text-cryptodark-100": !darkmode,
      })}>.</p> : <p className={clsx("text-sm",{
        "text-cryptodark-550": darkmode,
      })}>{dateNow}</p>}
    </div>             
  );
};