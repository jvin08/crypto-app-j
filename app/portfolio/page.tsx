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
    <div className={clsx("w-full py-9 mt-30 px-12", {
      "bg-cryptoblue-400": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <Head>
        <title>Crypto App</title>
        <meta name="description" content="Crypto App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header handleCoinAdded={handleCoinAdded} />
      <div className={clsx("min-h-[calc(100vh-15rem)] pt-12",{
        "bg-cryptoblue-400": !darkmode,
        "bg-cryptodark-400": darkmode,
      })}>
        <PortfolioList forceUpdate={forceUpdate} handleCoinAdded={handleCoinAdded} />
      </div>
    </div>
  );
};
export default Portfolio;
