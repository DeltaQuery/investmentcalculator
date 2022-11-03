import React from 'react'
import { useSelector } from 'react-redux'
import roundNumber from '../utils/roundNumber'

export const Worth = () => {
    const asset = useSelector(state => state.data.asset)
    const result = useSelector(state => state.data.result)
    const period = useSelector(state => state.data.period)
    let endBalance = 0
    let CAGR = 0
    let stAmount = 0
    let contributions = 0
    let ROI = 0

    if (result) {
        endBalance = result[result.length - 1].endBalance
        stAmount = result[result.length - 1].stAmount
        contributions = result[result.length - 1].accumulatedContributions
        ROI = result[result.length - 1].ROI
        CAGR = roundNumber((((endBalance / (stAmount + contributions)) ** (1 / period)) - 1) * 100)
        if (CAGR < 0) CAGR = 0
    }

    function setColor(num) {
        let data = num
        if (typeof num !== "number") {
            data = num.split("%")
            data.splice(1)
            data = data.join()
        }
        if (data > 0) {
            return "GreenColor"
        }
        if (data < 0) {
            return "RedColor"
        }
    }

    return (
        <div className="Container Worth">
            This investment { asset && <span>in <b>{asset["Meta Data"]["2. Symbol"]}</b></span>} would have been worth
            <b><span className={setColor(endBalance)}> {endBalance} </span></b>
            USD by the end of {period} year(s), with a CAGR of
            <b><span className={setColor(CAGR)}> {CAGR}% </span></b>
            and a ROI of
            <b><span className={`tooltip ${setColor(ROI)}`}> {ROI}<span className="tooltiptext">Not accounting for reinvested dividends.</span></span>*</b>
            .
        </div>
    )
}
