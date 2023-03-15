import React, {useState} from 'react'
import { Typography, Grid, Box, Card, Stack } from '@mui/material'
import { WishlistBox } from '../../components/wishlist-page/WishList.style'
import img from '../../../public/static/checkout/Rectangle 8221.png'
import { getAmount } from '../../utils/customFunctions'
import { CustomTypographyGray } from '../../styled-components/CustomTypographies.style'
import StarIcon from '@mui/icons-material/Star'
import CustomImageContainer from "../CustomImageContainer";
import ReviewModal from "../RreviewModal";
const ReviewCard = ({ review, productImageUrl }) => {
    const [openModal,setOpenModal]=useState(false)
    const imageUrl = `${productImageUrl}/${review.food_image}`
    return (
        <WishlistBox>
            <Grid item container spacing={{ xs: 1,md:2 }} md={12} xs={12}>
                <Grid item md={3} sm={3} xs={4}>
                    {/* <Typography>Veg</Typography> */}

                    <CustomImageContainer src={imageUrl} alt={review.food_name}  width="100%" height="100px" objectFit="contained" borderRadius=".7rem" />
                </Grid>
                <Grid item md={9} sm={9}xs={8}>
                    <Stack >
                        <Typography variant="h5">{review.food_name}</Typography>
                        <Typography variant="h5">
                            {review.rating}
                            <StarIcon sx={{ width: '16px', color: 'orange' }} />
                        </Typography>
                        <Typography variant="h6">{review.customer_name}</Typography>
                        <CustomTypographyGray sx={{fontSize:"13px",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            cursor:"pointer"
                        }} onClick={() => setOpenModal(true)}>
                            {review.comment}
                        </CustomTypographyGray>
                    </Stack>
                </Grid>
            </Grid>
            <ReviewModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                review={review}
                productImageUrl={productImageUrl}
            />
        </WishlistBox>
    )
}
export default ReviewCard
