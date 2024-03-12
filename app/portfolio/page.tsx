"use client";
import React from "react";
import Head from "next/head";
import Header from "../components/portfolio/Header";
import PortfolioList from "../components/coinPortfolioItem/PortfolioList";
import { useSelector } from "react-redux";
import { selectDarkmode } from "../lib/dynamicValuesSlice";
import clsx from "clsx";
const Portfolio = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("w-full py-9 px-12", {
      "bg-cryptoblue-400": !darkmode,
      "bg-cryptodark-400": darkmode,
    })}>
      <Head>
        <title>Crypto App</title>
        <meta name="description" content="Crypto App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={clsx("min-h-[calc(100vh-15rem)] pt-5",{
        "bg-cryptoblue-400": !darkmode,
        "bg-cryptodark-400": darkmode,
      })}>
        <PortfolioList />
      </div>
    </div>
  );
};
export default Portfolio;
