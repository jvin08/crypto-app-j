import React from "react";
import Loading from "./Loading";

const Volume = ({ quantity, isLoading }: {quantity: number, isLoading: boolean}) => {
  return (
    <div className="flex items-center ml-10">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill="#01F1E3" fillOpacity={1}/>
      </svg>
      {isLoading ? <Loading /> : <p className="ml-1">{quantity + ""}</p> }
      <p>T</p>
    </div>
  );
};
export default Volume;
