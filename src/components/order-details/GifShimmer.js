import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'

const GifShimmer = (props) => {
    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
            >
                <Skeleton width={200} height={200} variant="circular" />
                <Skeleton width={200} height="20px" variant="text" />
                <Skeleton width={150} height="20px" variant="text" />
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}

GifShimmer.propTypes = {}

export default GifShimmer
