import React from "react"
import roundNumber from "../../hooks/roundNumber"
import setValColor from "../../hooks/setValColor"
import formatNumber from "../../hooks/formatNumber"

export default function FactsBox({ startingAmount, totalContributions, totalGrowth, returnResults, contributionFreq }) {
    let initialInvestment = Number(startingAmount) + Number(totalContributions)
    let netInterest = 0
    let CAGR = 0
    let ROI = 0
    let startingAssetValue = 0
    let finalAssetValue = 0 
    let period = 0
    let _totalGrowth = totalGrowth

    if(isNaN(initialInvestment)){
        initialInvestment = 0
    } 

    try {
        netInterest = roundNumber(totalGrowth - totalContributions - startingAmount)

        if(isNaN(netInterest)){
            netInterest = 0
        } 

        if(isNaN(_totalGrowth)){
            _totalGrowth = 0
        }

        if(contributionFreq === "1"){
            period = roundNumber(returnResults.newDatesArr.length / 12)
        } else {
            period = returnResults.newDatesArr.length
        }

        CAGR = roundNumber((((totalGrowth/(startingAmount + totalContributions)) ** (1/ period)) - 1) * 100)
        if(isNaN(CAGR)){
            CAGR = 0
        }
        if(CAGR < 0) CAGR = 0
        
        ROI = roundNumber(((totalGrowth - (startingAmount+totalContributions)) / (startingAmount+totalContributions)) * 100)
        if(isNaN(ROI)){
            ROI = 0
        }

        startingAssetValue = returnResults.arrWithVal[0]
        finalAssetValue = returnResults.arrWithVal[returnResults.arrWithVal.length - 1]
    } catch(error){
        console.log("error")
    }

    return (
        <section className="facts-box d-flex justify-content-center">
                        <ul>
                            <span className="facts-title">Key Points:</span>
                            <li>Total Investment: {initialInvestment} USD</li>
                            <li>Net Interest Earned: <span className={setValColor(netInterest)}>{formatNumber(netInterest)} USD</span></li>
                            <li>Ending Balance: <span className={setValColor(netInterest)}>{formatNumber(_totalGrowth)} USD</span></li>
                            <li>CAGR: <span className={setValColor(CAGR)}>{formatNumber(CAGR)}%</span></li>
                            <li>ROI: <span className={setValColor(ROI)}>{formatNumber(ROI)}%</span></li>
                            <li className="facts-analysis">This investment would have been worth <span className={setValColor(CAGR)}>{formatNumber(_totalGrowth)} USD</span> by the end of {period} year(s), with a CAGR of <span className={setValColor(CAGR)}>{formatNumber(CAGR)}%</span> and a ROI of <span className={setValColor(ROI)}>{formatNumber(ROI)}%</span>.</li>
                        </ul>
                    </section>
      );  
}
