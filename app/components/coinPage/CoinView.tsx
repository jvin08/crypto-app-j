import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDarkmode, selectCurrency } from "@/app/lib/dynamicValuesSlice";
import { useGetOneCoinDataQuery, useGetCoinDataByDateQuery } from "../../lib/marketSlice";
import { timeInterval, calculatePrice } from "../coinPortfolioItem/utils";
import { useLocalStorage } from "../portfolioModal/hooks";
import { addCommas } from "./utils";
import { Triangle, SmallTriangle, Squares, Bullet } from "./SVGComponents";
import { isPositive } from "./utils";
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
  const allHistoryPricesQuery = `${data?.id}/market_chart?vs_currency=${currencyLabel}&days=5000`;
  const { data: pricesByDate } = useGetCoinDataByDateQuery(allPricesFromPurchaseDateQuery);
  const volume24hours = Math.floor(pricesByDate?.total_volumes?.slice(-24)?.reduce((acc:number, curr:number[]) => acc + curr[1], 0));
  const { data: maxPriceRange } = useGetCoinDataByDateQuery(allHistoryPricesQuery);
  const maxHistoricalPrice = maxPriceRange?.prices?.reduce((maxValue:number[], currArray:number[]) => {
    const [time, currPrice] = currArray;
    const [, maxPrice] = maxValue;
    return currPrice > maxPrice ? [time, currPrice] : maxValue;
  },[null,-Infinity]);
  const minHistoricalPrice = maxPriceRange?.prices?.reduce((minValue:number[], currArray:number[]) => {
    const [time, currPrice] = currArray;
    const [, minPrice] = minValue;
    return currPrice < minPrice ? [time, currPrice] : minValue;
  },[null,Infinity]);
  const purchasePrice = calculatePrice(pricesByDate?.prices, coinStorage?.purchaseTime);
  const gainOrLoss = ((data?.market_data.current_price?.[currencyLabel] - purchasePrice) * coinStorage?.amount).toFixed(2);
  const percentage = data?.market_data?.price_change_24h;
  const curSupToMarket = (data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2);
  const volVsCap = (data?.market_data?.total_volume?.[currencyLabel] / data?.market_data?.market_cap?.[currencyLabel]).toFixed(2);
  return (
    <div className="pb-10">
      <div className={clsx("flex mb-10",{
        "bg-cryptodark-400 text-cryptodark-100": darkmode,
      })}>
        <div className={clsx("w-[calc(2/5-1rem)] p-5 mr-5 rounded-lg",{
          "bg-cryptodark-300": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div>
            <div className="flex items-center pb-5">
              <div className="mr-4"><Image src={data?.image?.large} alt={data?.name} width={30} height={30} /></div>
              <div>
                <h1>{data?.name} ({data?.symbol?.toUpperCase()})</h1>
                <div className="flex items-center text-xs">
                  {data && 
                  <Link 
                    href={data?.links?.homepage[0]} 
                    className={clsx("flex items-center",{
                      "text-cryptodark-100": darkmode,
                    })}
                  >{data?.links?.homepage[0]}<Squares darkmode={darkmode} />
                  </Link>}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <h1 className="text-[1.4rem] mr-5">{currencySign} {addCommas(data?.market_data?.current_price?.[currencyLabel])}</h1>
                <SmallTriangle percentage={percentage} />
                <p className="text-[0.75rem]" style={{color: isPositive(percentage) ? "#00B1A7" : "#FE2264"}}>{Math.abs(Number(percentage?.toFixed(2)))}%</p>
              </div>
              <div className="pb-10 text-[0.75rem]">
                {isPositive(Number(gainOrLoss)) ? <h2>Gain: <span className="text-cryptoblue-650">${gainOrLoss}</span></h2> : <h2>Loss: <span className="text-cryptoblue-750 ml-5">${Math.abs(Number(gainOrLoss))}</span></h2>}
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex items-center -ml-2">
            <Triangle color="#00B1A7" angle="0" />
            <div className="ml-3 flex justify-between items-center">
              <p className="text-[0.85rem] p-0 mr-6">All time high: </p>
              <p className="text-[1.2rem] p-0">{currencySign} {maxHistoricalPrice?.[1]?.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-[0.75rem] font-extralight text-cryptodark-510 mb-4">{new Date(maxHistoricalPrice?.[0]).toUTCString()}</p>
          <div className="flex items-center">
            <Triangle color="#FE2264" angle="180" />
            <div className="ml-3 flex justify-between items-center">
              <p className="text-[0.85rem] p-0 mr-6 -ml-2">All time low: </p>
              <p className="text-[1.2rem] p-0">{currencySign} {minHistoricalPrice?.[1]?.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-[0.75rem] font-extralight text-cryptodark-510">{new Date(minHistoricalPrice?.[0]).toUTCString()}</p>
        </div>
        <div className="w-3/5">
          <p className="text-sm font-thin mb-4">{data?.description.en.slice(0,1000)}...</p>
          <div className="flex flex-wrap max-w-full text-xs">
            {data?.links?.blockchain_site?.slice(0,3)?.map((link:string) => 
              <Link 
                href={link} 
                key={link} 
                className={clsx("mr-3 mb-3 flex p-3 px-4 rounded-lg",{
                  "bg-cryptodark-300" : darkmode,
                  "bg-cryptoblue-100": !darkmode,
                })}>{link.slice(0,-1)}<Squares darkmode={darkmode} /></Link>)}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-10 border-t-[1px] border-cryptoblue-100">
        <div className={clsx("mt-10 p-5 w-[calc(50%-0.5rem)] rounded-lg ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center mb-5 mt-2">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-xs">Total volume</span><span className="ml-auto">{currencySign} {addCommas(data?.market_data?.total_volume?.[currencyLabel])}</span></p>
          </div>
          <div className="flex items-center mb-5">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-xs">Volume 24h</span><span className="ml-auto">{currencySign} {addCommas(volume24hours)}</span></p>
          </div>
          <div className="flex items-center">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-xs">Volume/Market</span><span className="ml-auto">{volVsCap}</span></p>
          </div>
        </div>
        <div  className={clsx("mt-10 p-5 w-[calc(50%-0.5rem)] rounded-lg ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center mb-5 mt-2">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-xs">Max Supply</span><span className="ml-auto">{currencySign} {addCommas(data?.market_data?.max_supply) || " n/a"} {data?.symbol?.toUpperCase()}</span></p>
          </div>
          <div className="flex items-center mb-3">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-xs">Circulating Supply</span><span className="ml-auto">{currencySign} {addCommas(Math.floor(data?.market_data?.circulating_supply))} {data?.symbol?.toUpperCase()}</span></p>
          </div>
          <div>
            <p className="flex justify-between mb-1"><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : curSupToMarket}%</span><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : (100-Number(curSupToMarket)).toFixed(2)}%</span></p>
            <div className="relative w-full">
              <div className="absolute -bottom-1 w-full h-1.5 z-2 rounded-sm px-px bg-cryptodark-630 opacity-40"></div>
              <div className="absolute -bottom-1 h-1.5 rounded-sm z-2 px-px bg-cryptodark-630" style={{width: `${(data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2)}%`}}></div>
            </div>
          </div>
        </div>
        <div className={clsx("mt-10 p-5 w-[calc(50%-0.5rem)] rounded-lg ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center mb-5">
            <Bullet /><p className="flex items-center w-11/12"><span className="mr-auto text-xs">Market Cap</span><span className="ml-auto">{currencySign} {addCommas(data?.market_data?.market_cap?.[currencyLabel])}</span></p>
          </div>
          <div className="flex items-center mb-5">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-xs">Fully Deluted Valuation</span><span className="ml-auto">{currencySign} {addCommas(data?.market_data?.fully_diluted_valuation?.[currencyLabel])}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinView;