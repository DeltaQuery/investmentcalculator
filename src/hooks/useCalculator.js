import roundNumber from "../utils/roundNumber"
import { useSelector, useDispatch } from "react-redux"
import { setResult } from "../slices/dataSlice"
import { useEffect } from "react"

export default function useCalculator() {
    //ARREGLAR QUE AL USAR UN AÑO, PERIODO MUESTRA 2. Y AL USAR 8, MUESTRA 9. Y ASI.
    const dispatch = useDispatch()
    const asset = useSelector(state => state.data.asset)
    const date = useSelector(state => state.data.date)
    const period = useSelector(state => state.data.period)
    const frequency = useSelector(state => state.data.frequency)
    const contribution = useSelector(state => state.data.contribution)
    const stAmount = useSelector(state => state.data.stAmount)

    useEffect(() => {
        if (asset && date) {
            const datesArr = Object.keys(asset["Monthly Adjusted Time Series"]).reverse()

            const assetAdjCloses = Object.values(asset["Monthly Adjusted Time Series"]).reverse().map((element, index) => {
                return {
                    date: datesArr[index].slice(0, 7),
                    price: element["5. adjusted close"]
                }
            })

            const first = assetAdjCloses.findIndex(element => {
                return element.date === date
            })

            const last = first + (period * 12)

            let depAsset = assetAdjCloses.slice(first, last)

            //FREQ ANUAL
            if (frequency === 1) {
                let lastElement = depAsset[depAsset.length - 1]
                depAsset = depAsset.filter((element, index) => {
                    if (((index) % 12) === 0) return element
                })
                if (depAsset[depAsset.length - 1].date !== lastElement.date) {
                    depAsset.push(lastElement)
                }
            }

            const assetWithData = depAsset.map((element, index) => {
                return {
                    date: element.date,
                    price: roundNumber(element.price),
                    stAmount: roundNumber(stAmount),
                    stAmQ:
                        roundNumber((100 / depAsset[0].price) * stAmount / 100),
                    contQ:
                        roundNumber(contribution / element.price),
                    stAmValue: roundNumber((stAmount / depAsset[0].price) * roundNumber(element.price)),
                    contribution: roundNumber(contribution),
                    accumulatedContributions: roundNumber(contribution * (index + 1)),
                }
            })

            const assetWithInterest = assetWithData.map((element, index) => {
                return {
                    ...element,
                    assetAccum: roundNumber(
                        assetWithData.slice(0, index + 1).map(a => a.contQ).reduce(
                            (prevVal, currentVal) => prevVal + currentVal, 0)),
                    interestEarned:
                        index === 0 ? 0
                            :
                            roundNumber(
                                (((
                                    assetWithData.slice(0, index + 1).map(a => a.contQ).reduce(
                                        (prevVal, currentVal) => prevVal + currentVal, 0))
                                    *
                                    element.price)
                                -
                                (element.stAmount + element.accumulatedContributions)
                            )
                            +
                            element.stAmValue),
                    endBalance:
                        index === 0 ? element.accumulatedContributions + element.stAmount
                            :
                            roundNumber(
                                ((
                                    assetWithData.slice(0, index + 1).map(a => a.contQ).reduce(
                                        (prevVal, currentVal) => prevVal + currentVal, 0))
                                *
                                element.price
                            )
                            +
                            element.stAmValue),
                    ROI: index === 0 ? "0.00%" :
                    roundNumber((100 / (element.accumulatedContributions + element.stAmount)) *
                    (((
                        assetWithData.slice(0, index + 1).map(a => a.contQ).reduce(
                            (prevVal, currentVal) => prevVal + currentVal, 0))
                    *
                    element.price
                )
                +
                element.stAmValue)-100)+"%"
                }
            })

            //console.log(assetWithInterest)
            dispatch(setResult(assetWithInterest))
        }
    }, [asset, date, period, frequency, contribution, stAmount])
}
