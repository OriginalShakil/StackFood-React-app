import React from 'react'
import { Box, Button, Grid, IconButton, Typography, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import {
    WishlistGrid,
    IconButtonGrid,
    WishlistBox,
    ArrowButton,
    CatagoriName,
} from './WishList.style'
import StarIcon from '@mui/icons-material/Star'
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomImageContainer from "../CustomImageContainer";
import CustomDialogConfirm from "../custom-dialog/confirm/CustomDialogConfirm";
import {t} from "i18next";
const WishListRestaurantCard = ({
    restaurantImageUrl,
    restaurant,
    deleteWishlistRes,
}) => {
    const theme = useTheme()
    const [openModal, setOpenModal] = React.useState(false)
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const { name, cover_photo, logo, id, rating, address } = restaurant
    const imageUrl = `${restaurantImageUrl}/${logo}`
    const handleClick=()=>{
        deleteWishlistRes(id)
    }

    return (
        <WishlistBox sx={{ cursor: 'pointer' }}>
            <Grid container md={12} xs={12} spacing={{ xs: 1 }}>
                <Link href={`/restaurant/${id}`} passHref>
                    <Grid item md={3} sm={ 4}xs={4}>
                        {/* <Typography>Veg</Typography> */}
                        <CustomImageContainer src={imageUrl}  alt={name} maxWidth="120px" smMaxWidth="80px" height= "120px" smHeight="80px" objectFit="contained" borderRadius=".7rem" smWidth="80px"/>
                        {/*<img src={imageUrl} alt={name}  className="PopularRes_img"/>*/}
                    </Grid>
                </Link>
                <Grid item md={7} sm={6} xs={6} alignSelf="center">
                    <Stack padding=".6rem">
                        <Typography variant={isXSmall?"h6":"h5"}>{name}</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#9B9B9B',

                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical'}}>
                            {address}
                        </Typography>
                        <Typography>
                            {rating? rating :"0"}
                            <StarIcon sx={{ width: '16px', color: 'orange' }} />
                        </Typography>
                    </Stack>
                </Grid>
                <IconButtonGrid item md={2} xs={2} >
                    <IconButton onClick={() => setOpenModal(true)} sx={{height:"50px"}}>
                        <DeleteIcon sx={{ color: theme=>theme.palette.error.main }} />
                    </IconButton>
                </IconButtonGrid>
            </Grid>
            <CustomDialogConfirm
                dialogTexts={t("Are you sure you want to  delete this item?")}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={handleClick}
            />
        </WishlistBox>
    )
}

export default WishListRestaurantCard
