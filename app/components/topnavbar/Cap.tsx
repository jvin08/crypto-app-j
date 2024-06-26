import React from "react";
import StatusBar from "./StatusBar";
import Loading from "./Loading";

const Cap = ({ quantity, percentage, isLoading }: {quantity: number, percentage: number, isLoading: boolean}) => {
  return (
    <div className="flex items-center ml-10">
      <p className="ml-2">$</p>
      {isLoading ? <Loading /> : <p className="ml-1">{quantity}B</p> }
      <StatusBar quantity={percentage}/>
    </div>
  );
};
export default Cap;