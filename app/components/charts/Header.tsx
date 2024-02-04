import React from 'react'

export const Header = ({dataOne, price, compare } : {dataOne: string, price: string, compare: boolean}) => {
    
    const coinLastPrice = '$' + Number(price).toFixed(3)
    const firstCoinName = dataOne?.[0][0].toUpperCase() + dataOne?.[0].slice(1)
    const dateNow = new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getDate() + ", " + new Date().getUTCFullYear()
    return (
            <div>
                {compare ? <p className='text-2xl font-bold'>{dateNow}</p> : <p className='text-xl'>{firstCoinName + ' '} ( {dataOne[1].toUpperCase()} ) </p>}
                {compare ? <p className='text-xl text-cryptoblue-100'>.</p> : <p className='text-2xl font-bold'>{coinLastPrice}</p>}
                {compare ? <p className='text-sm text-cryptoblue-100'>.</p> : <p className='text-sm'>{dateNow}</p>}
            </div>             
  )
}

export const VolumeHeader = ({volume, compare } : {volume: number[][], compare: boolean}) => {
    const volumeToShow = '$' + (Number(volume?.[0][1]) / Math.pow(10,9)).toFixed(3)  + 'bln'
    const dateNow = new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getDate() + ", " + new Date().getUTCFullYear()
    return (
            <div>
                {compare ? <p className='text-2xl font-bold'>Volume 24h</p> : <p className='text-xl'>Volume 24h</p>}
                {compare ? <p className='text-sm'>{dateNow}</p> : <p className='text-2xl font-bold'>{volumeToShow}</p>}
                {compare ? <p className='text-xl text-cryptoblue-100'>.</p> : <p className='text-sm'>{dateNow}</p>}
            </div>             
  )
}

