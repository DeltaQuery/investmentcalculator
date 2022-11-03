import React from 'react'
import { useSelector } from 'react-redux'

export const Table = () => {
  const result = useSelector(state => state.data.result)
  const frequency = useSelector(state => state.data.frequency)
  const period = useSelector(state => state.data.period)

  return (
    <table>
      <caption style={{marginBottom: 8}}>Detailed table of investment</caption>
      <thead>
        <tr className="Container Worth">
          <th style={{width: "14.284%" }}>Year</th>
          <th style={{width: "14.286%" }} className="HideMobile">Starting Amount</th>
          <th style={{width: "14.286%" }} className="HideMobile">Annual Contribution</th>
          <th style={{width: "14.286%" }} className="HideMobile">Total Contributions</th>
          <th style={{width: "14.286%" }}>Interest Earned</th>
          <th style={{width: "14.286%" }}>End Balance</th>
          <th style={{width: "14.286%" }}>ROI</th>
        </tr>
      </thead>
      <tbody>
        {
          (frequency === 1 && result) &&
          result.map((element, index) => {
            return <tr key={index}>
              <td style={{width: "14.284%" }}>{element.date}</td>
              <td className="HideMobile" style={{width: "14.286%" }}>${element.stAmount}</td>
              <td className="HideMobile" style={{width: "14.286%" }}>${element.contribution}</td>
              <td className="HideMobile" style={{width: "14.286%" }}>${element.accumulatedContributions}</td>
              <td style={{width: "14.286%" }}>${element.interestEarned}</td>
              <td style={{width: "14.286%" }}>${element.endBalance}</td>
              <td style={{width: "14.286%" }}>{element.ROI}</td>
            </tr>
          })
        }
        {
          (frequency === 12 && period > 1 && result) &&
          result.
          filter((element,index) => {
           return (index % 12 === 0) ? element : null
          })
          .map((element, index) => {
            return <tr key={index}>
              <td>{element.date}</td>
              <td className="HideMobile">${element.stAmount}</td>
              <td className="HideMobile">${element.contribution}</td>
              <td className="HideMobile">${element.accumulatedContributions}</td>
              <td>${element.interestEarned}</td>
              <td>${element.endBalance}</td>
              <td>{element.ROI}</td>
            </tr>
          })
        }
        {
          (frequency === 12 && period < 2 && result) &&
          result
          .map((element, index) => {
            return <tr key={index}>
              <td>{element.date}</td>
              <td className="HideMobile">${element.stAmount}</td>
              <td className="HideMobile ContCol">${element.contribution}</td>
              <td className="HideMobile ContCol">${element.accumulatedContributions}</td>
              <td>${element.interestEarned}</td>
              <td>${element.endBalance}</td>
              <td>{element.ROI}</td>
            </tr>
          })
        }

      </tbody>
    </table>
  )
}
