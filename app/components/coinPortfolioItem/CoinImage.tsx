import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import { CardContainer, CardBody, CardItem } from "./CoinImageWrapper";
import { capitalize } from "./utils";
const CoinImage = ({data}:{data:any}) => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <CardContainer className={clsx("w-40 m-8 rounded-2xl font-bold text-xl text-center", {
      "bg-cryptodark-300": darkmode,
      "bg-cryptoblue-100": !darkmode,
    })}>
      <CardBody className={clsx("w-40 h-48 flex flex-col justify-center items-center",{
        "bg-cryptodark-300": darkmode,
        "bg-cryptoblue-100": !darkmode,
      })}>
        <CardItem translateZ="100" className={clsx("w-16 h-16 pl-4 pt-4 mb-4 rounded-[15px]",{
          "bg-cryptodark-160": darkmode,
          "bg-cryptoblue-200": !darkmode,
        })}>
          <Image src={data.image} width={30} height={30} alt="coin" />
        </CardItem>
        <CardItem
          as="p"
          translateZ="60">{capitalize(data.coin)} ({data.symbol})</CardItem>
      </CardBody>
    </CardContainer>
  );
};
export default CoinImage;