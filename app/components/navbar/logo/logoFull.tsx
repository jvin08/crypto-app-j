import React from 'react'
import Logo from './logo'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { selectDarkmode } from '@/app/lib/dynamicValuesSlice'

const LogoName = () => {
    const darkmode = useSelector(selectDarkmode)
  return (
    <div className='flex items-center font-bold'>
      <Logo/> 
      <p className={clsx('ml-2 text-xl', {
            'text-cryptoblue-100': darkmode,
            'text-cryptoblue-900': !darkmode,
      })}>Logoipsm</p>
    </div>
  )
}

export default LogoName
