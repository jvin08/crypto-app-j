"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, selectCurrency, selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { useClickOutside } from "../../portfolioModal/hooks";
import clsx from "clsx";

const currencies = [
  {
    id:1, 
    label: "USD", 
    sign: "$"
  },
  {
    id:2, 
    label: "GBP", 
    sign: "£"
  },
  {
    id:3, 
    label: "EUR", 
    sign: "€"
  },
  {
    id:4, 
    label: "BTC", 
    sign: "₿"
  },
  {
    id:5, 
    label: "ETH", 
    sign: "Ξ"
  },
];
const Dropdown = () => {
  const [hidden, setHidden] = useState("hidden");
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const darkmode = useSelector(selectDarkmode);
  const dropDownRef = useClickOutside(() => {
    setHidden("hidden");
  });
  const handleClick = (id: number) => {
    dispatch(setCurrency(currencies[id-1]));
  };
  const toggleHidden = () => {
    setHidden(prev => prev==="hidden" ? "" : "hidden");
  };
  return (
    <div className="relative ml-5 text-xs" onClick={toggleHidden}>
      <div className={clsx("flex items-center h-12 w-[108px] rounded-md px-4", {
        "bg-cryptodark-200 border-cryptodark-170 border-[1px]": darkmode,
        "bg-cryptoblue-200": !darkmode,
      })}>
        <p className={clsx("pl-[5px] pt-0.5 rounded-full w-5 h-5 font-bold", {
          "bg-cryptodark-100": darkmode,
          "text-cryptoblue-900": darkmode,
          "bg-cryptoblue-900": !darkmode,
          "text-cryptodark-100": !darkmode,
        })}>{currency.sign}</p>
        <p className={clsx("mx-2.5", {
          "text-cryptoblue-900": !darkmode,
          "text-cryptodark-100": darkmode,
        })}>{currency.label}</p>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.99976 4.50024L5.99988 7.50012L3 4.5" 
            stroke={darkmode ? "#FFFFFF" : "#4B5563"} 
            strokeOpacity={1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <ul ref={dropDownRef} className={clsx(`absolute left-0 top-0 rounded-md p-1 ${hidden} w-[108px]`, {
        "bg-cryptodark-200 border-[1px] border-cryptodark-170": darkmode,
        "bg-cryptoblue-200": !darkmode,
      })}>
        {currencies.map((c)=>{
          return <li key={c.id} onClick={()=>handleClick(c.id)} 
            className={clsx("rounded-md p-2 cursor-pointer flex justify-center", {
              "hover:bg-cryptoblue-900 hover:text-cryptoblue-100": !darkmode,
              "hover:bg-cryptodark-400": darkmode,
            })}>
            <div className="flex justify-end">
              {c.label === currency.label && <p>✓</p>}
              <p id={c.label} className="ml-1">{c.label}</p>
            </div>
          </li>;
        })}   
      </ul>     
    </div>
  );
};
export default Dropdown;
