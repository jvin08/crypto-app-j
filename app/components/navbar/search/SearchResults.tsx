import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useGetSearchCoinsDataQuery } from "@/app/lib/marketSlice";
type Coin = {
    name: string;
    id: string;
    symbol: string;
    thumb: string;
};
const DropdownSearch = ({query, toggleHidden, clearSearch} : {query: string, toggleHidden: ()=>void, clearSearch: ()=>void}) => {
    const { data } = useGetSearchCoinsDataQuery(query);
    const coinsForRender = data?.coins.slice(0,10);
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
    <div className="w-[16.2rem] left-0 top-10 text-cryptodark-100 bg-cryptodark-200 absolute z-50 rounded py-3" ref={ref}>
        {coinsForRender?.map((coin: Coin) => {
            return (
                <div key={coin.id} className="flex items-center pl-10 pb-3">
                    <Image src={coin.thumb} alt={coin.name} width={20} height={20} className="mr-4"/>
                    <p>{coin.name}</p>
                </div>
            );
        })}
    </div>
  );
};
export default DropdownSearch;