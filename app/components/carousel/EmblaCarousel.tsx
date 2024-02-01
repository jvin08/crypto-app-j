import { useDispatch, useSelector } from 'react-redux'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './ArrowButtons'


import Image from 'next/image'
import {  useGetCoinsDataQuery } from "../../lib/marketSlice"
import { selectCompare, selectCoinOneSymbol, selectCoinTwoSymbol, setCoinOneSymbol, setCoinTwoSymbol, setCompare } from '@/app/lib/dynamicValuesSlice'

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

}
const EmblaCarousel: React.FC<PropType> = (props) => {
    const shouldCompare = useSelector(selectCompare)
    const {  options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const dispatch = useDispatch()
    const coinOne = useSelector(selectCoinOneSymbol)
    const coinTwo = useSelector(selectCoinTwoSymbol)
  
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
  const handleSelectedCoin = (e: any, selectedCoin: string[]) => {
    e.preventDefault()
    if(shouldCompare){
        if(coinTwo[0]===''){
            dispatch(setCoinOneSymbol([data?.[0].id, data?.[0].symbol]))
            dispatch(setCoinTwoSymbol(selectedCoin))
        } else {
            dispatch(setCoinOneSymbol(coinTwo))
            dispatch(setCoinTwoSymbol(selectedCoin))
        }
    } else {
        dispatch(setCoinOneSymbol(selectedCoin))
        dispatch(setCoinTwoSymbol(['','']))
    }
    
  }
  const borderColor = (coinId: string) => {
    if(coinId === coinOne[0] || coinId === coinTwo[0]){
        return 'bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800'
    } else {
        return 'bg-cryptoblue-100'
    }
  }
  const bgColor = (coinId: string) => {
    if(coinId === coinOne[0] || coinId === coinTwo[0]){
        return 'bg-cryptoblue-600 text-cryptoblue-100'
    } else {
        return 'bg-cryptoblue-100'
    }
  }

  return (

    <div className="mt-5 w-full h-20 bg-cryptoblue-400 rounded">
      <div className="h-full overflow-hidden rounded" ref={emblaRef}>
        <div className="h-full flex touch-pan-y bg-cryptoblue-400 rounded">
          {data?.filter((_: any,index: number) => index < 20).map((coin: Coin, index: number) => (
            <div  key={index} className={`${borderColor(coin.id)} tracking-widest text-xs mx-0.5 h-full shrink-0 grow-0 w-1/5 min-w-0 p-0.5 relative rounded-md`}>   
                  <div onClick={(e) => handleSelectedCoin(e, [coin.id,coin.symbol])} className={`${bgColor(coin.id)} flex items-center justify-center h-full w-full ml-[-8] p-3 cursor-pointer z-20 rounded select-none`}>
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
                        <svg transform={isPositive(coin.price_change_percentage_24h) ? "rotate(0)" : "rotate(180)"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  )
}

export default EmblaCarousel
