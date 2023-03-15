import React from 'react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChartWrapper } from './Charts.style'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const LineChart = (props) => {
    const { data } = props
    return (
        <ChartWrapper>
            <Line options={options} data={data} />;
        </ChartWrapper>
    )
}

LineChart.propTypes = {}

export default LineChart
