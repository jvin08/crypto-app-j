import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'



import Image from 'next/image'
import {  useGetCoinsDataQuery } from "../../lib/marketSlice"

const TWEEN_FACTOR = 1.2

type PropType = {
  options?: EmblaOptionsType
}
interface Coin  {
    image: string,
    symbol: string,
    name: string,
    current_price: number,
    price_change_percentage_24h: number,

}
const EmblaCarousel: React.FC<PropType> = (props) => {
    const {  options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
  
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi)
  
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    } = usePrevNextButtons(emblaApi)
  

  const { data, error, isLoading } = useGetCoinsDataQuery('')

  const isPositive = (number:number) => {
    return number > 0 ? true : false
  }
  
  return (

    <div className="mt-5 w-full h-20 bg-cryptoblue-400 rounded">
      <div className="h-full overflow-hidden rounded" ref={emblaRef}>
        <div className="h-full flex touch-pan-y bg-cryptoblue-400 rounded">
          {data?.map((coin: Coin, index: number) => (
            <div className="tracking-widest text-xs mx-0.5 h-full shrink-0 grow-0 w-1/5 min-w-0 pl-1 relative bg-cryptoblue-100 rounded" key={index}>   
                  <div className="flex items-center justify-center h-full w-full ml-[-8] p-3 cursor-pointer z-20">
                    <div className='h-16 mt-6'>
                    <Image 
                        src={coin.image}
                        alt={coin.symbol}
                        width={40}
                        height={40}
                    />
                    </div>
                    <div className='ml-4'>
                    <div>
                        <p>{coin.name} ({coin.symbol.toUpperCase()})</p> 
                    </div>
                    <div className='flex'>
                        <p>{coin.current_price.toFixed(2)} USD</p>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00065 6.33301L4.66732 9.66634H11.334L8.00065 6.33301Z" fill={isPositive(coin.price_change_percentage_24h) ? '#00B1A7' : 'red'} fillOpacity={1}/>
                        </svg>
                        <p style={{color: isPositive(coin.price_change_percentage_24h) ? '#00B1A7' : 'red'}}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                    </div>
                  </div>              
            </div>
          ))}
        </div>
      </div>
      
        <div className="z-0 flex items-center absolute top-4 -left-[2.5%]">{/*embla__buttons*/}
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="z-0 flex items-center absolute top-4 -right-[2.5%]">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

      <div className="z-10 top-20 absolute left-0 right-0 flex justify-center items-center">{/*dots */}
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'w-9 h-9  flex items-center mx-3 after:bg-cryptoblue-600 after:rounded after:w-full after:h-1 after:content-[""]'.concat(
              index === selectedIndex ? 'after:bg-gradient-to-tr	from-cryptoblue-600 to-cryptoblue-800' : ''
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCarousel
