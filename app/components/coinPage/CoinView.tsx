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
  const allHistoryPricesQuery = `${data?.id}/market_chart?vs_currency=${currencyLabel}&days=365`;
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
  const priceChange = data?.market_data?.price_change_24h;
  const curSupToMarket = (data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2);
  const volVsCap = (data?.market_data?.total_volume?.[currencyLabel] / data?.market_data?.market_cap?.[currencyLabel]).toFixed(2);
  const statusBarWidth = curSupToMarket.includes(Infinity+"") ? 10 : (data?.market_data?.circulating_supply/data?.market_data?.max_supply*100).toFixed(2);
  const fontSize = data?.name.length > 20 ? "text-lg" : "text-2xl";
  return (
    <div className="pb-10 mt-[184px]">
      <h2 className="mb-10 text-xl">Portfolio / Your Bitcoin summary</h2>
      <div className={clsx("flex mb-8",{
        "bg-cryptodark-400 text-cryptodark-100": darkmode,
        "text-cryptoblue-910": !darkmode,
      })}>
        <div className={clsx("w-[564px] h-[461px] px-8 pt-10 pb-[57px] mr-8 rounded-xl",{
          "bg-cryptodark-300": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="h-1/2 border-b-[1px] border-cryptodark-510">
            <div className="flex items-center pb-5">
              <div className="mr-6"><Image src={data?.image?.large} alt={data?.name} width={48} height={48} /></div>
              <div>
                <h1 className={fontSize}>{data?.name} ({data?.symbol?.toUpperCase()})</h1>
                <div className="flex items-center text-xs">
                  {data && 
                  <Link 
                    href={data?.links?.homepage[0]} 
                    className={clsx("flex items-center text-base",{
                      "text-cryptodark-100": darkmode,
                    })}
                  >{data?.links?.homepage[0]}<span className="-ml-1"><Squares darkmode={darkmode} /></span>
                  </Link>}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex items-center mt-3">
                <h1 className="text-4xl font-semibold mr-5">{currencySign} {addCommas(data?.market_data?.current_price?.[currencyLabel])}</h1>
                <SmallTriangle percentage={priceChange} />
                <p className="text-xl ml-0.5" style={{color: isPositive(priceChange) ? "#00B1A7" : "#FE2264"}}>{currencySign + "" + Math.abs(Number(priceChange?.toFixed(2)))}</p>
              </div>
              <div className="text-xl flex items-center mt-2">
                {isPositive(Number(gainOrLoss)) ? <h2>Profit: <span className="text-cryptoblue-650 text-2xl mt-2.5 ml-4">${gainOrLoss}</span></h2> : <h2>Loss: <span className="text-cryptoblue-750 ml-5">${Math.abs(Number(gainOrLoss))}</span></h2>}
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="ml-1 flex items-center">
              <Triangle color="#00B1A7" angle="0" />
              <p className="text-xl p-0 ml-4">All time high: </p>
            </div>  
            <p className="text-2xl p-0">{currencySign} {maxHistoricalPrice?.[1]?.toFixed(2)}</p>
          </div>
          <p className={clsx("text-base font-extralight text-cryptodark-510",{
            "text-cryptodark-510": darkmode,
            "text-cryptoblue-820": !darkmode,
          })}>{new Date(maxHistoricalPrice?.[0]).toUTCString()}</p>
          <div className="flex items-center justify-between mt-6">
            <div className="ml-1 flex items-center">
              <Triangle color="#FE2264" angle="180" />
              <p className="text-xl p-0 ml-4">All time low: </p>
            </div>  
            <p className="text-2xl p-0">{currencySign} {minHistoricalPrice?.[1]?.toFixed(2)}</p>
          </div>
          <p className={clsx("text-base font-extralight text-cryptodark-510",{
            "text-cryptodark-510": darkmode,
            "text-cryptoblue-820": !darkmode,
          })}>{new Date(minHistoricalPrice?.[0]).toUTCString()}</p>
        </div>
        <div className="w-3/5">
          <p className={clsx("text-sm mb-4",{
            "text-cryptodark-400 font-light": !darkmode,
            "font-thin": darkmode,
          })}>{data?.description.en.slice(0,1600)}...</p>
          <div className="flex flex-wrap max-w-full text-xs">
            {data?.links?.blockchain_site?.slice(0,3)?.map((link:string) => 
              <Link 
                href={link} 
                key={link} 
                className={clsx("mr-3 mb-3 flex p-3 px-4 rounded-xl text-base",{
                  "bg-cryptodark-300" : darkmode,
                  "bg-cryptoblue-100": !darkmode,
                })}>{link.slice(0,-1)}<Squares darkmode={darkmode} /></Link>)}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between border-t-[1px] border-cryptoblue-100">
        <div className={clsx("mt-8 px-8 py-10 w-[calc(50%-12px)] h-[216px] rounded-xl ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center justify-between mb-7">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-base">Total volume</span><span className="ml-auto text-xl">{currencySign} {addCommas(data?.market_data?.total_volume?.[currencyLabel])}</span></p>
          </div>
          <div className="flex items-center justify-between mb-7">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-base">Volume 24h</span><span className="ml-auto text-xl">{currencySign} {addCommas(volume24hours)}</span></p>
          </div>
          <div className="flex items-center justify-between">
            <Bullet /><p className="flex w-11/12"><span className="mr-auto text-base">Volume/Market</span><span className="ml-auto text-xl">{volVsCap}</span></p>
          </div>
        </div>
        <div  className={clsx("mt-8 px-8 py-10 w-[calc(50%-12px)] h-[216px] rounded-xl ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center mb-7 justify-between">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-base">Max Supply</span><span className="ml-auto text-xl">{currencySign} {addCommas(data?.market_data?.max_supply) || " n/a"} {data?.symbol?.toUpperCase()}</span></p>
          </div>
          <div className="flex items-center mb-5 justify-between">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-base">Circulating Supply</span><span className="ml-auto text-xl">{currencySign} {addCommas(Math.floor(data?.market_data?.circulating_supply))} {data?.symbol?.toUpperCase()}</span></p>
          </div>
          <div>
            <p className="flex justify-between mb-3"><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : curSupToMarket}%</span><span className="text-xs text-cryptodark-630">● {curSupToMarket.includes(Infinity+"") ? " n/a" : (100-Number(curSupToMarket)).toFixed(2)}%</span></p>
            <div className="relative w-full">
              <div className="absolute -bottom-1 w-full h-2 z-2 rounded-sm px-px bg-cryptodark-630 opacity-40"></div>
              <div className="absolute -bottom-1 h-2 rounded-sm z-2 px-px bg-cryptodark-630" style={{width: statusBarWidth}}></div>
            </div>
          </div>
        </div>
        <div className={clsx("mt-6 px-8 py-10 w-[calc(50%-12px)] h-[160px] rounded-xl ",{
          "bg-cryptodark-300 text-cryptodark-100": darkmode,
          "bg-cryptoblue-100": !darkmode,
        })}>
          <div className="flex items-center mb-7 justify-between">
            <Bullet /><p className="flex items-center w-11/12"><span className="mr-auto text-base">Market Cap</span><span className="ml-auto text-xl">{currencySign} {addCommas(data?.market_data?.market_cap?.[currencyLabel])}</span></p>
          </div>
          <div className="flex items-center mb-5 justify-between">
            <Bullet /><p className="flex w-11/12 items-center"><span className="mr-auto text-base">Fully Deluted Valuation</span><span className="ml-auto text-xl">{currencySign} {addCommas(data?.market_data?.fully_diluted_valuation?.[currencyLabel])}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinView;