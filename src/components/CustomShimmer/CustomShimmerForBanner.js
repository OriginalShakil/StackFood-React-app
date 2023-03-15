import React from 'react'
import { Box, Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'

const CustomShimmerForBanner = () => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={isXSmall ? 12 : 6}>
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    width="100%"
                    height={isXSmall ? '160px' : '280px'}
                />
            </Grid>
            {!isXSmall && (
                <Grid item xs={12} sm={6}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        width="100%"
                        height={isXSmall ? '160px' : '280px'}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default CustomShimmerForBanner
