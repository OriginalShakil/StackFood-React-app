import React, {useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import BannerSlider from './BannerSlider'
import Container from '@mui/material/Container'

import {useWishListGet} from '../../hooks/react-query/config/wish-list/useWishListGet'
import {setWishList} from '../../redux/slices/wishList'
import {useDispatch} from 'react-redux'
import DeliveryPlace from '../navbar/DeliveryPlace'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useTheme} from '@mui/material/styles'
import ManageSearch from '../navbar/second-navbar/ManageSearch'
import {useRouter} from 'next/router'
import {CustomStackFullWidth} from '../../styled-components/CustomStyles.style'
import PushNotificationLayout from '../PushNotificationLayout'
import {onErrorResponse, onSingleErrorResponse} from "../ErrorResponse";
import {useQuery} from "react-query";
import {BannerApi} from "../../hooks/react-query/config/bannerApi";
import {CategoryApi} from "../../hooks/react-query/config/categoryApi";
import {CampaignApi} from "../../hooks/react-query/config/campaignApi";
import {MostReviewedApi, PopularFoodNearbyApi} from "../../hooks/react-query/config/productsApi";
import {RestaurantsApi} from "../../hooks/react-query/config/restaurantApi";
import FeatureCatagories from "./featured-categories/FeatureCatagories";
import FoodCampaign from "./food-campaign/FoodCampaign";
import BestReviewedFood from "./food-campaign/best-reviewed-foods/BestReviewedFood";
import PopularResturant from "./PopularResturant";
import NearbyPopularFood from "./new-popular-food/NearbyPopularFood";
import Resturant from "./Resturant";
import Cuisines from "./cuisines";


const Homes = () => {
    const [fetchedData, setFetcheedData] = useState({})
    const [enable, setEnable] = useState(false)
    const dispatch = useDispatch()
    const onSuccessHandler = (response) => {
        setFetcheedData(response)
        dispatch(setWishList(fetchedData))
    }
    const {refetch} = useWishListGet(onSuccessHandler)
    let getToken = undefined
    if (typeof window !== 'undefined') {
        getToken = localStorage.getItem('token')
    }
    useEffect(() => {
        if (getToken) {
            refetch().then()
        }
    }, [getToken, fetchedData])
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const router = useRouter()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    const {data, refetch: refetchBannerData} = useQuery(['banner-image'], BannerApi.bannerList, {
        enabled: false, staleTime: 1000 * 60 * 8, onError: onSingleErrorResponse,
    })
    const searchKey = ''
    const {
        data: categoriesData,
        refetch: refetchCategories
    } = useQuery(['category'], () => CategoryApi.categories(searchKey), {
        enabled: false, staleTime: 1000 * 60 * 8, onError: onErrorResponse, cacheTime: 8 * 60 * 1000,
    })
    const {data: campaignData, refetch: refetchCampaignData} = useQuery(['campaign'], CampaignApi.campaign, {
        enabled: false, onError: onSingleErrorResponse
    })
    const {
        data: mostReviewedData,
        refetch: refetchMostReviewed
    } = useQuery(['most-review-product'], MostReviewedApi.reviewed, {
        enabled: false, onError: onSingleErrorResponse,
    })
    const {
        data: popularRestaurantData,
        refetch: refetchPopularRestaurant
    } = useQuery(['popular-restaurant'], RestaurantsApi.popularRestaurants, {
        enabled: false, onError: onSingleErrorResponse
    })
    const {
        data: latestRestaurantData, refetch: latestRestaurantRefetch,
    } = useQuery(['latest-restaurant'], RestaurantsApi.latestRestaurants, {
        enabled: false, onError: onSingleErrorResponse
    })
    const {
        isLoading: isLoadingNearByPopularRestaurantData,
        data: nearByPopularRestaurantData,
        refetch: refetchNearByPopularRestaurantData
    } = useQuery(['popular-food'], PopularFoodNearbyApi.popularFood, {
        enabled: false, onError: onSingleErrorResponse
    })
    useEffect(async () => {
        refetchBannerData()
        refetchCategories()
        refetchCampaignData()
        refetchMostReviewed()
        refetchPopularRestaurant()
        latestRestaurantRefetch()
        refetchNearByPopularRestaurantData()
    }, [])

    return (<>
            <CssBaseline/>
            <Container maxWidth="lg" sx={{mb: {xs: '72px', md: '0'}}}>
                <PushNotificationLayout>
                    <DeliveryPlace/>
                    <CustomStackFullWidth spacing={2}>
                        {isSmall && (<ManageSearch
                                zoneid={zoneid}
                                token={getToken}
                                router={router}
                            />)}
                        <BannerSlider data={data}/>
                        <FeatureCatagories data={categoriesData}/>
                        <FoodCampaign data={campaignData}/>
                        <BestReviewedFood data={mostReviewedData}/>
                        <Cuisines/>
                        <PopularResturant data={popularRestaurantData} latestRestaurantData={latestRestaurantData}/>
                        <NearbyPopularFood data={nearByPopularRestaurantData}
                                           isLoading={isLoadingNearByPopularRestaurantData}/>
                        <Resturant/>
                    </CustomStackFullWidth>
                </PushNotificationLayout>
            </Container>
        </>)
}

export default Homes
