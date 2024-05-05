import React from "react";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../../lib/dynamicValuesSlice";
import { HeaderProps, ParagraphProps } from "@/app/types/types";

const Header = ({handleSort}:HeaderProps) => {
  const darkmode = useSelector(selectDarkmode);
  const paragraphProps: ParagraphProps = [
    { name: "rank", text: "#", style: "mr-5 cursor-pointer"},
    { name: "symbol", text: "Name", style: "w-16 ml-10 cursor-pointer"},
    { name: "price", text: "Price", style: "w-16 text-center ml-auto mr-4 cursor-pointer"},
    { name: "oneHour", text: "1h%", style: "w-16 text-center mr-2 cursor-pointer"},
    { name: "twentyFourHour", text: "24h%", style: "w-16 text-center mr-2 cursor-pointer"},
    { name: "sevenDay", text: "7d%", style: "w-16 text-center mr-10 cursor-pointer"}
  ];
  //&#9650; arrow up
  const opacity = "opacity-0 hover:opacity-100";
  const pointer = "cursor-pointer";
  return (
    <div className={clsx("mt-[88px] z-50 sticky top-[144px]")} onClick={handleSort}>
      <div className={clsx("flex justify-between pl-2 pr-7 py-2 text-xs",{
        "text-cryptodark-550 bg-cryptodark-400": darkmode,
        "text-cryptodark-400 bg-cryptoblue-350": !darkmode,
      })}>
        <div className="w-1/2 flex justify-between">
          {paragraphProps.map((props) => (
            <p key={props.name} className={props.style}><span className={opacity} data-name={props.name}>&#9660;</span> {props.text}</p>
          ))}
        </div>
        <p className="w-1/5"><span className={`${opacity} ${pointer}`} data-name="volume">&#9660;</span> 24hVolume / Market Cap</p>
        <p className="w-1/5"><span className={`${opacity} ${pointer}`} data-name="circulatingSupply">&#9660;</span> Circulating / Total Supply</p>
        <p className="text-center mr-10">Last 7d</p>
      </div>
    </div>
  );
};
export default Header;
