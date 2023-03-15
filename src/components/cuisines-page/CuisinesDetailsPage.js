import React from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Grid, Typography} from "@mui/material";
import RestaurantBoxCard from "../restaurant-details/RestaurantBoxCard";
import {useSelector} from "react-redux";
import CustomPageTitle from "../CustomPageTitle";
import CustomShimmerRestaurant from "../CustomShimmer/CustomShimmerRestaurant";
import CustomEmptyResult from "../empty-view/CustomEmptyResult";
import nodata from "../../../public/static/nodata.png"

const CuisinesDetailsPage = ({data,isLoading}) => {
    const { global } = useSelector((state) => state.globalSettings)
    return (
        <CustomStackFullWidth spacing={3} sx={{minHeight:"60vh"}}>
            <CustomPageTitle title="Cuisine Restaurant"/>
            <Grid container spacing={2}>
                {data && data?.restaurants.length >0 &&
                    data?.restaurants?.map((restaurant)=>{
                        return(
                            <Grid item xs={4} sm={3} md={1.5} key={restaurant?.id}>
                                <RestaurantBoxCard
                                    image={restaurant?.logo}
                                    name={restaurant?.name}
                                    rating={restaurant?.avg_rating}
                                    restaurantImageUrl={
                                        global?.base_urls
                                            ?.restaurant_image_url
                                    }
                                    id={restaurant?.id}
                                    active={restaurant?.active}
                                    open={restaurant?.open}
                                    restaurantDiscount={restaurant?.discount}
                                    freeDelivery={restaurant?.free_delivery}
                                />
                            </Grid>
                        )
                    })
                }
                {isLoading && <CustomShimmerRestaurant />}
                {data?.restaurants.length===0 && <CustomEmptyResult image={nodata} label="No Cuisine Restaurant Found"/>}
            </Grid>
        </CustomStackFullWidth>
    );
};

export default CuisinesDetailsPage;
