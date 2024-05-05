import React, { useState, useEffect, MouseEvent } from "react";
import CoinCard from "./CoinCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import {  selectCurrency } from "../../lib/dynamicValuesSlice";
import { useGetTableCoinsDataQuery } from "@/app/lib/marketSlice";
import Header from "./Header";
import { Coin, SortType, sortNames } from "@/app/types/types";
import Link from "next/link";

const CoinsTable = () => {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [sort, setSort] = useState<SortType>("rank");
  const currency = useSelector(selectCurrency);
  const queryCurrency = currency.label.toLowerCase();
  const { data } = useGetTableCoinsDataQuery({queryCurrency, page});
  const handleSort = (e: MouseEvent) => {
    const name = (e.target as HTMLElement).dataset.name as SortType;
    setSort(name);
  };
  useEffect(() => {
    if(data) {
      setCoins(coins => [...coins, ...data]);
    }
  }, [data]);
  useEffect(() => {
    if(sort === "symbol"){
      setCoins(coins => [...coins].sort((a:Coin, b:Coin) => {
        return a.symbol > b.symbol ? 1 : -1;
      }));
    } else {
      setCoins(coins => [...coins].sort((a:any, b:any) => {
        const key = sortNames[sort] as keyof Coin;
        return a[key] - b[key];
      }));
    }
  },[sort]);
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  
  return (
    <div>
      <Header handleSort={handleSort} />
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {coins?.map((coin: Coin) => (
          <Link  key={coin.market_cap_rank} href={`/coin/${coin.id}market`}>
            <CoinCard coin={coin} index={coin.market_cap_rank} />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default CoinsTable;
