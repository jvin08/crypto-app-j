import { useState } from 'react'
import { useGetCoinsIntervalDataQuery } from "../../lib/marketSlice"
import CustomButton from '../coinsConvertor/CustomButton'
import { uid } from 'uid'
import { LineChart } from './LineChart'
const ChartBox = () => {
    
    const [days, setDays ] = useState(1)

    
    const intervals = [1, 7, 14, 31, 365, 1825]
    const units = ['1D', '7D', '14D', '1M', '1Y', '5Y']
    const toggleActive = (e: any, index: number) => {
        e.preventDefault()
        setDays(intervals[index])
    }


  return (
    <div>
        <LineChart range={days} />
        <div className='bg-cryptoblue-200 p-0.5 rounded-md flex w-fit mt-9'>
            {units.map((unit: string, index)=>{
                return <CustomButton  
                key={uid()} 
                name={unit} 
                handleClick={(e)=>toggleActive(e, index)} 
                active={intervals[index] === days} 
                width='w-16' 
                padding='py-1' />
            })}
        </div>
    </div>
  )
}

export default ChartBox
