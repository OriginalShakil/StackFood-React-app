import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {
    Autocomplete,
    Grid,
    InputLabel,
    Paper,
    Typography,
} from '@mui/material'
import RestaurantDetailsForm from './RestaurantDetailsForm'
import ImageSection from './ImageSection'
import MapForRestaurantJoin from './MapForRestaurantJoin'
import OwnerForm from './OwnerForm'
import RestaurantLoginForm from './RestaurantLoginForm'
import LoadingButton from '@mui/lab/LoadingButton'
import Skeleton from '@mui/material/Skeleton'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import CustomMapSearch from './CustomMapSearch'
import GoogleMapComponent from '../landingpage/google-map/GoogleMapComponent'
import CustomSelectWithFormik from '../custom-select/CustomSelectWithFormik'
import ImageUploaderWithPreview from '../single-file-uploader-with-preview/ImageUploaderWithPreview'
import { CustomTypography } from '../custom-tables/Tables.style'

const RestaurantJoinShimmer = (props) => {
    return (
        <CustomBoxFullWidth padding="2rem">
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <CustomStackFullWidth alignItems="center">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </CustomStackFullWidth>
                </Grid>
                <Grid item xs={12}>
                    <CustomBoxFullWidth>
                        <CustomStackFullWidth
                            alignItems="center"
                            spacing={2}
                            mb="1.5rem"
                        >
                            <Skeleton width="100px" variant="text" />
                            <Skeleton
                                width="200px"
                                height="150px"
                                variant="rectangular"
                            />
                        </CustomStackFullWidth>
                        <CustomStackFullWidth
                            alignItems="center"
                            spacing={2}
                            mb=".8rem"
                        >
                            <Skeleton width="100px" variant="text" />
                            <Skeleton
                                width="1000px"
                                height="150px"
                                variant="rectangular"
                            />
                        </CustomStackFullWidth>
                    </CustomBoxFullWidth>
                </Grid>
                <Grid item xs={12} md={12}>
                    <CustomBoxFullWidth>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <CustomStackFullWidth mb="1rem">
                                    <Skeleton
                                        width="100%"
                                        height="40px"
                                        variant="rectangular"
                                    />
                                </CustomStackFullWidth>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Skeleton
                                    width="100%"
                                    height="300px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </CustomBoxFullWidth>
                </Grid>
                <Grid item xs={12}>
                    <CustomBoxFullWidth>
                        <CustomStackFullWidth
                            alignItems="center"
                            mb="1.5rem"
                            mt="1rem"
                        >
                            <Skeleton width="100px" variant="text" />
                        </CustomStackFullWidth>
                        <Grid container>
                            <CustomStackFullWidth
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                    md: 'row',
                                }}
                                alignItems="center"
                                spacing={5}
                                mb="1.5rem"
                            >
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </CustomStackFullWidth>
                            <CustomStackFullWidth
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                    md: 'row',
                                }}
                                alignItems="center"
                                spacing={2}
                            >
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </CustomStackFullWidth>
                        </Grid>
                    </CustomBoxFullWidth>
                </Grid>
                <Grid item xs={12}>
                    <CustomBoxFullWidth>
                        <CustomStackFullWidth
                            alignItems="center"
                            mb="1.5rem"
                            mt="1rem"
                        >
                            <Skeleton width="100px" variant="text" />
                        </CustomStackFullWidth>
                        <Grid container>
                            <CustomStackFullWidth
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                    md: 'row',
                                }}
                                alignItems="center"
                                spacing={5}
                                mb="1.5rem"
                            >
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </CustomStackFullWidth>
                            <CustomStackFullWidth
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                    md: 'row',
                                }}
                                alignItems="center"
                                spacing={2}
                            >
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                                <Skeleton
                                    width="50%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </CustomStackFullWidth>
                        </Grid>
                    </CustomBoxFullWidth>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton
                        width="100%"
                        height="40px"
                        variant="rectangular"
                    />
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}

RestaurantJoinShimmer.propTypes = {}

export default RestaurantJoinShimmer
