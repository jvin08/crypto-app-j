"use client";
import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import CoinSelect from "../portfolioModal/CoinSelect";
import DeleteModal from "../portfolioDeleteModal/DeleteModal";
import clsx from "clsx";
import Link from "next/link";
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
  const [showCoinEdit, setShowCoinEdit] = useState(false);
  const [coinProfit, setCoinProfit] = useState(["","",""]);
  const [coinId, setCoinId] = useState("");
  const toggleCoinEdit = (id: string) => {
    setCoinId(id);
    setShowCoinEdit((prev) => !prev);
  };
  const toggleDeleteModal = (profitData: string[]) => {
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
    <>{coinData.length > 0 ? 
      <div className={clsx("mt-5",{
        "bg-cryptodark-400": darkmode,
      })}>
        {showCoinEdit && <CoinSelect 
          toggleCoinSelect={toggleCoinEdit} 
          onCoinAdded={handleCoinAdded} 
          id={coinId} />}
        <div>
          {
            coinData.map((coin:Coin) => {
              return (
                <div key={coin.id} className="mb-5">
                  {showDeleteModal && <DeleteModal toggleDeleteModal={toggleDeleteModal} gain={coinProfit} handleCoinAdded={handleCoinAdded} />}
                  <Link href={`/coin/${coin.id}`}>
                    <CoinCard storageData={coin} toggleDeleteModal={toggleDeleteModal} toggleEditModal={toggleCoinEdit}/>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div> :
      (<div className="loadingBig"/>)
    }</>
  );
};
export default PortfolioList;