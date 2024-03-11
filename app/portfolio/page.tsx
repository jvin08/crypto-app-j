"use client";
import React from "react";
import Head from "next/head";
import PortfolioList from "../components/coinPortfolioItem/PortfolioList";
const Portfolio = () => {
  return (
    <div className="px-12">
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
