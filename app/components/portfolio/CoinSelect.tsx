import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import SaveButton from "./SaveButton";
import Search from "./Search";
import Amount from "./Amount";
import Date from "./Date";
const CoinSelect = ({toggleCoinSelect}: {toggleCoinSelect: ()=>void}) => {
  const btcIMG = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400";
  const darkmode = useSelector(selectDarkmode);
  const [inputAmount, setInputAmount] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState(["Bitcoin","BTC"]);
  const [coinImage, setCoinImage] = React.useState(btcIMG);
  const handleCoin = (coin: any) => {
    setCoinImage(coin.thumb);
    setSelectedCoin([coin.name, coin.symbol]);
  };
  const toggleAmount = () => {
    setInputAmount(!inputAmount);
  };
  return (
    <div className="absolute top-0 left-0 flex bg-cryptodark-900 bg-opacity-65 backdrop-blur-[1px] w-full h-full">
      <div className={clsx("m-auto w-1/2 h-2/5 z-50 p-8 rounded-lg",{
        "bg-cryptodark-400": darkmode,
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
          <div className="bg-cryptodark-350 w-[30%] flex-col pt-12 rounded">
            <div className="bg-cryptodark-160 w-12 h-12 mx-auto rounded p-3 mb-2">
              <Image src={coinImage} alt="coin-image" width={30} height={30} />
            </div>
            <p className="text-center">{selectedCoin[0]} ({selectedCoin[1]})</p>
          </div>
          <div className="w-[67%] text-xs flex flex-col justify-between"> 
            <Search handleCoin={handleCoin} />
            <Amount visible={inputAmount} toggleVisible={toggleAmount} />
            <Date />
            <div className="flex justify-between mt-1">
              <SaveButton name="Cancel" handleClick={toggleCoinSelect} active={false} width="w-[calc(50%-8px)]" padding="py-1"/>
              <SaveButton name="Save and Continue" handleClick={toggleCoinSelect} active={true} width="w-1/2" padding="py-1"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinSelect;