import React from "react";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
import { HeaderProps, ParagraphProps } from "@/app/types/types";
import ColumnName from "./ColumnName";

const Header = ({handleSort, sort, order}:HeaderProps) => {
  const darkmode = useSelector(selectDarkmode);
  const paragraphProps: ParagraphProps = [
    { name: "market_cap", text: "#", style: "ml-2 mr-5 cursor-pointer"},
    { name: "id", text: "Name", style: "w-16 ml-10 cursor-pointer"},
    { name: "current_price", text: "Price", style: "w-16 text-center ml-auto mr-4 cursor-pointer"},
    { name: "price_change_percentage_1h_in_currency", text: "1h%", style: "w-16 text-center mr-2 cursor-pointer"},
    { name: "price_change_percentage_24h_in_currency", text: "24h%", style: "w-16 text-center ml-2 cursor-pointer"},
    { name: "price_change_percentage_7d_in_currency", text: "7d%", style: "w-16 text-center mr-10 cursor-pointer"},
    { name: "volume", text: " 24hVolume / Market Cap", style: "w-1/5 cursor-pointer"},
    { name: "circulating_supply", text: " Circulating / Total Supply", style: "w-1/5 cursor-pointer"},
  ];
  const opacity = "opacity-0 hover:opacity-100";
  const visible = "opacity-100";
  return (
    <div className={clsx("mt-[86px] sticky z-[1] top-[144px]")} onClick={handleSort}>
      <div className={clsx("flex justify-between pl-2 pr-7 py-2 text-xs",{
        "text-cryptodark-550 bg-cryptodark-400": darkmode,
        "text-cryptodark-400 bg-cryptoblue-350": !darkmode,
      })}>
        <div className="w-1/2 flex justify-between">
          {paragraphProps.slice(0,6).map((props) => (
            <ColumnName key={props.name} props={props} sort={sort} order={order} visible={visible} opacity={opacity} />
          ))}
        </div>
        {paragraphProps.slice(6).map((props) => (
          <ColumnName key={props.name} props={props} sort={sort} order={order} visible={visible} opacity={opacity} />
        ))}
        <p className="text-center mr-10">Last 7d</p>
      </div>
    </div>
  );
};
export default Header;
