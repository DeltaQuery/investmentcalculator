import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import useCalculator from '../hooks/useCalculator'
import { getAsset } from '../services/getAsset'
import { setAsset } from '../slices/dataSlice'
import { setInputGlow } from '../slices/uiSlice'

export const Asset = () => {
  const dispatch = useDispatch()
  const inputGlow = useSelector(state => state.ui.inputGlow)

  const handleChange = async (e) => {
    const res = await getAsset(e.target.value)
    dispatch(setAsset(res.data))
    if (inputGlow === 0) {
      dispatch(setInputGlow(1))
    }
  }

  useCalculator()

  return (
    <label className="Label">Asset:
      <select
        className={`Input ${inputGlow === 0 && 'input-glow'}`}
        onChange={e => handleChange(e)}
        defaultValue="def"
      >
        <option value="def" disabled hidden>Pick an asset!</option>
        <option value="SPY">SP500</option>
        <option value="QQQ">NASDAQ</option>
        <option value="MSFT">Microsoft</option>
        <option value="AAPL">Apple</option>
        <option value="AMZN">Amazon</option>
        <option value="DIS">Disney</option>
        <option value="GOOGL">Google</option>
        <option value="intc">Intel</option>
        <option value="IBM">IBM</option>
        <option value="AMD">AMD</option>
        <option value="BAC">Bank of America</option>
        <option value="BRK-A">Berkshire Hathaway</option>
        <option value="HD">Home Depot</option>
        <option value="JNJ">J & J</option>
        <option value="MCD">McDonald's</option>
        <option value="PG">Procter & Gamble</option>
        <option value="V">Visa</option>
        <option value="WMT">Walmart</option>
        <option value="XOM">Exxon</option>
      </select>
    </label>
  )
}
