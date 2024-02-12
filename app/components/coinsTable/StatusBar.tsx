import React from "react";
import { useSelector } from "react-redux";
import { selectCurrency } from "../../lib/dynamicValuesSlice";
export const colors = ["#FFA500", "#6374C3", "#00B1A7", "#FFA500", "#FFD700", "#6374C3", "#00B1A7", "#FF6347", "#FF0000", "#FFD700"];
const StatusBar = ({ unitOne, unitTwo, index }: {unitOne: number, unitTwo: number, index: number}) => {
  const sign = useSelector(selectCurrency).sign;
  const coinColor = colors[index % 10];
  const Volume = (unitOne / Math.pow(10, 9)).toFixed(2);
  const UnitTwo = (unitTwo / Math.pow(10, 9)).toFixed(2);
  const status = ((Number(Volume) / Number(UnitTwo)) * 10).toFixed(2);
  const statusSize = Number(status) > 10 ? "10rem" : status + "rem";
  return (
    <div className="w-1/5 ml-5">
      <p className="flex justify-between w-full" style={{color: coinColor}}><span>●{sign}{Volume}B</span><span>●{sign}{UnitTwo}B</span></p>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 rounded-sm px-px"style={{background: coinColor, opacity: 0.4}}></div>
        <div className="top-0 left-0 h-1 rounded-sm z-50 px-px" style={{width: statusSize, background: coinColor}}></div>
      </div>
    </div>
  );
};
export default StatusBar;
