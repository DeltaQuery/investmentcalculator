import React from 'react'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { setPeriod } from '../slices/dataSlice'

export const Years = () => {
  const value = useSelector(state => state.data.period)
  const dispatch = useDispatch()

  const onChange = (e) => {
    dispatch(setPeriod(e.target.value))
  }

  return (
    <label className="Label">Period:
      <select
          className="Input LongSelect"
          onChange={e => onChange(e)}
          value={value}
        >
          <option value={1}>1 Year</option>
          <option value={2}>2 Years</option>
          <option value={3}>3 Years</option>
          <option value={4}>4 Years</option>
          <option value={5}>5 Years</option>
          <option value={6}>6 Years</option>
          <option value={7}>7 Years</option>
          <option value={8}>8 Years</option>
          <option value={9}>9 Years</option>
          <option value={10}>10 Years</option>
          <option value={11}>11 Year</option>
          <option value={12}>12 Years</option>
          <option value={13}>13 Years</option>
          <option value={14}>14 Years</option>
          <option value={15}>15 Years</option>
          <option value={16}>16 Years</option>
          <option value={17}>17 Years</option>
          <option value={18}>18 Years</option>
          <option value={19}>19 Years</option>
          <option value={20}>20 Years</option>
        </select>
    </label>
  )
}
