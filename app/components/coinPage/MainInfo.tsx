import React from "react";
import { useSelector } from "react-redux";
import { selectDarkmode } from "@/app/lib/dynamicValuesSlice";
import clsx from "clsx";
import Image from "next/image";
import { Triangle, Squares, SmallTriangle } from "./SVGComponents";
import Link from "next/link";
import { addCommas, isPositive } from "./utils";
type MarketData = {
  price_change_24h: number, 
  price_change_24h_in_currency: {[key:string]: number}, 
  current_price: {[key:string]: number},
};
type Coin = {
  image: {large: string},
  name: string,
  symbol: string,
  links: {homepage: string[]}
  market_data:MarketData
};
const MainInfo = ({
  data, 
  currencySign, 
  gainOrLoss, 
  isStorageInfo,
  maxPriceRange,
  rank,
  currencyLabel
}:{
  data: Coin, 
  currencySign:string, 
  gainOrLoss:string,
  isStorageInfo:boolean,
  maxPriceRange:{prices: number[][]},
  rank: string,
  currencyLabel:string
}) => {
  const darkmode = useSelector(selectDarkmode);
  const fontSize = data?.name.length > 20 ? "text-lg" : "text-2xl";
  const priceChange = data?.market_data?.price_change_24h;
  const priceChangeDay = data?.market_data?.price_change_24h_in_currency?.[currencyLabel];
  const maxHistoricalPrice = maxPriceRange?.prices?.reduce((maxValue:number[], currArray:number[]) => {
    const [time, currPrice] = currArray;
    const [, maxPrice] = maxValue;
    return currPrice > maxPrice ? [time, currPrice] : maxValue;
  },[0,-Infinity]);
  const minHistoricalPrice = maxPriceRange?.prices?.reduce((minValue:number[], currArray:number[]) => {
    const [time, currPrice] = currArray;
    const [, minPrice] = minValue;
    return currPrice < minPrice ? [time, currPrice] : minValue;
  },[0,Infinity]);
  return (
    <div className={clsx("w-[564px] h-[461px] px-8 pt-10 pb-[57px] mr-8 rounded-xl",{
      "bg-cryptodark-300": darkmode,
      "bg-cryptoblue-100": !darkmode,
    })}>
      <div className="h-1/2 border-b-[1px] border-cryptodark-510">
        <div className="flex items-center pb-5">
          <div className="mr-6 w-12 h-12">
            {data?.image?.large 
            && <Image 
              src={data?.image?.large} 
              alt="coin-name" 
              width={48} 
              height={48} 
            />
            }
          </div>
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
            <p className="text-xl ml-0.5 mr-1">(24h)</p>
            <SmallTriangle percentage={isStorageInfo ? priceChange : priceChangeDay} />
            <p className="text-xl mr-0.5" 
              style={{color: isPositive(isStorageInfo ? priceChange : priceChangeDay) ? "#00B1A7" : "#FE2264"}}>
              {currencySign} {isStorageInfo 
                ? Math.abs(Number(priceChange?.toFixed(4)))
                : Math.abs(Number(priceChangeDay?.toFixed(4)))}
            </p>
          </div>
          <div className="text-xl flex items-center mt-2">
            {
              isStorageInfo 
                ? isPositive(Number(gainOrLoss)) 
                  ? <h2>Profit: <span className="text-cryptoblue-650 text-2xl mt-2.5 ml-4">${gainOrLoss}</span></h2> 
                  : <h2>Loss: <span className="text-cryptoblue-750 ml-5">${Math.abs(Number(gainOrLoss))}</span></h2> 
                : <h2>Cap rank: {rank}</h2>
            }
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="ml-1 flex items-center">
          <Triangle color="#00B1A7" angle="0" />
          <p className="text-xl p-0 ml-4">All time high: </p>
        </div>  
        <p className="text-2xl p-0">{currencySign} {maxHistoricalPrice?.[1]?.toFixed(4)}</p>
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
        <p className="text-2xl p-0">{currencySign} {minHistoricalPrice?.[1]?.toFixed(4)}</p>
      </div>
      <p className={clsx("text-base font-extralight text-cryptodark-510",{
        "text-cryptodark-510": darkmode,
        "text-cryptoblue-820": !darkmode,
      })}>{new Date(minHistoricalPrice?.[0]).toUTCString()}</p>
    </div>
  );
};
export default MainInfo;