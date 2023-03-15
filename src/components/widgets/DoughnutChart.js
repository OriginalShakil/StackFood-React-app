import React from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { ChartWrapper } from './Charts.style'
import Chart from 'react-apexcharts'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
    maintainAspectRatio: false,
    centerText: {
        display: true,
        text: '90%',
    },
}

const DoughnutChart = (props) => {
    const { data } = props
    const plugins = [
        {
            beforeDraw: function (chart) {
                let width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx
                ctx.restore()
                let fontSize = (height / 160).toFixed(2)
                ctx.font = fontSize + 'em sans-serif'
                ctx.textBaseline = 'top'
                let text = 'Foo-bar',
                    textX = Math.round(
                        (width - ctx.measureText(text).width) / 2
                    ),
                    textY = height / 2
                ctx.fillText(text, textX, textY)
                ctx.save()
            },
        },
    ]
    const options = {
        colors: ['#1DC976', '#4153B3CC', '#FF7878'],
        dataLabels: {
            enabled: false,
        },
        labels: ['Completed', 'Ongoing', 'Canceled'],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            label: 'Completed',
                            show: true,
                            showAlways: true,
                        },
                    },
                },
            },
        },
    }
    const series = [3, 2, 1]

    return (
        <ChartWrapper>
            <Chart
                type="donut"
                width="100%"
                options={options}
                series={series}
                height={300}
            />
        </ChartWrapper>
    )
}

DoughnutChart.propTypes = {}

export default DoughnutChart
