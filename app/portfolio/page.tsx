"use client";
import React from "react";
import Head from "next/head";
import PortfolioList from "../components/coinPortfolioItem/PortfolioList";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
const Portfolio = () => {
  const darkmode = useSelector(selectDarkmode);
  return (
    <div className={clsx("px-12",{
      "bg-cryptodark-400": darkmode,
      "bg-cryptoblue-100": !darkmode,
    })}>
      <Head>
        <title>Crypto App</title>
        <meta name="description" content="Crypto App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Portfolio Page
      <PortfolioList />
    </div>
  );
};
export default Portfolio;
