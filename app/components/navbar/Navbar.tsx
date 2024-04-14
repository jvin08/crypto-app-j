"use client";
import React from "react";
import  LogoFull  from "./logo/logoFull";
import  Home from "./home/Home";
import Portfolio from "./portfolio/Portfolio";
import Search from "./search/Search";
import Dropdown from "./dropdown/Dropdown";
import Theme from "./themeBtn/Theme";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
const Navbar = ({handleDarkMode}:{handleDarkMode: any}) => {
  const darkmode = useSelector(selectDarkmode);    
  return (
    <div className={clsx("z-[1] w-full mt-[56px] flex fixed px-[58px] pt-6 pb-4", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <div className="w-[1296px] mx-auto flex items-center justify-between ">
        <LogoFull />
        <div className="flex items-center justify-between">
          <Home />
          <Portfolio />
        </div>
        <div className="flex items-center justify-between">
          <Search />
          <Dropdown />
          <Theme handleDarkMode={handleDarkMode} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
