import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Price from "./Price";
import Search from "./Search";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/app/lib/dynamicValuesSlice";

const CoinInput = ({header="You buy", darkmode, coin, price, image, inputValue, handleChange, margin }: {header: string, darkmode: boolean, coin: string[], price: number, image: string, inputValue:number, margin: string, handleChange: any }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const currency = useSelector(selectCurrency);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className={clsx(`${margin} p-6 sm:p-4 h-[200px] sm:h-[158px] w-1/2 sm:w-full sm:mt-6 rounded-xl`,{
      "text-cryptoblue-900 bg-cryptoblue-100": !darkmode,
      "text-cryptodark-100 bg-cryptodark-350": darkmode,
    })}>
      <p className={clsx("text-xs",{
        "text-cryptodark-350 font-normal": !darkmode,
        "text-cryptodark-110 font-thin": darkmode,
      })}>{header}</p>
      <div className={clsx("flex items-center justify-between pb-4 pt-8 sm:pt-7",{
        "border-b-[1px] border-cryptoblue-900": !darkmode,
        "border-b-[1px] border-cryptodark-100": darkmode,
      })}>
        {!showSearch ? <div className="flex items-center">
          <div className="flex items-center w-10 h-10">
            {image && <Image src={image} alt="coin" width={30} height={30} />}
          </div>
          <p>{coin[0][0]?.toUpperCase() + coin[0].slice(1)}</p>
          <p className="ml-1">({coin[1]?.toUpperCase()})</p>
          <svg 
            className="cursor-pointer" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSearch}
          >
            <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" 
              fill={clsx("",{
                "white": darkmode,
                "#3D3D7E": !darkmode,
              })}
            />
          </svg>
        </div> : <Search toggleSearch={toggleSearch} coin={header} />}
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          className={clsx("focus:outline-none w-28 sm:w-[68px] pl-auto text-right",{
            "bg-cryptodark-350": darkmode,
            "bg-cryptoblue-100": !darkmode,
          })} placeholder="e.g. 1.00"/>
      </div>
      <Price price={price} currency={currency} darkMode={darkmode} coin={coin}/>
    </div>
  );
};
export default CoinInput;