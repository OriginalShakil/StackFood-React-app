import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import CustomePagination from '../pagination/Pagination'
import FoodCard from '../food-card/FoodCard'

const RestaurantsData = ({
    resData,
    page_limit = 10,
    offset,
    setOffset,
    global,
}) => {
    return (
        <>
            {resData?.data?.restaurants?.map((res) => (
                <Grid key={res?.id} item md={1.5} sm={4} xs={4}>
                    <RestaurantBoxCard
                        image={res?.logo}
                        name={res?.name}
                        rating={res?.avg_rating}
                        restaurantImageUrl={
                            global?.base_urls?.restaurant_image_url
                        }
                        id={res?.id}
                        active={res?.active}
                        open={res?.open}
                    />
                </Grid>
            ))}
            {resData?.data?.restaurants?.length > page_limit ? (
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomePagination
                        total_size={resData?.data?.restaurants?.length}
                        page_limit={page_limit}
                        offset={offset}
                        setOffset={setOffset}
                    />
                </Grid>
            ) : (
                ''
            )}
        </>
    )
}

RestaurantsData.propTypes = {}

export default RestaurantsData
