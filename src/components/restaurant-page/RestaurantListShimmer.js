import React from 'react'
import PropTypes from 'prop-types'
import { Grid, MenuItem, Select, Stack } from '@mui/material'
import CustomPageTitle from '../CustomPageTitle'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import CustomSearch from '../custom-search/CustomSearch'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomePagination from '../pagination/Pagination'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const RestaurantListShimmer = (props) => {
    const theme = useTheme()

    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={12}>
                <Skeleton variant="text" width={130} height={20} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <Skeleton variant="rectangle" width={200} height={40} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangle" width={200} height={40} />
            </Grid>
            <Grid item xs={12} md={4} align="right">
                <FormControl>
                    <Skeleton variant="rectangle" width={80} height={40} />
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                md={12}
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
            >
                {[...Array(12)].map((item) => {
                    return (
                        <Grid item xs={4} sm={3} md={2} align="center">
                            <CustomStackFullWidth
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Skeleton
                                    variant="rectangle"
                                    width={isXSmall ? '100%' : 153}
                                    height={isXSmall ? 80 : 153}
                                />
                                <Skeleton
                                    variant="text"
                                    width={100}
                                    height={20}
                                />
                            </CustomStackFullWidth>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={12} md={12} align="center">
                <Skeleton variant="text" width={130} height={20} />
            </Grid>
        </Grid>
    )
}

RestaurantListShimmer.propTypes = {}

export default RestaurantListShimmer
