import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useGetSearchCoinsDataQuery, useGetTenCoinsPricesQuery } from "@/app/lib/marketSlice";
import { selectDarkmode, selectCoinOneSymbol, setCoinOneSymbol, setCoinTwoSymbol, selectCurrency } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
type Coin = {
  name: string;
  id: string;
  symbol: string;
  thumb: string;
};
const DropdownSearch = ({
  query, 
  toggleHidden, 
  clearSearch, 
  index,
  keyEnterPressed,
} : { 
    query: string, 
    toggleHidden: ()=>void, 
    clearSearch: ()=>void, 
    index: number,
    keyEnterPressed: boolean,
  }) => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const { data } = useGetSearchCoinsDataQuery(query);
  const darkmode = useSelector(selectDarkmode);
  const coinOne = useSelector(selectCoinOneSymbol);
  const coinsForRender = data?.coins.slice(0,10);
  const queryTenCoins = coinsForRender?.map((coin: Coin) => coin.id).join("%2C");
  const { data: prices } = useGetTenCoinsPricesQuery(queryTenCoins, currency);
  const pricesStore = {} as {[key: string]: [number, boolean, string]};
  prices && Object.entries(prices).map((price) => {
    const coinSymbol = data?.coins.filter((coin: Coin) => coin.id === price[0])[0]?.symbol;
    const goingUp = prices[price[0]][`${currency.label.toLowerCase()}_24h_change`] > 0;
    pricesStore[price[0]] = [prices[price[0]][currency.label.toLowerCase()], goingUp, coinSymbol];
  });
  const newIndex = index % coinsForRender?.length; 
  if(keyEnterPressed && prices){
    // dispatch(setCoinOneSymbol([coinsForRender[newIndex]?.id, coinsForRender[newIndex]?.symbol]));
    // dispatch(setCoinTwoSymbol(coinOne));
  }
  const ref = useRef<HTMLDivElement>(null);
  const handleClickCoin = (e: React.MouseEvent<HTMLDivElement>, coin: Coin) => {
    e.preventDefault();
    dispatch(setCoinOneSymbol([coin.id, coin.symbol]));
    dispatch(setCoinTwoSymbol(coinOne));
    toggleHidden();
    clearSearch();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleHidden();
        clearSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[toggleHidden, clearSearch]);
  return (
    <div className={clsx("box-border text-sm w-72 left-0 top-10 border-cryptodark-800 border-[0.01rem] absolute z-50 rounded",{
      "bg-cryptoblue-100 text-cryptoblue-500": !darkmode,
      "bg-cryptodark-200 text-cryptodark-100": darkmode,
    })} ref={ref}>
      {coinsForRender?.map((coin: Coin, idx: number) => {
        const priceGoingUp = pricesStore[coin.id]?.[1];
        return (
          <div key={coin.id} className="first:pt-2 p-1">
            <div 
              className={clsx("flex items-center pl-3 py-1 hover:rounded-sm",{
                "bg-cryptoblue-100 hover:bg-cryptoblue-400": !darkmode,
                "hover:bg-cryptodark-400": darkmode,
                "bg-cryptodark-400": idx === newIndex && darkmode,
              })}
              onClick={(e:React.MouseEvent<HTMLDivElement>)=>handleClickCoin(e, coin)} 
              tabIndex={0}
            >
              {coin.thumb.includes("https") && <Image src={coin.thumb} alt={coin.name} width={20} height={20} className="mr-3"/>}
              <p className="truncate pr-4">{coin.name}</p>
              <svg className="ml-auto mr-0" transform={priceGoingUp ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={priceGoingUp ? "#00B1A7" : "red"} fillOpacity={1}/>
              </svg>
              <p className={clsx("ml-1 mr-2 text-[0.65rem]",{
                "text-cryptoblue-650": priceGoingUp,
                "text-cryptoblue-750": !priceGoingUp,
              })}>{pricesStore[coin.id]?.[0]?.toFixed(3)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DropdownSearch;