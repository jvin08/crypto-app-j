import React from "react";
import StatusBar from "./StatusBar";
import Image from "next/image";
const FirstCoin = ({ quantity, isLoading }: {quantity: number, isLoading: boolean}) => {
    const btcIMG = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400";
  return (
    <div className="flex items-center ml-10">
      <Image
      src={btcIMG}
      width={20}
      height={20}
      alt="Picture of the coin"
    />
       {isLoading ? <div className="loading"></div> : <p className="ml-2">{quantity}%</p> }
      <StatusBar quantity={quantity} />
    </div>
  );
};
export default FirstCoin;