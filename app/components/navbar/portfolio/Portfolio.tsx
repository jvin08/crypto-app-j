import React from 'react'
import Link from 'next/link'

const Portfolio = () => {
  return (
    <div className='flex items-center ml-10'>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z" stroke={'color(display-p3 0.2078 0.2078 0.4392)'} strokeOpacity={1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <Link className='ml-2 text-sm text-indigo-950' href='/portfolio'>Portfolio</Link>
    </div>
  )
}

export default Portfolio
