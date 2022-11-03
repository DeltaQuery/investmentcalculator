import React from 'react'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { setDate } from '../slices/dataSlice'
import { setInputGlow } from '../slices/uiSlice'

export const StDate = () => {
  const asset = useSelector(state => state.data.asset)
  const date = useSelector(state => state.data.date)
  const inputGlow = useSelector(state => state.ui.inputGlow)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setDate(e.target.value))
    if (inputGlow === 1) {
      dispatch(setInputGlow(2))
    }
  }

  return (
    <label className="Label">Starting Date:
      <input
        className={`Input LongInput DateInput Select ${inputGlow === 1 && 'input-glow'}`}
        type="month"
        disabled={!asset}
        min={asset ? Object.keys(asset["Monthly Adjusted Time Series"]).reverse()[0].slice(0,7) : ""}
        max={asset ? Object.keys(asset["Monthly Adjusted Time Series"])[0].slice(0,7) : ""}
        value={date}
        onChange={e => handleChange(e)}
        placeholder="Date" />
    </label>
  )
}
