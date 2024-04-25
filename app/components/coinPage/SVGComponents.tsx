import React from "react";
import { isPositive } from "./utils";

export const Triangle = ({color, angle}:{color: string,angle:string}) => {
  return (
    <>
      <svg transform={`rotate(${angle})`} width="24" height="24" viewBox="0 2 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={color} fillOpacity={1}/>
      </svg>
    </>
  );
};
export const SmallTriangle = ({percentage}:{percentage:number}) => {
  return (
    <>
      <svg transform={isPositive(percentage) ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={isPositive(percentage) ? "#00B1A7" : "#FE2264"} fillOpacity={1}/>
      </svg>
    </>
  );
};
export const Squares = ({darkmode}:{darkmode: boolean}) => {
  const color = darkmode ? "white" : "black";
  return (
    <svg className="ml-3" width="20" height="20" viewBox="0 -1 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
        <path d="M12 9.675V12.825C12 15.45 10.95 16.5 8.325 16.5H5.175C2.55 16.5 1.5 15.45 1.5 12.825V9.675C1.5 7.05 2.55 6 5.175 6H8.325C10.95 6 12 7.05 12 9.675Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 5.175V8.325C16.5 10.95 15.45 12 12.825 12H12V9.675C12 7.05 10.95 6 8.325 6H6V5.175C6 2.55 7.05 1.5 9.675 1.5H12.825C15.45 1.5 16.5 2.55 16.5 5.175Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};
export const Bullet = () => {
  return (
    <div className="mr-3 rounded-full p-[1.5px] shadow-[0_0_14px_5px_rgba(255,255,255,0.1)] bg-gradient-to-t from-cryptodark-750 to-cryptoblue-800">
      <div className="flex w-[1.1rem] h-[1.1rem] rounded-full bg-cryptoblue-810">
        <svg className="m-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 12V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};