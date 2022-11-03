import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

export const PieC = () => {
    const asset = useSelector(state => state.data.asset)
    const result = useSelector(state => state.data.result)

    ChartJS.register(ArcElement, Tooltip, Legend)

    let interestEarned = 0
    let contributions = 0
    let stAmount = 0
    let interestBg = 'rgb(249, 183, 25)'
    let symbol = ""
    if(asset) symbol = asset["Meta Data"]["2. Symbol"]

    try {
        contributions = result[result.length - 1].accumulatedContributions
        stAmount = result[result.length - 1].stAmount
        interestEarned = result[result.length - 1].interestEarned
        if (interestEarned < 0) {
            interestBg = "#F7464A"
        } else {
            interestBg = 'rgb(249, 183, 25)'
        }
        if (isNaN(interestEarned)) {
            interestEarned = 0
        }
    } catch (error) {
        //console.log("Error at loading Pie Chart.")
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Investment Balance: ' + symbol,
                color: "black"
            },
            legend: {
                display: true,
                labels: {
                    color: "black",
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets
                        return datasets[0].data.map((data, i) => ({
                            text: `${chart.data.labels[i]} ${data} USD`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                }
            },
        },
        responsive: true
    }

    const data = {
        labels: ['Total Contributions', 'Total Interest Earned', 'Starting Amount'],
        datasets: [
            {
                data: [contributions, interestEarned, stAmount],
                backgroundColor: [
                    'rgb(84,186,108)',
                    interestBg,
                    'rgb(32, 167, 226)'
                ],
                borderColor: [
                    'rgb(84,186,108)',
                    'rgb(249, 183, 25)',
                    'rgb(32, 167, 226)'
                ],
                borderWidth: 0,
            },
        ],
    }

  return (
    <div className="PieContainer">
        <div className="pie-centered-container">
            <Pie
                data={data}
                options={options}
            />
        </div>

    </div>
  )
}
