import React from 'react'

import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Typography, Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import CustomShimmerCard from '../customShimmerForProfile/CustomShimmerCard'
const CustomCheckOutShimmer = () => {
    return (
        <CustomBoxFullWidth>
            <Skeleton width="100%" height={100} variant="rectangular" />
        </CustomBoxFullWidth>
    )
}

export default CustomCheckOutShimmer
