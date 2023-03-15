import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import SearchResult from './SearchResult'
import { Grid } from '@mui/material'
import FoodOrRestaurant from './FoodOrRestaurant'
import FoodNavigation from '../restaurant-details/foodSection/FoodNavigation'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import Image from 'next/image'
import ProductList from './ProductList'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import RestaurantsData from '../category/RestaurantsData'
import FilterWithSideDrawer from './FilterWithSideDrawer'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import Skeleton from '@mui/material/Skeleton'
import noData from "../../../public/static/food.png"
import noRestaurants from "../../../public/static/resturants.png"
import {useRouter} from "next/router";
import {foodCount} from "../../utils/customFunctions";

const SearchFilterWithResults = ({
    searchValue,
    count,
    foodOrRestaurant,
    setFoodOrRestaurant,
    data,
    isLoading,
    offset,
    page_limit,
    setOffset,
    global,
    handleFilter,
    handleClearAll,
    isNetworkCalling,
}) => {

    return (
        <CustomStackFullWidth spacing={2} sx={{ minHeight: '53vh' }}>
            {isNetworkCalling ? (
                <Skeleton width="100%" height="40px" variant="rectangular" />
            ) : (
                <SearchResult
                    searchValue={searchValue}
                    count={foodCount(data?.data?.products)}
                    foodOrRestaurant={foodOrRestaurant}
                />
            )}

            <CustomPaperBigCard minheight="50vh">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} align="center">
                        <FoodOrRestaurant
                            foodOrRestaurant={foodOrRestaurant}
                            setFoodOrRestaurant={setFoodOrRestaurant}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} align="right">
                        <FilterWithSideDrawer
                            handleFilter={handleFilter}
                            handleClearAll={handleClearAll}
                            foodOrRestaurant={foodOrRestaurant}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} container spacing={3}>
                        {foodOrRestaurant === 'products' && (
                            <>
                                {data?.data?.products?.length > 0 &&
                                    !isLoading && (
                                        <ProductList
                                            product_list={data?.data}
                                            offset={offset}
                                            page_limit={page_limit}
                                            setOffset={setOffset}
                                        />
                                    )}
                                {data?.data?.products?.length === 0 && (
                                    <CustomEmptyResult label="No food found"  image={noData}/>
                                )}
                            </>
                        )}
                        {foodOrRestaurant === 'restaurants' && (
                            <>
                                {data && !isLoading && (
                                    <RestaurantsData
                                        resData={data}
                                        offset={offset}
                                        page_limit={page_limit}
                                        setOffset={setOffset}
                                        global={global}
                                    />
                                )}
                                {data?.data?.restaurants?.length === 0 && (
                                    <CustomEmptyResult label="No restaurant found"  image={noRestaurants}/>
                                )}
                            </>
                        )}
                        {isLoading && <CustomShimmerForBestFood />}
                        {isNetworkCalling && <CustomShimmerForBestFood />}
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </CustomStackFullWidth>
    )
}

SearchFilterWithResults.propTypes = {}

export default SearchFilterWithResults
