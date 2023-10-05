import React, { useContext, useState } from 'react'
import './DropDown.css'
import { GameContext } from '../../context/Context'
import { DropDownOptions } from '../../constants/constants'

const DropDown = () => {
  const {ChangeInitialPattern} = useContext(GameContext)
  const [value,setValue] = useState<string>("Select a pattern")
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedOption = e.target.value
    setValue(selectedOption);
    ChangeInitialPattern(selectedOption);
  }
  return (
    <select value={value} onChange={handleChange} className='dropdown'>
        {DropDownOptions.map((option,index)=>(
            <option key={index} value={option.value} className='dropdown-option'>{option.label}</option>
        ))}
    </select>
  )
}

export default DropDown