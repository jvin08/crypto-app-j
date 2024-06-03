"use client";
import React from "react";
import ButtonsBox from "./components/coinsConverter/ButtonsBox";
import Compare from "./components/compare/Compare";
import Carousel from "./components/carousel/Carousel";
import { Charts } from "./components/charts/Charts";
import ChartBox from "./components/charts/ChartBox";
import CoinsTable from "./components/coinsTable/CoinsTable";
import Head from "next/head";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "./lib/dynamicValuesSlice";

const Home = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("max-w-[1296px] sm:max-w-[480px] sm:px-4 pt-[56px] mx-auto", {
      "bg-cryptoblue-350": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <Head>
        <title>crypto-app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ButtonsBox />
      <Compare />
      <Carousel />
      <ChartBox Charts={Charts} />
      <CoinsTable />
    </div>
  );
};
export default Home;
