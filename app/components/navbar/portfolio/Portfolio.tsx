'use client'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectDarkmode } from '@/app/lib/dynamicValuesSlice';
import { usePathname } from 'next/navigation';

const Portfolio = () => {
    const darkmode = useSelector(selectDarkmode)
    const pathname = usePathname()
    const active = pathname === '/portfolio'
  return (
    <div className='flex items-center ml-20'>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z" 
        stroke={active && !darkmode ? '#353570': !active ?'#9B9AB6' :  '#FFFFFF' } 
        strokeOpacity={1} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
    </svg>
    <Link className={clsx('ml-2 text-sm',{
            'text-cryptoblue-900' : active && !darkmode,
            'text-cryptoblue-500' : !active,
            'text-cryptodark-100' : active && darkmode,
    })} href='/portfolio'>Portfolio</Link>
    </div>
  )
}

export default Portfolio
