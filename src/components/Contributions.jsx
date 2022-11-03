import React from 'react'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { setContribution, setFrequency } from '../slices/dataSlice'

export const Contributions = () => {
  const contribution = useSelector(state => state.data.contribution)
  const dispatch = useDispatch()

  const onContribution = e => {
    dispatch(setContribution(e.target.value))
  }

  const onFrequency = e => {
    dispatch(setFrequency(+e.target.value))
  }

  return (
    <label className="Label" htmlFor="ContributionsInput">Additional Contributions:
      <div className="SelectContainer">
        <input
          className="Input"
          id="ContributionsInput"
          type="text"
          placeholder="Contributions"
          defaultValue={contribution}
          onChange={e => onContribution(e)}
          />
        <select
          className="Input Select"
          onChange={e => onFrequency(e)}
        >
          <option value={1}>Annually</option>
          <option value={12}>Monthly</option>
        </select>
      </div>
    </label>
  )
}
