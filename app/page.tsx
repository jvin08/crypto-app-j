'use client'
import React from 'react'
import ButtonsBox from './components/coinsConvertor/ButtonsBox'
import Compare from './components/compare/Compare'
import { useGetCoinsDataQuery } from './lib/marketSlice'
import Carousel from './components/carousel/Carousel'
// import ChartBox from './components/charts/ChartBox'
import dynamic from 'next/dynamic';
import Head from 'next/head'


const ChartBox = dynamic(() => import('./components/charts/ChartBox'), { ssr: false,
    loading: () => <p>Loading...</p>});

const Home = () => {

  return (
    <div className='px-12'>
        <Head>
            <title>crypto-app</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
      <ButtonsBox />
      <Compare />
      <Carousel />
      <ChartBox />
    </div>
  )
}

export default Home
