import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoadingSearch from "./LoadingSearch";
import { useGetSearchCoinsDataQuery } from "@/app/lib/marketSlice";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useClickOutside } from "../../portfolioModal/hooks";
import clsx from "clsx";
import path from "path";
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
  handleCoin
} : { 
    query: string, 
    toggleHidden: ()=>void, 
    clearSearch: ()=>void, 
    index: number,
    handleCoin: any
  }) => {
  const { data, isLoading } = useGetSearchCoinsDataQuery(query);
  const darkmode = useSelector(selectDarkmode);
  const coinsForRender = data?.coins.slice(0,10);
  const newIndex = index % coinsForRender?.length; 
  const itemRef = useRef<HTMLDivElement>(null);
  const closeDropdownMenu = () => {
    toggleHidden();
    clearSearch();
  };
  useEffect(() => {
    if(itemRef.current){
      handleCoin(data?.coins[newIndex]?.id, data?.coins[newIndex]?.symbol);
    }
  },[newIndex, data]);
  const dropDownRef = useClickOutside(()=>{
    closeDropdownMenu();
  });
  return (
    coinsForRender?.length === 0 || isLoading ? <LoadingSearch closeLoader={closeDropdownMenu} />
      : <div className={clsx("box-border text-sm w-72 left-0 top-[47px] absolute z-50 rounded-b-md",{
        "bg-cryptoblue-200 text-cryptoblue-500": !darkmode,
        "bg-gradient-to-r from-cryptodark-200 to-dark-140 text-cryptodark-100 border-cryptodark-170 border-[1px]": darkmode,
      })} ref={dropDownRef}>
        {coinsForRender?.map((coin: Coin, idx: number) => {
          return (
            <Link href={path.join("/coin", coin.id) + "market"} key={coin.id}>
              <div className="first:pt-2 p-1">
                <div 
                  className={clsx("flex items-center pl-3 py-1 rounded-md hover:rounded-md",{
                    "hover:bg-cryptodark-400": darkmode,
                    "hover:bg-cryptodark-100": !darkmode,
                    "bg-cryptodark-400": idx === newIndex && darkmode,
                    "bg-cryptoblue-100": idx === newIndex && !darkmode,
                  })}
                  tabIndex={0}
                  ref={idx === newIndex ? itemRef : null}
                  onClick={closeDropdownMenu}
                >
                  <p className="truncate pl-7">{coin.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
  );
};
export default DropdownSearch;