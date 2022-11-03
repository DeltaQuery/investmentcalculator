import React from 'react'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { setStAmount } from '../slices/dataSlice'

export const StAmount = () => {
  const value = useSelector(state => state.data.stAmount)
  const dispatch = useDispatch()

  const onChange = (e) => {
    dispatch(setStAmount(e.target.value))
  }

  return (
    <label className="Label">Starting Amount:
      <input
        className="Input"
        type="number"
        placeholder="Starting Amount"
        defaultValue={value}
        onChange={ e => onChange(e)} />
    </label>
  )
}