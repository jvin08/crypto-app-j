import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import {  useGetCoinsDataQuery } from "../../lib/marketSlice"

import './embla.module.css'
import './sandbox.module.css'
import './base.module.css'

const OPTIONS: EmblaOptionsType = {
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
}

const Carousel = () => {

  return (
    <div className="relative w-full">
      <EmblaCarousel  options={OPTIONS} />
    </div>
  )
}

export default Carousel
