import React from 'react'
import BarChartVertical from '../../../../components/widgets/BarChartVertical'
import { Stack } from '@mui/material'
import BarChartHorizontal from '../../../../components/widgets/BarChartHorizontal'
import LineChart from '../../../../components/widgets/LineChart'
import MultiAxisLineChart from '../../../../components/widgets/MultiAxisLineChart'
import PieChart from '../../../../components/widgets/PieChart'
import DoughnutChart from '../../../../components/widgets/DoughnutChart'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import {
    BarChartData,
    BarChartHorizontalData,
    DoughnutChartData,
    LineChartData,
    MultiAxisLineChartData,
    PieChartData,
} from './ChartsData'

const Charts = () => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Charts')}</title>
            {/* </Helmet> */}
            <Stack
                spacing={5}
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <BarChartVertical data={BarChartData} />
                <BarChartHorizontal data={BarChartHorizontalData} />
                <LineChart data={LineChartData} />
                <MultiAxisLineChart data={MultiAxisLineChartData} />
                <PieChart data={PieChartData} />
                <DoughnutChart data={DoughnutChartData} />
            </Stack>
        </>
    )
}

export default Charts
