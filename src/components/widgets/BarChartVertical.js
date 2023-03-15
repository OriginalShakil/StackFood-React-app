import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { ChartWrapper } from './Charts.style'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart Vertical',
        },
    },
}

const BarChartVertical = (props) => {
    const { data } = props
    return (
        <ChartWrapper>
            <Bar options={options} data={data} />
        </ChartWrapper>
    )
}

BarChartVertical.propTypes = {}

export default BarChartVertical
