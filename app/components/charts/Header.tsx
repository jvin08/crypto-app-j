import React from 'react'
import { useSelector } from 'react-redux'
import { selectDarkmode } from '../../lib/dynamicValuesSlice'
import clsx from 'clsx'

export const Header = ({dataOne, price, compare } : {dataOne: string, price: string, compare: boolean}) => {
    const darkmode = useSelector(selectDarkmode)
    const coinLastPrice = '$' + Number(price).toFixed(3)
    const firstCoinName = dataOne?.[0][0].toUpperCase() + dataOne?.[0].slice(1)
    const dateNow = new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getDate() + ", " + new Date().getUTCFullYear()
    return (
            <div>
                {compare ? <p className={clsx('text-2xl font-bold', {
                    'text-cryptodark-550': darkmode,
                })}>{dateNow}</p> : <p className={clsx('text-xl',{
                    'text-cryptodark-550': darkmode,
                })}>{firstCoinName + ' '} ( {dataOne[1].toUpperCase()} ) </p>}
                {compare ? <p className={clsx('text-xl ',{
                    'text-cryptodark-400': darkmode,
                    'text-cryptoblue-100': !darkmode,
                })}>.</p> : <p className={clsx('text-2xl font-bold',{
                    'text-cryptodark-100': darkmode,
                })}>{coinLastPrice}</p>}
                            {compare ? <p className={clsx('text-sm',{
                                'text-cryptoblue-100': !darkmode,
                                'text-cryptoblue-350': darkmode,
                            })}>.</p> : <p className={clsx('text-sm',{
                                'text-cryptodark-100': darkmode,
                            })}>{dateNow}</p>}
                        </div>             
            )
}

export const VolumeHeader = ({volume, compare } : {volume: number[][], compare: boolean}) => {
    const darkmode = useSelector(selectDarkmode)
    const volumeToShow = '$' + (Number(volume?.[0][1]) / Math.pow(10,9)).toFixed(3)  + 'bln'
    const dateNow = new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getDate() + ", " + new Date().getUTCFullYear()
    return (
            <div>
                {compare ? <p className={clsx('text-2xl font-bold', {
                    'text-cryptodark-100': darkmode,
                })}>Volume 24h</p> : <p className={clsx('text-xl', {
                    'text-cryptodark-550': darkmode,
                })}>Volume 24h</p>}
                {compare ? <p className={clsx('text-sm',{
                    'text-cryptodark-550': darkmode,
                })}>{dateNow}</p> : <p className='text-2xl font-bold'>{volumeToShow}</p>}
                {compare ? <p className={clsx('text-xl',{
                    'text-cryptodark-350': darkmode,
                    'text-cryptodark-100': !darkmode,
                })}>.</p> : <p className={clsx('text-sm',{
                    'text-cryptodark-550': darkmode,
                })}>{dateNow}</p>}
            </div>             
  )
}

