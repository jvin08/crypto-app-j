import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { uid } from "uid";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, setNotification, setShowNotification } from "@/app/lib/dynamicValuesSlice";
import { useLocalStorage } from "@/app/components/portfolioModal/hooks";
import SaveButton from "./SaveButton";
import Search from "./Search";
import Amount from "./Amount";
import Date from "./Date";
import BitcoinImg from "../../../public/bitcoin.png";
type Coin = {
  id: string,
  coin: string,
  symbol: string,
  amount: number,
  purchaseTime: string,
  image: string,
}
const CoinSelect = ({toggleCoinSelect, onCoinAdded, id}: {toggleCoinSelect: any, onCoinAdded: ()=>void, id: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const [localStorage, setLocalStorage] = useLocalStorage();
  const editedCoin = id ? localStorage.find((coin:Coin) => coin.id === id) : "";
  const [inputAmount, setInputAmount] = useState(false);
  const initialSelectedCoin = id ? [editedCoin.coin, editedCoin.symbol] : ["", ""]; // Define initial state outside of the component
  const [selectedCoin, setSelectedCoin] = useState(initialSelectedCoin);
  const imageState = id ? editedCoin.image : BitcoinImg;
  const [coinImage, setCoinImage] = useState(imageState);
  const initialAmount = id ? editedCoin.amount : "";
  const [amount, setAmount] = useState(initialAmount);
  const initialPurchaseTime = id ? editedCoin.purchaseTime.slice(11) : "";
  const [purchaseTime, setPurchaseTime] = useState(initialPurchaseTime);
  const initialPurchaseDate = id ? editedCoin.purchaseTime.slice(0,11) : "";
  const [purchaseDate, setPurchaseDate] = useState(initialPurchaseDate);
  const activeSaveBtn = amount !== "" && purchaseTime !== "" && purchaseDate !== "" && selectedCoin[0] !== "";
  const dispatch = useDispatch();
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const handleNotification = (message: string) => {
    dispatch(setNotification(message));
    dispatch(setShowNotification(""));
  };
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.id, coin.symbol]);
  };
  const toggleAmount = () => setInputAmount(!inputAmount);
  const getAmount = (amount: string) => setAmount(amount);
  const getPurchaseTime = (time: string) => setPurchaseTime(time);
  const getPurchaseDate = (date: string) => setPurchaseDate(date);
  const saveDataToLocalStorage = () => {
    const time = purchaseDate + "T" + purchaseTime;
    const newCoin = {
      coin: selectedCoin[0],
      symbol: selectedCoin[1],
      amount: amount,
      purchaseTime: time,
      image: coinImage,
      id: id ? id : uid(),
    };
    if(activeSaveBtn){
      handleNotification("Portfolio updated!");
      id ? setLocalStorage([...localStorage.filter((coin:Coin) => coin.id !== id), newCoin]) :
        setLocalStorage([...localStorage, newCoin]);
      toggleCoinSelect();
      onCoinAdded();
    }
  };
  const crossColor = darkmode ? "white" : "black";
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className="absolute left-[calc(50%-443px)] top-[12rem] p-[1px] group">
        <form className={clsx("m-auto w-[886px] h-[393px] z-50 p-[48px] rounded-[20px]",{
          "bg-cryptodark-400 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100 text-cryptoblue-900": !darkmode,
        })}>
          <div className="flex justify-between text-xl items-center">
            {id ? <p>Edit coin data</p> : <p>Select coins</p>}
            <svg 
              className="cursor-pointer" 
              onClick={toggleCoinSelect}
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={crossColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.17188 14.8299L14.8319 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8319 14.8299L9.17188 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex justify-between h-5/6 mt-8 pb-3">
            <div className={clsx(" w-[297px] pt-[66px] rounded",{
              "bg-cryptodark-350": darkmode,
              "bg-cryptoblue-200": !darkmode,
            })}>
              <div className={clsx("w-16 h-16 mx-auto rounded p-[14.5px] mb-2",{
                "bg-cryptodark-160" : darkmode,
                "bg-cryptoblue-100": !darkmode,
              })}>
                <Image src={coinImage} alt="coin-image" width={35} height={35} />
              </div>
              <p className="text-center text-2xl mt-4">{selectedCoin[0] ? capitalize(selectedCoin[0]) : "Your Coin"} ({selectedCoin[0]?selectedCoin[1]:"ABC"})</p>
            </div>
            <div className="w-[461px] text-base flex flex-col justify-between"> 
              {id ? <p className={clsx("w-full pl-4 pt-3 h-11 rounded-sm", {
                "bg-cryptoblue-200": !darkmode,
                "bg-cryptodark-200 text-cryptodark-510": darkmode,
              })}>{selectedCoin[0][0].toUpperCase()+selectedCoin[0].slice(1)}</p> : <Search handleCoin={handleCoin} />}
              <Amount visible={inputAmount} toggleVisible={toggleAmount} getAmount={getAmount} />
              <Date getTime={getPurchaseTime} getDate={getPurchaseDate} />
              <div className="flex justify-between mt-1">
                <SaveButton name="Cancel" handleClick={toggleCoinSelect} active={true} width="w-[calc(50%-8px)]" padding="py-1"/>
                <SaveButton name="Save and Continue" handleClick={saveDataToLocalStorage} active={activeSaveBtn} width="w-1/2" padding="py-1"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CoinSelect;