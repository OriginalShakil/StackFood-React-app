import React from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { ChartWrapper } from './Charts.style'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = (props) => {
    const { data } = props
    return (
        <ChartWrapper>
            <Pie data={data} options={{ responsive: true }} />
        </ChartWrapper>
    )
}

PieChart.propTypes = {}

export default PieChart
