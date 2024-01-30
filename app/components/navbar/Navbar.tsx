'use client'
import React from 'react'
import  LogoFull  from "./logo/logoFull"
import  Home from "./home/Home"
import Portfolio from './portfolio/Portfolio'
import Search from './search/Search'
import Dropdown from './dropdown/Dropdown'
import Theme from './themeBtn/Theme'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-cryptoblue-100 px-12 pt-2 pb-4'>
      <LogoFull />
      <div className='flex items-center justify-between'>
        <Home />
        <Portfolio />
      </div>
      <div className='flex items-center justify-between'>
        <Search />
        <Dropdown />
        <Theme />
      </div>

    </div>
  )
}

export default Navbar
