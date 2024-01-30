'use client'
import React from 'react'
import ButtonsBox from './components/coinsConvertor/ButtonsBox'
import Compare from './components/compare/Compare'
import { useGetCoinsDataQuery } from './lib/marketSlice'
import Carousel from './components/carousel/Carousel'
import ChartBox from './components/charts/ChartBox'


const Home = () => {
const { data, error, isLoading } = useGetCoinsDataQuery('')
    console.log('page rendering coins...')
  return (
    <div className='px-12'>
      <ButtonsBox />
      <Compare />
      <Carousel />
      <ChartBox />
    </div>
  )
}

export default Home
