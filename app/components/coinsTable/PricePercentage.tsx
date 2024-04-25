import React from "react";
import clsx from "clsx";

const PricePercentage = ({price} : {price: number}) => {
  const isPositive = (number:number) => {
    return number > 0 ? true : false;
  };
  return (
    <div className="flex text-left w-16 items-center ml-2">
      <svg transform={isPositive(price) ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={isPositive(price) ? "#00B1A7" : "red"} fillOpacity={1}/>
      </svg>
      <p className={clsx("",{
        "text-cryptoblue-650": isPositive(price),
        "text-cryptoblue-750": !isPositive(price),
      })}>{Math.abs(Number(price?.toFixed(2))) + "%"}</p>   
    </div>
  );
};
export default PricePercentage;
