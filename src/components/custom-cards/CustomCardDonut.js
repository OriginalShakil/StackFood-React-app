import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomButtonForCustomCard,
    CustomInnerPaper,
    CustomInnerStack,
    CustomPaperCard,
    CustomTypographyCard,
} from './CustomCards.style'
import Typography from '@mui/material/Typography'
import DoughnutChart from '../widgets/DoughnutChart'

const CustomCardDonut = (props) => {
    return (
        <CustomPaperCard minHeightForCustomCard>
            <DoughnutChart />
        </CustomPaperCard>
    )
}

CustomCardDonut.propTypes = {}

export default CustomCardDonut
