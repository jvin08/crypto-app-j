import React from "react";
import StatusBar from "./StatusBar";
import Image from "next/image";
import Loading from "./Loading";
const SecondCoin = ({ quantity, isLoading }: {quantity: number, isLoading: boolean}) => {
  const ethIMG = "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628";
  return (
    <div className="flex items-center ml-10">
      <Image
        src={ethIMG}
        width={20}
        height={20}
        alt="Picture of the coin"
        className="border-cryptoblue-100"
      />
      {isLoading ? <Loading /> : <p className="ml-2">{quantity}%</p> }
      <StatusBar quantity={quantity} />
    </div>
  );
};
export default SecondCoin;
