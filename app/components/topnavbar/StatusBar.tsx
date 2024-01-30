import React from 'react'

const StatusBar = ({ quantity }: {quantity: number}) => {
    const statusSize = Math.round( 0.53 * quantity) + 'px'

  return (
    <div className='w-[53px] h-1.5 rounded bg-cryptoblue-500 ml-2'>
      <div className='h-1.5 rounded bg-cryptoblue-100' style={{width: statusSize}}></div>
    </div>
  )
}

export default StatusBar
