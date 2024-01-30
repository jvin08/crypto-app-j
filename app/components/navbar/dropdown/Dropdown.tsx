'use client'
import { AnyARecord } from 'dns'
import { useState } from 'react'

const currencies = [
    {
        id:1, 
        label: "USD", 
        sign: "$"
    },
    {
        id:2, 
        label: "GBP", 
        sign: "£"
    },
    {
        id:3, 
        label: "EUR", 
        sign: "€"
    },
    {
        id:4, 
        label: "BTC", 
        sign: "₿"
    },
    {
        id:5, 
        label: "ETH", 
        sign: "Ξ"
    },
]

const Dropdown = () => {
    const [currency, setCurrency] = useState(["$","USD"])
    const [hidden, setHidden] = useState('hidden')
const handleClick = (id: number) => {
    setCurrency([currencies[id-1].sign, currencies[id-1].label])
}
const toggleHidden = () => {
    setHidden(prev => prev==='hidden' ? '' : 'hidden')
}
  return (
    <div className='relative text-indigo-600 ml-5 text-xs' onClick={toggleHidden}>
        <div className='flex justify-end items-center h-10 bg-cryptoblue-200 rounded-xl px-3'>
            <p className='pl-1.5 pt-0.5 rounded-full w-5 h-5 bg-cryptoblue-900 font-bold text-cryptoblue-100'>{currency[0]}</p>
            <p className='ml-1'>{currency[1]}</p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99976 4.50024L5.99988 7.50012L3 4.5" stroke={'color(display-p3 0.2588 0.2588 0.5255)'} strokeOpacity={1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <ul className={`absolute left-0 top-0 rounded bg-cryptoblue-200 p-1.5 ${hidden}`}>
            {currencies.map((c)=>{
                return <li key={c.id} onClick={()=>handleClick(c.id)} className='rounded px-4 py-1.5 cursor-pointer hover:bg-cryptoblue-900 hover:text-cryptoblue-100'>
                    <div className='flex justify-end px-0.5'>
                        {c.label === currency[1] && <p>✓</p>}
                        <p id={c.label} className='ml-1'>{c.label}</p>
                    </div>
                </li>
            })}   
        </ul>     
    </div>
  )
}

export default Dropdown
