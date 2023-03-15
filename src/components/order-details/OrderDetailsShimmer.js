import React from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import { Grid } from '@mui/material'

const OrderDetailsShimmer = () => {
    return (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="flex-start"
            height="70vh"
            spacing={2}
            mt="1rem"
            py="1rem"
        >
            <Skeleton width={200} height="20px" variant="text" />
            <Skeleton width={200} height="20px" variant="text" />
            <CustomPaperBigCard>
                <Grid container spacing={2} py="1rem">
                    <Grid item xs={12} sm={6} md={6} container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} align="center">
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} align="center">
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={100}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} align="center">
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={100}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} align="center">
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} align="center">
                            <Skeleton
                                width={120}
                                height={120}
                                variant="rectangular"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} align="left">
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={100}
                                height="20px"
                                variant="text"
                            />
                            <Skeleton
                                width={200}
                                height="20px"
                                variant="text"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </CustomStackFullWidth>
    )
}

export default OrderDetailsShimmer
