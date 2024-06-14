import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { Squares } from "./SVGComponents";
import useWindowWidth from "../hooks/hooks"; 

type Coin = {
  links: {blockchain_site:string[]}
}
const Links = ({data}:{data:Coin}) => {
  const darkmode = useSelector(selectDarkmode);
  const width = useWindowWidth();
  const isMobile = width < 481;
  return (
    <div className="flex flex-wrap max-w-full text-xs">
      {data?.links?.blockchain_site?.slice(0,3)?.map((link:string, idx:number) => 
        <Link 
          href={link} 
          key={idx} 
          className={clsx("mr-3 mb-3 flex items-center p-3 px-4 rounded-xl text-base",{
            "bg-cryptodark-300" : darkmode,
            "bg-cryptoblue-100": !darkmode,
          })}>{isMobile ? link.slice(0,30) + "..." : link.slice(0,-1)}<Squares darkmode={darkmode} /></Link>)}
    </div>
  );
};
export default Links;