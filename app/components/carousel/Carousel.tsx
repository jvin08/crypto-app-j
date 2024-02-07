import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const OPTIONS: EmblaOptionsType = {
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    loop: true,
}

const Carousel = () => {

  return (
    <div className="relative w-full">
      <EmblaCarousel  options={OPTIONS} />
    </div>
  )
}

export default Carousel
