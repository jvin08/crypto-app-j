import React from "react";
import clsx from "clsx";
import { ToolTipCoinCard } from "../coinPortfolioItem/ToolTip";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";  
import { useLocalStorage } from "../portfolioModal/hooks";
import { BackgroundGradient } from "../coinPortfolioItem/BackgroundGradient";

const DeleteModal = ({toggleDeleteModal, gain, handleCoinAdded}:{toggleDeleteModal: any, gain: string[], handleCoinAdded: ()=>void}) => {
  const [storedValue, setValue] = useLocalStorage();
  const deleteCoinFromLocalStorage = (id: string) => {
    setValue(storedValue.filter((coin:any) => coin.id !== id));
    handleCoinAdded();
    toggleDeleteModal();
  };
  const darkmode = useSelector(selectDarkmode);
  const gainText = Number(gain[0]) > 0 ? "Gain" : "Loss";
  const gainColor = Number(gain[0]) > 0 ? "text-cryptoblue-650" : "text-cryptoblue-750";
  const crossColor = darkmode ? "white" : "black";
  return (
    <div className="fixed top-0 left-0 z-10 flex bg-cryptodark-900 bg-opacity-45 backdrop-blur-[1px] w-full h-full">
      <BackgroundGradient  animate={true} outerStyle="absolute left-[calc(50%-15rem)] top-[12rem] p-[1px] group" rounded="rounded-lg">
        <div className={clsx("m-auto w-[30rem] h-1/4 z-50 p-8 rounded-lg",{
          "bg-cryptodark-400 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex justify-between pb-6 border-b-[1px]">
            <p>Sell coins:</p>
            <svg 
              className="cursor-pointer" 
              onClick={toggleDeleteModal}
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={crossColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.17188 14.8299L14.8319 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8319 14.8299L9.17188 9.16992" stroke={crossColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center justify-evenly mt-5">
            <p>Confirm selling {gain[1]} with <span className={gainColor}>{gainText} {gain[0]}</span></p>
            <div className={clsx("pt-1 pl-1 w-[30px] h-[30px] rounded-sm cursor-pointer",{
              "bg-[#3A3978] hover:border-cryptoblue-800 hover:border-[1px] box-border" : darkmode,
              "bg-cryptoblue-800" : !darkmode,
            })} onClick={()=>deleteCoinFromLocalStorage(gain[2])}>
              <ToolTipCoinCard name="Sell coin" eventHandler={()=>{}} />
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};
export default DeleteModal;