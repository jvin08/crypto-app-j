import React, {useState} from "react";
import clsx from "clsx";
import Image from "next/image";
import Price from "./Price";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery } from "@/app/lib/marketSlice";
const CoinInput = ({header="You buy", darkmode, coin}: {header: string, darkmode: boolean, coin: string[]}) => {
  const [inputValue, setInputValue] = useState("");
  const currency = useSelector(selectCurrency);
  const queryPart = `${coin[0]}`;
  const { data } = useGetOneCoinDataQuery(queryPart);
  const coinPrice = data?.market_data?.current_price[currency.label.toLowerCase()];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(!isNaN(Number(e.target.value))) setInputValue(e.target.value);
  };
  return (
    <div className={clsx("p-3 pb-6 w-1/2 rounded-md",{
      "text-cryptoblue-100 bg-cryptoblue-100": !darkmode,
      "text-cryptodark-100 bg-cryptodark-350": darkmode,
    })}>
      <p className="text-xs font-thin text-cryptodark-110">{header}</p>
      <div className={clsx("flex items-center pb-2 pt-8",{
        "border-b-[1px] border-cryptoblue-200": !darkmode,
        "border-b-[1px] border-cryptodark-100": darkmode,
      })}>
        <div className="flex items-center w-10 h-10">
          <Image className="m-auto" src={data?.image?.thumb} alt={coin[0]} width={30} height={30} />
        </div>
        <p>{coin[0][0]?.toUpperCase() + coin[0].slice(1)}</p>
        <p className="ml-1">({coin[1]?.toUpperCase()})</p>
        <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z" fill="white"/>
        </svg>
        <input type="text" value={inputValue} onChange={handleChange} className="bg-cryptodark-350 focus:outline-none ml-auto w-36 pl-auto text-right" placeholder="e.g. 1.00"/>
      </div>
      <Price price={coinPrice} currency={currency} />
    </div>
  );
};
export default CoinInput;