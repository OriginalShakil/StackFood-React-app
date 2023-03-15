import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Grid,
    IconButton,
    Pagination,
    Stack,
    Typography,
} from '@mui/material'
import { Dropdown } from 'react-bootstrap'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'


import { useWishListGet } from '../../hooks/react-query/config/wish-list/useWishListGet'
import { useWishListDelete } from '../../hooks/react-query/config/wish-list/useWishListDelete'
import { useWishListResDelete } from '../../hooks/react-query/config/wish-list/useWishListResDelete'
import {useDispatch, useSelector} from 'react-redux'
import {removeWishListFood, removeWishListRes} from "../../redux/slices/wishList";
import emptyFood from "../../../public/static/resturants.png"

import {
    WishlistGrid,
    IconButtonGrid,
    WishlistBox,
    ArrowButton,
} from './WishList.style'
import WishListShimmer from './WishListShimmer'
import WishlistCard from './WishlistCard'
import WishListRestaurantCard from './WishListRestaurantCard'
import { useTranslation } from 'react-i18next'
import FoodOrRestaurant from '../products-page/FoodOrRestaurant'
import CustomEmptyResult from "../empty-view/CustomEmptyResult";
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";


const WishlistPage = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    // const [fetchedData, setFetcheedData] = useState()
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const {wishLists}=useSelector((state)=>state.wishList)




    // const onSuccessHandlerForDelete = (res) => {
    //
    //     if(res){
    //         dispatch(removeWishListFood(res))
    //     }
    // }
    // const { mutate } = useWishListDelete(onSuccessHandlerForDelete)
    //
    // const deleteWishlistItem = (id) => {
    //     mutate(id, {
    //         onSuccess: onSuccessHandlerForDelete(id),
    //
    //     })
    // }
    const onSuccessHandlerForResDelete = (res) => {

     if(res){
         dispatch(removeWishListRes(res))
     }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )
    const deleteWishlistRes = (id) => {

        restaurantMutate(id, {
            onSuccess: onSuccessHandlerForResDelete(id),
        })
    }

    useEffect(()=>{

    },[wishLists])


    return (
        <CustomPaperBigCard >
            <Box minHeight="500px">
                <FoodOrRestaurant
                    foodOrRestaurant={foodOrRestaurant}
                    setFoodOrRestaurant={setFoodOrRestaurant}
                />
                <WishlistGrid container item md={12}>
                    <Grid item md={8} xs={12}>
                        <Typography sx={{ fontSize: '26px', color:(theme)=>theme.palette.neutral[1000] }}>
                            {t('Your Favourites')}
                        </Typography>
                    </Grid>

                </WishlistGrid>
                {wishLists ? (
                    <>
                        {foodOrRestaurant === 'products' && (
                            <Grid container item md={12} xs={12} spacing={2}>
                                {wishLists?.food?.map((product) => {
                                    return (
                                        <Grid item md={6} sm={6}xs={12}>
                                            <WishlistCard
                                                key={product?.id}
                                                product={product}
                                                productImageUrl={
                                                    global?.base_urls
                                                        ?.product_image_url
                                                }
                                                // deleteWishlistItem={
                                                //     deleteWishlistItem
                                                // }

                                            />
                                        </Grid>
                                    )
                                })}
                                {wishLists?.food?.length===0 && (
                                    <CustomEmptyResult label={t("No Favourite Food Found")} image={emptyFood}/>
                                )}
                            </Grid>
                        )}
                        {foodOrRestaurant === 'restaurants' && (
                            <Grid container item md={12} xs={12} spacing={2}>
                                {wishLists?.restaurant?.map((restaurantItem) => {
                                    return (
                                        <Grid item md={6} sm={6} xs={12}>
                                            <WishListRestaurantCard
                                                key={restaurantItem?.id}
                                                restaurant={restaurantItem}
                                                deleteWishlistRes={
                                                    deleteWishlistRes
                                                }
                                                restaurantImageUrl={
                                                    global?.base_urls
                                                        ?.restaurant_image_url
                                                }
                                            />
                                        </Grid>
                                    )
                                })}
                                {wishLists?.restaurant?.length===0 && (
                                    <CustomEmptyResult label={t("No Favourite Restaurant Found")} image={emptyFood}/>
                                )}
                            </Grid>
                        )}
                    </>
                ) : (
                    <WishListShimmer />
                )}


                {/*<Box*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        justifyContent: 'center',*/}
                {/*        padding: '30px 0px 70px 0px',*/}
                {/*    }}*/}
                {/*>*/}

                {/*</Box>*/}
            </Box>
        </CustomPaperBigCard>

    )
}

export default WishlistPage
