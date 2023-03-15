import React from 'react'
import {Typography, Grid, Box, Stack} from '@mui/material'
import { useQuery } from 'react-query'
//import {useReviewListsGet} from "../../hooks/react-query/config/reviews/useReiewLists";
import { ReviewApi } from '../../hooks/react-query/config/reviewlist'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux'
import WishListShimmer from '../wishlist-page/WishListShimmer'
import CustomEmptyResult from "../empty-view/CustomEmptyResult";
import noData from "../../../public/static/nodata.png"
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import ReviewModal from "../RreviewModal";
import {onErrorResponse} from "../ErrorResponse";

const ReviewLists = ({ id }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { isLoading, data, isError, error, refetch } = useQuery(
        [`review-list`, id],
        () => ReviewApi.reviewList(id),{
            onError:onErrorResponse
        }
    )


    return (
        <CustomStackFullWidth justifyContent="center">
            {data ? (
                <Grid container  spacing={1}  >
                    {data?.data.map((review) => {
                        return (
                            <Grid   item md={6} sm={6}xs={12} key={review.id}>
                                <ReviewCard
                                    review={review}
                                    productImageUrl={
                                        global?.base_urls?.product_image_url
                                    }
                                />
                            </Grid>
                        )
                    })}
                    {data?.data?.length===0 && (
                       <Grid item textAlign="center" md={12}>

                           <Stack >
                               <CustomEmptyResult label="No Review found" image={noData}/>
                           </Stack>

                       </Grid>)}

                </Grid>
            ) : (
                <Stack>
                    <WishListShimmer />

                </Stack>
            )}

        </CustomStackFullWidth>
    )
}
export default ReviewLists
