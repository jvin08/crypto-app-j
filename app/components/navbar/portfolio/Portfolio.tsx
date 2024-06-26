"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkmode, setNotification, setShowNotification } from "@/app/lib/dynamicValuesSlice";
import { usePathname } from "next/navigation";
import { Icon, SmallIcon } from "./Icon";
import useWindowWidth from "../../hooks/hooks";

const Portfolio = () => {
  const darkmode = useSelector(selectDarkmode);
  const pathname = usePathname();
  const active = pathname === "/portfolio";
  const dispatch = useDispatch();
  const handleNotification = (message: string) => {
    dispatch(setNotification(message));
    dispatch(setShowNotification(""));
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 481;
  if (!isClient) {
    return <div className="text-xs h-8 w-8 rounded-md p-[1px] bg-cryptodark-510">Loading...</div>;
  }
  return (isMobile ?
    (active ? <div className={clsx("h-8 w-8 rounded-md p-[1px]", {
      "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": !darkmode,
      "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800 shadow-2xl shadow-cryptoblue-800": darkmode,
    })}>
      <div  className={clsx("text-sm w-full h-full rounded-[5px] flex",{
        "bg-cryptodark-750": darkmode,
        "bg-cryptoblue-600 text-cryptoblue-100": !darkmode,
      })}>
        <div className="m-auto">
          <SmallIcon active={active} darkmode={darkmode} />
        </div>
      </div>
    </div> : <Link 
      href="/portfolio" 
      onClick={()=>handleNotification("Portfolio page opened")} 
      className={clsx("text-sm flex justify-center items-center h-8 w-[100px] rounded-md",{
        "bg-cryptodark-150": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
      <div className="ml-auto mr-2">
        <SmallIcon active={active} darkmode={darkmode} />
      </div>
      <p className="mr-auto">Portfolio</p>
    </Link>)
    : <div className="flex items-center ml-20 sm:hidden">
      <Icon active={active} darkmode={darkmode} />
      <Link className={clsx("ml-2.5 text-sm",{
        "text-cryptoblue-900" : active && !darkmode,
        "text-cryptoblue-500" : !active,
        "text-cryptodark-100" : active && darkmode,
      })} href="/portfolio" onClick={()=>handleNotification("Portfolio page opened")}>Portfolio</Link>
    </div>
  );
};
export default Portfolio;
