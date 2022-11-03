import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

export const BarC = () => {
  const asset = useSelector(state => state.data.asset)
  const result = useSelector(state => state.data.result)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  let labels = []
  let interestEarned = []
  let contributions = []
  let stAmount = []
  let symbol = ""
  if(asset) symbol = asset["Meta Data"]["2. Symbol"]

  try {
    result.map((element,index) => {
      labels[index] = element.date
      interestEarned[index] = element.interestEarned
      contributions[index] = element.accumulatedContributions
      stAmount[index] = element.stAmount
    })
  } catch (error) {
    //console.log("Error at loading Bar Chart.")
  }

  const options = {
    plugins: {
      title: {
        display: true,
        color: "black",
        text: 'Investment Growth Over Time: ' + symbol,
      },
      legend: {
        labels: {
          color: "black", 
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "black",
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: "black",
        }
      },
    },
    maintainAspectRatio: false,
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Starting Amount',
        data: stAmount,
        backgroundColor: "rgb(32, 167, 226)",
      },
      {
        label: 'Total Contributions',
        data: contributions,
        backgroundColor: "rgb(84,186,108)",
      },
      {
        label: 'Total Interest Earned',
        data: interestEarned,
        backgroundColor: function(context) {
          var index = context.dataIndex
          var value = context.dataset.data[index]
          return value < 0 ? "#F7464A" :  'rgb(249, 183, 25)'
        },
      },
    ],
    maintainAspectRatio: false,
  }

  return (
    <div className="BarC">
    <Bar
      options={options}
      data={data}
    />
  </div>
  )
}
