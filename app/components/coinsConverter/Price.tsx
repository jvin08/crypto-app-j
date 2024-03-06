import React from "react";
const Price = ({price, currency}:{price:number, currency: any}) => {
  return (
    <>
      <p className="text-xs mt-4 font-thin">1 {currency.label} = {currency.sign}{price}</p>
    </>
  );
};
export default Price;