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
const Navbar = () => {
  const darkmode = useSelector(selectDarkmode);    
  return (
    <div className={clsx("z-[1] w-full mt-[44px] fixed flex items-center justify-between px-12 pt-2 pb-4", {
      "bg-cryptoblue-100": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <LogoFull />
      <div className="flex items-center justify-between">
        <Home />
        <Portfolio />
      </div>
      <div className="flex items-center justify-between">
        <Search />
        <Dropdown />
        <Theme />
      </div>
    </div>
  );
};
export default Navbar;
