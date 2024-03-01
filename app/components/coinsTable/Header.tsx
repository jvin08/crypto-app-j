import React from "react";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
const Header = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("mt-20 mb-3")}>
      <div className={clsx("flex justify-between px-7 text-xs",{
        "text-cryptodark-550": darkmode,
      })}>
        <div className="w-1/2 flex justify-between">
          <p className="mr-5">#</p>
          <p className="w-16 ml-10">Name</p>
          <p className="w-16 text-center ml-auto mr-4">Price</p>
          <p className="w-16 text-center mr-2">1h%</p>
          <p className="w-16 text-center mr-4">24h%</p>
          <p className="w-16 text-center mr-6">7d%</p>
        </div>
        <p className="w-1/5">24hVolume / Market Cap</p>
        <p className="w-1/5">Circulating / Total Supply</p>
        <p className="text-center">Last 7d</p>
      </div>
    </div>
  );
};
export default Header;
