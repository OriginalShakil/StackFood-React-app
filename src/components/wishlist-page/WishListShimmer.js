import React from 'react'

import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Typography, Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import CustomShimmerCard from '../customShimmerForProfile/CustomShimmerCard'
import {
    WishlistGrid,
    IconButtonGrid,
    WishlistBox,
    ArrowButton,
    CatagoriName,
} from './WishList.style'
const WishListShimmer = () => {
    return (
        <CustomBoxFullWidth>
            <Grid container item md={12} xs={12} spacing={2}>
                {[...Array(3)].map((i) => {
                    return (
                        <Grid item md={6} xs={12}>
                            <WishlistBox>
                                <Grid
                                    container
                                    md={12}
                                    xs={12}
                                    spacing={{ xs: 1 }}
                                >
                                    <Grid item md={2} xs={2}>
                                        {/* <Typography>Veg</Typography> */}
                                        <Skeleton
                                            variant="rounded"
                                            width="100%"
                                            height={110}
                                        />
                                    </Grid>
                                    <Grid item md={8} xs={8}>
                                        <Stack padding=".6rem">
                                            <Skeleton
                                                variant="text"
                                                width="100%"
                                                height={20}
                                                animation="wave"
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="50%"
                                                height={20}
                                                animation="wave"
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="30%"
                                                height={20}
                                                animation="wave"
                                            />
                                        </Stack>
                                    </Grid>
                                    <IconButtonGrid item md={2} xs={2}>
                                        <Skeleton
                                            variant="text"
                                            width={30}
                                            height={60}
                                        />

                                        <Skeleton
                                            variant="text"
                                            width={30}
                                            height={60}
                                        />
                                    </IconButtonGrid>
                                </Grid>
                            </WishlistBox>
                        </Grid>
                    )
                })}
                <Grid item md={6} xs={12}>
                    <WishlistBox>
                        <Grid container md={12} xs={12} spacing={{ xs: 1 }}>
                            <Grid item md={2} xs={2}>
                                {/* <Typography>Veg</Typography> */}
                                <Skeleton
                                    variant="rounded"
                                    width="100%"
                                    height={110}
                                />
                            </Grid>
                            <Grid item md={8} xs={8}>
                                <Stack padding=".6rem">
                                    <Skeleton
                                        variant="text"
                                        width="100%"
                                        height={20}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="50%"
                                        height={20}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="30%"
                                        height={20}
                                        animation="wave"
                                    />
                                </Stack>
                            </Grid>
                            <IconButtonGrid item md={2} xs={2}>
                                <Skeleton
                                    variant="text"
                                    width={30}
                                    height={60}
                                />

                                <Skeleton
                                    variant="text"
                                    width={30}
                                    height={60}
                                />
                            </IconButtonGrid>
                        </Grid>
                    </WishlistBox>
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default WishListShimmer
