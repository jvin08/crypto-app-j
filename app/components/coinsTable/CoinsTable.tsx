import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import {  selectCurrency } from "../../lib/dynamicValuesSlice";
import { useGetTableCoinsDataQuery } from "@/app/lib/marketSlice";
const CoinsTable = () => {
    const [page, setPage] = useState(1);
    const [coins, setCoins] = useState<any[]>([]);
    const currency = useSelector(selectCurrency);
    const { data } = useGetTableCoinsDataQuery({queryKey: currency.label.toLowerCase(), page: page});
    useEffect(() => {
        if(data) {
            setCoins((coins) => {
                return [...coins, ...data];
            });
        }
    }, [data]);
    const fetchMoreData = () => {
        setPage(page + 1);
    };
  return (
    <div>
        <InfiniteScroll
          dataLength={coins.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {coins?.map((coin: any, index: number) => (
                <CoinCard key={index} coin={index+1} />
          ))}
        </InfiniteScroll>
      </div>
  );
};
export default CoinsTable;
