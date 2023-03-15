import React, {useEffect, useRef, useState} from 'react';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import {useGetRecommendProducts} from "../../hooks/react-query/config/useGetRecommendProduct";
import {CustomPaperBigCard, CustomStackFullWidth, SliderCustom} from "../../styled-components/CustomStyles.style";
import {Grid, useTheme} from "@mui/material";
import FoodCard from "../food-card/FoodCard";
import {useDispatch, useSelector} from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomPageTitle from "../CustomPageTitle";

import {settings} from "./SliderSettings";

import WishlistCard from "../wishlist-page/WishlistCard";
import {RTL} from "../RTL/RTL";
import WishListShimmer from "../wishlist-page/WishListShimmer";
import {removeWishListFood} from "../../redux/slices/wishList";
import {toast} from "react-hot-toast";
import {useWishListDelete} from "../../hooks/react-query/config/wish-list/useWishListDelete";


const RecommendProduct = ({ restaurant_id}) => {
    const dispatch=useDispatch()
    const theme=useTheme()
    const matches = useMediaQuery('(max-width:1180px)')
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.up('sm'))
    const { global } = useSelector((state) => state.globalSettings)
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(3)

    const foodCampaignSliderRef = useRef(null)
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

 const {data,refetch,isRefetching,isLoading}=useGetRecommendProducts({restaurant_id,page_limit,offset})
    useEffect(() => {
        refetch()
    }, [restaurant_id]);



    return (
        <>
            {data?.total_size > 0  &&
                <CustomPaperBigCard padding={isSmall && ".5rem"} >
                <CustomStackFullWidth>
                    <Grid container spacing={{xs:.5,md:2}} >
                        <Grid xs={12} sm={12} md={12} align="center"  paddingTop="5px" >
                            <CustomPageTitle title='Recommend Food'/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}  sx={{paddingTop:'5px'}} >
                            <SliderCustom languageDirection={languageDirection} sx={{paddingTop:'5px'}} gap="15px">
                                <Slider ref={foodCampaignSliderRef}  {...settings}  >
                                    {data?.products?.map((product) => {
                                        if(product?.variations === null || product?.variations[0]?.values || product?.variations?.length === 0){
                                            return (
                                                <div key={product?.id} dir={languageDirection}>
                                                    <WishlistCard
                                                        recommenedproducts="true"
                                                        product={product}
                                                        productImageUrl={
                                                            global?.base_urls?.product_image_url
                                                        }

                                                    />
                                                </div>
                                            )
                                        }
                                    })}
                                </Slider>
                            </SliderCustom>
                            {isLoading &&  <WishListShimmer />}
                        </Grid>
                    </Grid>
                </CustomStackFullWidth>
                </CustomPaperBigCard>
            }

        </>
    );
};

export default RecommendProduct;
