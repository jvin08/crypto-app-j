import React, { useState, useEffect, MouseEvent } from "react";
import CoinCard from "./CoinCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import {  selectCurrency } from "../../lib/dynamicValuesSlice";
import { useGetTableCoinsDataQuery } from "@/app/lib/marketSlice";
import Header from "./Header";
import { Coin } from "@/app/types/types";
import Link from "next/link";

const CoinsTable = () => {
  const queries = ["market_cap","volume", "id"];
  const [order, setOrder] = useState("_desc");
  const [sortQuery, setSortQuery] = useState(queries[0] + order);
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [sort, setSort] = useState("rank");
  const currency = useSelector(selectCurrency);
  const query = `page=${page}&order=${sortQuery}`;
  const queryCurrency = currency.label.toLowerCase();
  const { data } = useGetTableCoinsDataQuery({queryCurrency, query});
  const handleSort = (e: MouseEvent) => {
    const name = (e.target as HTMLElement).dataset.name as string;
    if(queries.includes(name)){
      setSortQuery(name + order);
    } else{
      sortCache(e);
    }
    setPage(1);
    setSort(name);
    setOrder(order === "_desc" ? "_asc" : "_desc");
  };
  const sortCache = (e: MouseEvent) => {
    const name = (e.target as HTMLElement).dataset.name as string;
    setCoins(coins => [...coins.slice().sort((a, b) => {
      if (order === "_asc") {
        return a[name] - b[name];
      }
      return b[name] - a[name];
    })]);
  };
  useEffect(() => {
    if(data && page > 1) {
      data.forEach((coin: Coin) => {
        if(!coins.some((c: Coin) => c.id === coin.id)) {
          setCoins(coins => [...coins, coin]);
        }
      });
    }
    if(data && page === 1) {
      setCoins(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <Header handleSort={handleSort} sort={sort} order={order} />
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {coins.map((coin: Coin) => (                           //replace data with coins
          <Link  key={coin.id} href={`/coin/${coin.id}market`}>
            <CoinCard coin={coin} index={coin.market_cap_rank} />
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default CoinsTable;
