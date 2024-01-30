import { useState} from 'react'
import CustomButton from './CustomButton'

const ButtonsBox = () => {
    const [active, setActive] = useState(true)
const toggleActive = () => {
    setActive(active => !active)
}
  return (
    <div className='bg-cryptoblue-100 p-1 rounded-md flex w-fit mt-9'>
      <CustomButton name='Coins' handleClick={toggleActive} active={active} width='w-64' padding='py-2'/>
      <CustomButton name='Converter' handleClick={toggleActive} active={!active} width='w-64' padding='py-2' />
    </div>
  )
}

export default ButtonsBox
