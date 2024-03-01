"use client";
import React from "react";
import ButtonsBox from "./components/coinsConvertor/ButtonsBox";
import Compare from "./components/compare/Compare";
import Carousel from "./components/carousel/Carousel";
import ChartBox from "./components/charts/ChartBox";
import CoinsTable from "./components/coinsTable/CoinsTable";
import Head from "next/head";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "./lib/dynamicValuesSlice";
const Home = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("w-full pt-9 px-12", {
      "bg-cryptoblue-400": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <Head>
        <title>crypto-app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ButtonsBox />
      <Compare />
      <Carousel />
      <ChartBox />
      <CoinsTable />
    </div>
  );
};
export default Home;
