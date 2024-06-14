import React from "react";
import clsx from "clsx";
import BulletItem from "./BulletItem";
import MainInfo from "./MainInfo";
import Links from "./Links";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery, useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { timeInterval, calculatePrice } from "../coinPortfolioItem/utils";
import { useLocalStorage } from "../portfolioModal/hooks";
import { addCommas } from "./utils";

const CoinView = ({coinId, id}:{coinId: string, id: string}) => {
  const darkmode = useSelector(selectDarkmode);
  const currency = useSelector(selectCurrency);
  const currencyLabel = currency.label.toLowerCase();
  const currencySign = currency.sign;
  const [storageData] = useLocalStorage();
  const { data } = useGetOneCoinDataQuery(coinId);
  const coinStorage = storageData.filter((coin:any) => coin.id === id)[0];
  const days = timeInterval(storageData.filter((coin:any) => coin.id === id)[0]?.purchaseTime);
  const allPricesFromPurchaseDateQuery = `${data?.id}/market_chart?vs_currency=${currencyLabel}&days=${days}`;
  const allHistoryPricesQuery = `${data?.id}/market_chart?vs_currency=${currencyLabel}&days=365`;
  const { data: pricesByDate } = useGetCoinDataByDateQuery(allPricesFromPurchaseDateQuery);
  const volume24hours = Math.floor(pricesByDate?.total_volumes?.slice(-24)?.reduce((acc:number, curr:number[]) => acc + curr[1], 0));
  const { data: maxPriceRange } = useGetCoinDataByDateQuery(allHistoryPricesQuery);
  const purchasePrice = calculatePrice(pricesByDate?.prices, coinStorage?.purchaseTime);
  const gainOrLoss = ((data?.market_data.current_price?.[currencyLabel] - purchasePrice) * coinStorage?.amount).toFixed(2);
  const curSupToMarket = (data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2);
  const volVsCap = (data?.market_data?.total_volume?.[currencyLabel] / data?.market_data?.market_cap?.[currencyLabel]).toFixed(2);
  const statusBarWidth = curSupToMarket.includes(Infinity+"") ? 10 : (data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2);
  const rank = data?.market_data?.market_cap_rank;
  const isStorageInfo = id !== "" ? true : false;
  return (
    <div className="pb-10 sm:mx-4">
      {isStorageInfo 
        ? <h2 className="mb-10 sm:text-lg text-xl">Portfolio/Your&apos;s {data?.name} summary</h2>
        : <h2 className="mb-10 sm:text-lg text-xl">Market / {data?.name} summary</h2>
      }
      <div className={clsx("flex sm:flex-col mb-8",{
        "bg-cryptodark-400 text-cryptodark-100": darkmode,
        "text-cryptoblue-910": !darkmode,
      })}>
        <MainInfo 
          data={data}
          currencySign={currencySign}
          gainOrLoss={gainOrLoss} 
          isStorageInfo={isStorageInfo}
          maxPriceRange={maxPriceRange}
          rank={rank}
          currencyLabel={currencyLabel}
        />
        <div className="sm:w-full w-3/5 sm:mt-6">
          <p className={clsx("text-sm mb-6",{
            "text-cryptodark-400 font-light": !darkmode,
            "font-thin": darkmode,
          })}>{data?.description.en.slice(0,1600)}...</p>
          <Links data={data} />
        </div>
      </div>
      <div className="flex sm:flex-col flex-wrap justify-between border-t-[1px] border-cryptoblue-100">
        <div className={clsx("mt-8 px-8 sm:py-8 py-10 sm:w-full w-[calc(50%-12px)] sm:h-72 h-[216px] rounded-xl ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <BulletItem name="Total volume" content={`${currencySign} ${addCommas(data?.market_data?.total_volume?.[currencyLabel])}`} />
          <BulletItem name="Volume 24h" content={`${currencySign} ${addCommas(volume24hours)}`} />
          <BulletItem name="Volume/Market" content={volVsCap} />
        </div>
        <div  className={clsx("sm:mt-6 mt-8 px-8 sm:py-8 py-10 sm:w-full w-[calc(50%-12px)] sm:h-[280px] h-[216px] rounded-xl ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <BulletItem name="Max Supply" content={`${currencySign} ${addCommas(data?.market_data?.max_supply) || " n/a"} ${data?.symbol?.toUpperCase()}`} />
          <BulletItem name="Circulating Supply" content={`${currencySign} ${addCommas(Math.floor(data?.market_data?.circulating_supply))} ${data?.symbol?.toUpperCase()}`} />
          <div>
            <p className="flex justify-between mb-3"><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : curSupToMarket + "%"}</span><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : (100-Number(curSupToMarket)).toFixed(2) + "%"}</span></p>
            <div className="relative w-full">
              <div className="absolute -bottom-1 w-full h-2 z-2 rounded-sm px-px bg-cryptodark-630 opacity-40"></div>
              <div className="absolute -bottom-1 h-2 rounded-sm z-2 px-px bg-cryptodark-630" style={{width: statusBarWidth + "%"}}></div>
            </div>
          </div>
        </div>
        <div className={clsx("mt-6 px-8 sm:py-8 py-10 sm:w-full w-[calc(50%-12px)] sm:h-52 h-[160px] rounded-xl",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <BulletItem name="Market Cap" content={`${currencySign} ${addCommas(data?.market_data?.market_cap?.[currencyLabel])}`} />
          <BulletItem name="Fully Deluted Valuation" content={`${currencySign} ${addCommas(data?.market_data?.fully_diluted_valuation?.[currencyLabel])}`} />
        </div>
      </div>
    </div>
  );
};
export default CoinView;
