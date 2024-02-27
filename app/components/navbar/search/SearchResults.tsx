import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGetSearchCoinsDataQuery, useGetTenCoinsPricesQuery } from "@/app/lib/marketSlice";
import { selectCurrency, selectDarkmode} from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import { useSelector } from "react-redux";
type Coin = {
    name: string;
    id: string;
    symbol: string;
    thumb: string;
};
const DropdownSearch = ({query, toggleHidden, clearSearch} : {query: string, toggleHidden: ()=>void, clearSearch: ()=>void}) => {
    const currency = useSelector(selectCurrency);
    const darkmode = useSelector(selectDarkmode);
    const { data } = useGetSearchCoinsDataQuery(query);
    const coinsForRender = data?.coins.slice(0,10);
    const queryTenCoins = coinsForRender?.map((coin: Coin) => coin.id).join("%2C");
    const { data: prices } = useGetTenCoinsPricesQuery(queryTenCoins, currency);
    const pricesStore = {} as {[key: string]: [number, boolean]};
    prices && Object.entries(prices).map((price) => {
        const goingUp = prices[price[0]][`${currency.label.toLowerCase()}_24h_change`] > 0;
        pricesStore[price[0]] = [prices[price[0]][currency.label.toLowerCase()], goingUp];
    });
    const ref = useRef<HTMLDivElement>(null);
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
    <div className={clsx("box-border text-sm w-[14.62rem] left-0 top-10 border-cryptodark-800 border-[0.01rem] absolute z-50 rounded",{
        "bg-cryptoblue-100 text-cryptoblue-500": !darkmode,
        "bg-cryptodark-200 text-cryptodark-100": darkmode,
    })} ref={ref}>
        {coinsForRender?.map((coin: Coin) => {
            const priceGoingUp = pricesStore[coin.id]?.[1];
            return (
                <div key={coin.id} className="first:pt-2 p-1">
                    <div className={clsx("flex items-center pl-3 py-1 hover:rounded-sm",{
                        "bg-cryptoblue-100 hover:bg-cryptoblue-400": !darkmode,
                        "hover:bg-cryptodark-300": darkmode,
                    })}>
                        {coin.thumb.includes("https") && <Image src={coin.thumb} alt={coin.name} width={20} height={20} className="mr-3"/>}
                        <p className="truncate pr-4">{coin.name}</p>
                        <svg className="ml-auto mr-0" transform={priceGoingUp ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={priceGoingUp ? "#00B1A7" : "#FE2264"} fillOpacity={1}/>
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