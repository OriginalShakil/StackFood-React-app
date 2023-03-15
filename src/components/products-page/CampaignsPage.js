import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import Filter from './Filter'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import ProductList from './ProductList'
import { useQuery } from 'react-query'
import { CampaignApi } from '../../hooks/react-query/config/campaignApi'
import FoodOrRestaurant from './FoodOrRestaurant'
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import RestaurantsData from '../category/RestaurantsData'

const CampaignsPage = () => {
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['campaign'],
        CampaignApi.campaign
    )
    return (
        <>
            <Grid container >
                <Grid item xs={12} sm={12} md={12} container spacing={3}>
                    {data?.data?.products?.length === 0 && (
                        <CustomEmptyResult />
                    )}
                    {data?.data ? (
                        <>
                            <ProductList
                                product_list={data?.data}
                                productType="campaigns"
                            />
                        </>
                    ) : (
                        <CustomShimmerForBestFood />
                    )}
                </Grid>
            </Grid>
        </>
    )
}
export default CampaignsPage
