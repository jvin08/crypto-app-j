import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SmallLoader } from "../charts/Loader";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from "./ArrowButtons";
import clsx from "clsx";
import Image from "next/image";
import {  useGetCoinsDataQuery } from "../../lib/marketSlice";
import { selectDarkmode, selectCompare, selectCoinOneSymbol, selectCoinTwoSymbol, setCoinOneSymbol, setCoinTwoSymbol, selectCurrency } from "@/app/lib/dynamicValuesSlice";
import { useCallback } from "react";
import { uid } from "uid";

type PropType = {
  options?: EmblaOptionsType
}
interface Coin  {
    id: string,
    image: string,
    symbol: string,
    name: string,
    current_price: number,
    price_change_percentage_24h: number,
    options?: EmblaOptionsType
}
const EmblaCarousel: React.FC<PropType> = (props) => {
  const darkmode = useSelector(selectDarkmode);
  const shouldCompare = useSelector(selectCompare);
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000, stopOnHover: true, loop: true, waitForTransition: true, speed: 2, })]);
  const dispatch = useDispatch();
  const coinOne = useSelector(selectCoinOneSymbol);
  const coinTwo = useSelector(selectCoinTwoSymbol);
  const currency = useSelector(selectCurrency);
  const onButtonClick = useCallback(() => {
    const { autoplay } = emblaApi !== undefined ? emblaApi.plugins() : { autoplay: undefined };
    if (!autoplay) return;
    const autoplayOptions = autoplay.options as { stopOnInteraction?: boolean };
    const autoplayStop = autoplay.stop as () => void;
    if (autoplayOptions.stopOnInteraction !== false) autoplayStop;
  }, [emblaApi]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onButtonClick);
  const queryPart = `${currency?.label.toLowerCase()}`;
  const { data, error, isLoading } = useGetCoinsDataQuery(queryPart);
  const carouselBackUpArray = new Array(20).fill(uid());
  const isPositive = (number:number) => {
    return number > 0 ? true : false;
  };
  const handleSelectedCoin = (e: any, selectedCoin: string[]) => {
    e.preventDefault();
    if(shouldCompare){
      if(coinTwo[0]===""){
        dispatch(setCoinTwoSymbol(selectedCoin));
      } else if (selectedCoin[0] !== coinTwo[0] && selectedCoin[0] !== coinOne[0]) {
        dispatch(setCoinOneSymbol(coinTwo));
        dispatch(setCoinTwoSymbol(selectedCoin));
      }
    } else {
      dispatch(setCoinOneSymbol(selectedCoin));
      dispatch(setCoinTwoSymbol(["",""]));
    }
  };
  const isCoinOne = (id: string) => id === coinOne[0];
  const isCoinTwo = (id: string) => id === coinTwo[0];
  return (
    <div className={clsx("mt-6 w-full h-20 rounded",{
      "bg-cryptodark-400": darkmode,
      "bg-cryptoblue-350": !darkmode,
    })}>
      <div className="h-full overflow-hidden rounded" ref={emblaRef}>
        <div className={clsx("h-full flex touch-pan-y rounded", {
          "bg-cryptodark-400": darkmode,
          "bg-cryptoblue-350": !darkmode,
        })}>
          {error!==undefined || isLoading
            ? carouselBackUpArray.map((backup, index) => (
              <div key={backup+index} className={clsx("tracking-widest text-xs first:ml-0 mx-1 h-full shrink-0 grow-0 w-[253px] min-w-0 relative rounded-[5px]", {
                "bg-cryptodark-300": darkmode,
                "bg-cryptodark-100": !darkmode,
              })}><SmallLoader /></div>))
            : data?.map((coin: Coin) => (
              <div key={coin.id} className={clsx("tracking-widest text-xs mx-1 h-full shrink-0 grow-0 w-[253px] min-w-0 p-[1px] relative rounded-[5px]", {
                "bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800": isCoinOne(coin.id) && !darkmode || isCoinTwo(coin.id) && !darkmode,
                "bg-cryptoblue-100": !isCoinOne(coin.id) && !darkmode || !isCoinTwo(coin.id) && !darkmode,
                "bg-gradient-to-t from-cryptodark-750 to-cryptodark-800": isCoinOne(coin.id) && darkmode || isCoinTwo(coin.id) && darkmode,
                "bg-cryptodark-300": !isCoinOne(coin.id) && darkmode || !isCoinTwo(coin.id) && darkmode,
              })}>   
                <div onClick={(e) => handleSelectedCoin(e, [coin.id,coin.symbol])} 
                  className={clsx("flex items-center justify-center h-full w-full p-3 cursor-pointer -z-20 rounded select-none", {
                    "bg-cryptodark-300 text-cryptodark-100": !isCoinOne(coin.id) && darkmode || !isCoinTwo(coin.id) && darkmode,
                    "bg-cryptodark-750 text-cryptoblue-100": isCoinOne(coin.id) && darkmode || isCoinTwo(coin.id) && darkmode,
                    "bg-cryptoblue-600 text-cryptoblue-100": isCoinOne(coin.id) && !darkmode || isCoinTwo(coin.id) && !darkmode,                    
                  })}>
                  <div className="h-16 mt-6">
                    <Image 
                      src={coin.image}
                      alt={coin.symbol}
                      width={39.24}
                      height={40}
                    />
                  </div>
                  <div className="ml-4">
                    <div>
                      <p>{coin.name} ({coin.symbol.toUpperCase()})</p> 
                    </div>
                    <div className="flex">
                      <p>{coin.current_price.toFixed(2) + " " + currency.label} </p>
                      <svg transform={isPositive(coin.price_change_percentage_24h) ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={isPositive(coin.price_change_percentage_24h) ? "#00B1A7" : "red"} fillOpacity={1}/>
                      </svg>
                      <p style={{color: isPositive(coin.price_change_percentage_24h) ? "#00B1A7" : "red"}}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>              
              </div>
            ))}
        </div>
      </div>
      <div className="z-0 flex items-center absolute top-4 -left-[2.5%]">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      <div className="z-0 flex items-center absolute top-4 -right-[2.5%]">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};
export default EmblaCarousel;
