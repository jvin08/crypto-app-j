import { useState } from 'react'
import CustomButton from '../coinsConvertor/CustomButton'
import { uid } from 'uid'
import { Charts } from './Charts'

const ChartBox = () => {
    
    const [days, setDays ] = useState(1)

    
    const intervals = [1, 7, 14, 31, 93, 365, 1825]
    const units = ['1D', '7D', '14D', '1M', '1Q', '1Y', '5Y']
    const toggleActive = (e: any, index: number) => {
        e.preventDefault()
        setDays(intervals[index])
    }


  return (
    <div >
        <div className='flex pt-10'>
            <Charts range={days} />
        </div>
        
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
