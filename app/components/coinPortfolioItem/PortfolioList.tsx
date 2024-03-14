"use client";
import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const PortfolioList = ({forceUpdate}:{forceUpdate:boolean}) => {
  const darkmode = useSelector(selectDarkmode);
  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("coins");
        const parsedData = storedData ? JSON.parse(storedData) : [];
        setCoinData(parsedData);
      }
    };
    fetchData();
  }, [forceUpdate]);
  return (
    <>{coinData.length > 0 ? <div className={clsx("mt-5",{
      "bg-cryptodark-400": darkmode,
    })}>
      {
        coinData.map((coin:any) => {
          return <CoinCard key={coin.coin + coin.purchaseTime} storageData={coin} />;
        })
      };
    </div>:
      <p className="text-cryptodark-510 text-center mt-10">Portfolio is empty, please add assets...</p>
    }</>
  );
};
export default PortfolioList;