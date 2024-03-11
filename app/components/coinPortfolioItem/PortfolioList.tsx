"use client";
import React from "react";
import CoinCard from "./CoinCard";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const PortfolioList = () => {
  const darkmode = useSelector(selectDarkmode);
  const [coinData, setCoinData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch data from localStorage only on the client-side
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("coins");
        const parsedData = storedData ? JSON.parse(storedData) : [];
        setCoinData(parsedData);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={clsx("",{
      "bg-cryptodark-350": darkmode,
    })}>
      {
        coinData.map((coin:any) => {
          return <CoinCard key={coin.coin} storageData={coin} />;
        })
      };
    </div>
  );
};
export default PortfolioList;