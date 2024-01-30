import React, { MouseEventHandler } from 'react'

type Props = {
    name: String,
    handleClick: MouseEventHandler,
    active: boolean,
    width: string,
    padding: string,
}

const CustomButton = ({name, handleClick, active, width, padding}: Props) => {
    const bgColor = active ? 'bg-cryptoblue-600 text-cryptoblue-100' : 'bg-cryptoblue-100'
    const borderColor = active ? 'bg-gradient-to-t from-cryptoblue-600 to-cryptoblue-800' : ''
  return (
    <div className={`${borderColor}  ${width} rounded-md p-0.5`}>
      <button onClick={handleClick} className={`${bgColor} text-sm w-full rounded ${padding}`}>{name}</button>
    </div>
  )
}

export default CustomButton
