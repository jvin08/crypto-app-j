"use client";
import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import DeleteModal from "../portfolioDeleteModal/DeleteModal";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
type Coin = {
  id: string,
  coin: string,
  symbol: string,
  amount: number,
  purchaseTime: string,
  image: string,
}
const PortfolioList = ({forceUpdate, handleCoinAdded}:{forceUpdate:boolean, handleCoinAdded: ()=>void}) => {
  const darkmode = useSelector(selectDarkmode);
  const [coinData, setCoinData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coinProfit, setCoinProfit] = useState(["","",""]);
  const toggleDeleteModal = (e: MouseEvent, profitData: string[]) => {
    profitData && setCoinProfit([profitData[0], profitData[1], profitData[2]]);
    setShowDeleteModal((prev) => !prev);
  };
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
        coinData.map((coin:Coin) => {
          return (
            <div key={coin.id}>
              {showDeleteModal && <DeleteModal toggleDeleteModal={toggleDeleteModal} gain={coinProfit} handleCoinAdded={handleCoinAdded} />}
              <CoinCard storageData={coin} toggleDeleteModal={toggleDeleteModal} />
            </div>
          );
        })
      };
    </div>:
      <p className="text-cryptodark-510 text-center mt-10">Portfolio is empty, please add assets...</p>
    }</>
  );
};
export default PortfolioList;