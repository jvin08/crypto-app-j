"use client";
import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/portfolioModal/Header";
import PortfolioList from "../components/coinPortfolioItem/PortfolioList";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../lib/dynamicValuesSlice";
import clsx from "clsx";

const Portfolio = () => {
  const darkmode = useSelector(selectDarkmode);
  const [forceUpdate, setForceUpdate] = useState(false);
  const handleCoinAdded = () => {
    setForceUpdate((prev) => !prev);
  };
  return (
    <div className={clsx("w-[1296px] py-9 pt-[56px] mx-auto mt-30", {
      "bg-cryptoblue-350": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <Head>
        <title>Crypto App</title>
        <meta name="description" content="Crypto App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header handleCoinAdded={handleCoinAdded} />
      <div className={clsx("min-h-[calc(100vh-15rem)] pt-6",{
        "bg-cryptoblue-350": !darkmode,
        "bg-cryptodark-400": darkmode,
      })}>
        <PortfolioList forceUpdate={forceUpdate} handleCoinAdded={handleCoinAdded} />
      </div>
    </div>
  );
};
export default Portfolio;
