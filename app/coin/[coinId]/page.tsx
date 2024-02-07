'use client'
import React from 'react'

import { useGetCoinsDataQuery } from '../../lib/marketSlice'



const Coin = ({ params } : { params : { coinId: string }}) => {
const { data, error, isLoading } = useGetCoinsDataQuery('')
    console.log('params: ', params.coinId)
  return (
    <div className='px-12'>
      Page { params.coinId }
    </div>
  )
}

export default Coin