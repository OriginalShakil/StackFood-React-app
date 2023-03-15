import React from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartWrapper } from './Charts.style'

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
}

const BarChartHorizontal = (props) => {
    const { data } = props
    return (
        <ChartWrapper>
            <Bar options={options} data={data} />
        </ChartWrapper>
    )
}

BarChartHorizontal.propTypes = {}

export default BarChartHorizontal
