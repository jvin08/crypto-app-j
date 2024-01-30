import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
  } from 'react'
  import { EmblaCarouselType } from 'embla-carousel'
  
  type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
  }
  
  export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
  ): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  
    const onPrevButtonClick = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollPrev()
    }, [emblaApi])
  
    const onNextButtonClick = useCallback(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, [emblaApi])
  
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev())
      setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])
  
    useEffect(() => {
      if (!emblaApi) return
  
      onSelect(emblaApi)
      emblaApi.on('reInit', onSelect)
      emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])
  
    return {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    }
  }
  
  type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
  
  export const PrevButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props
    return (
        <div className='rounded-full bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800 opacity-80 p-px'>
            <button
                className="z-10 bg-cryptoblue-500 rounded-full text-cryptoblue-100  items-center justify-center cursor-pointer w-9 h-9 bg-opacity-80 touch-manipulation inline-flex no-underline border-0"
                type="button"
                {...restProps}
            >
                <svg className="w-3 h-3" viewBox="0 0 532 532">
                <path
                    fill="currentColor"
                    d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
                />
                </svg>
                {children}
            </button>
        </div>
    )
  }
  
  export const NextButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props
  
    return (
        <div className='rounded-full bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800 p-px'>
            <button
                className="z-10 bg-cryptoblue-500 rounded-full text-cryptoblue-100  items-center justify-center cursor-pointer w-9 h-9 bg-opacity-80 touch-manipulation inline-flex no-underline border-0"
                type="button"
                {...restProps}
            >
                <svg className="h-3 w-3" viewBox="0 0 532 532">
                <path
                    fill="currentColor"
                    d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
                />
                </svg>
                {children}
            </button>
      </div>
    )
  }
  