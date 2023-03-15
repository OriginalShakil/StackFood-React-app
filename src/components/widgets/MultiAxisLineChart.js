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
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const MultiAxisLineChart = (props) => {
    const { data } = props
    return (
        <ChartWrapper>
            <Line options={options} data={data} />;
        </ChartWrapper>
    )
}

MultiAxisLineChart.propTypes = {}

export default MultiAxisLineChart
