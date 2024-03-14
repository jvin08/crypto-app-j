import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useLocalStorage } from "@/app/components/portfolioModal/hooks";
import SaveButton from "./SaveButton";
import Search from "./Search";
import Amount from "./Amount";
import Date from "./Date";
const CoinSelect = ({toggleCoinSelect, onCoinAdded}: {toggleCoinSelect: ()=>void, onCoinAdded: ()=>void}) => {
  const btcIMG = "http://cryptoicons.co/images/coin_icon@2x.png";
  const darkmode = useSelector(selectDarkmode);
  const [localStorage, setLocalStorage] = useLocalStorage();
  const [inputAmount, setInputAmount] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(["",""]);
  const [coinImage, setCoinImage] = useState(btcIMG);
  const [amount, setAmount] = useState("");
  const [purchaseTime, setPurchaseTime] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const activeSaveBtn = amount !== "" && purchaseTime !== "" && purchaseDate !== "" && selectedCoin[0] !== "";
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.id, coin.symbol]);
  };
  const toggleAmount = () => {
    setInputAmount(!inputAmount);
  };
  const getAmount = (amount: string) => {
    setAmount(amount);
  };
  const getPurchaseTime = (time: string) => {
    setPurchaseTime(time);
  };
  const getPurchaseDate = (date: string) => {
    setPurchaseDate(date);
  };
  const saveDataToLocalStorage = () => {
    const time = purchaseDate + "T" + purchaseTime;
    const newCoin = {
      coin: selectedCoin[0],
      symbol: selectedCoin[1],
      amount: amount,
      purchaseTime: time,
      image: coinImage,
    };
    if(activeSaveBtn){
      setLocalStorage([...localStorage, newCoin]);
      toggleCoinSelect();
      onCoinAdded();
    }
  };
  return (
    <div className="absolute top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className={clsx("m-auto w-1/2 h-2/5 z-50 p-8 rounded-lg",{
        "bg-cryptodark-400": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
        <div className="flex justify-between ">
          <p>Select coins</p>
          <svg 
            className="cursor-pointer" 
            onClick={toggleCoinSelect}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.17188 14.8299L14.8319 9.16992" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.8319 14.8299L9.17188 9.16992" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex justify-between h-5/6 mt-5 pb-3">
          <div className={clsx(" w-[30%] flex-col pt-12 rounded",{
            "bg-cryptodark-350": darkmode,
            "bg-cryptoblue-200": !darkmode,
          })}>
            <div className={clsx("w-14 h-14 mx-auto rounded p-3 mb-2",{
              "bg-cryptodark-160" : darkmode,
              "bg-cryptoblue-100": !darkmode,
            })}>
              <Image src={coinImage} alt="coin-image" width={35} height={35} />
            </div>
            <p className="text-center">{selectedCoin[0]?selectedCoin[0]:"Your Crypto"} ({selectedCoin[0]?selectedCoin[1]:"ABC"})</p>
          </div>
          <div className="w-[67%] text-xs flex flex-col justify-between"> 
            <Search handleCoin={handleCoin} />
            <Amount visible={inputAmount} toggleVisible={toggleAmount} getAmount={getAmount} />
            <Date getTime={getPurchaseTime} getDate={getPurchaseDate} />
            <div className="flex justify-between mt-1">
              <SaveButton name="Cancel" handleClick={toggleCoinSelect} active={true} width="w-[calc(50%-8px)]" padding="py-1"/>
              <SaveButton name="Save and Continue" handleClick={saveDataToLocalStorage} active={activeSaveBtn} width="w-1/2" padding="py-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinSelect;