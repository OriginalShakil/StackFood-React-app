import { Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ArrowButton, IconButtonGrid, WishlistBox } from './WishList.style'
import { getAmount } from '../../utils/customFunctions'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import {useDispatch, useSelector} from 'react-redux'
import {
    CustomFavICon,
    RatingStarIcon,
    RatingWrapTypography,
} from '../food-card/FoodCard.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomImageContainer from '../CustomImageContainer'
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { t } from 'i18next'
import { RTL } from '../RTL/RTL'
import {FavoriteBorderOutlined} from "@mui/icons-material";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {useMutation} from "react-query";
import {ProductsApi} from "../../hooks/react-query/config/productsApi";
import {addWishList, removeWishListFood} from "../../redux/slices/wishList";
import {toast} from "react-hot-toast";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useWishListDelete} from "../../hooks/react-query/config/wish-list/useWishListDelete";

const WishlistCard = ({ product, productImageUrl,recommenedproducts }) => {
    const { wishLists } = useSelector((state) => state.wishList)
    const theme = useTheme()
    const dispatch = useDispatch()
    const color1 = theme.palette.error.main
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalDelete, setOpenModalDelete] = React.useState(false)
    const { global ,token} = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { name, image, restaurant_name, avg_rating, price, discount } =
        product
    const imageUrl = `${productImageUrl}/${image}`
    const discountPrice = price - discount
    const handleFoodDetailModal = () => setOpenModal(true)
    const handleModalClose = () => {
        setOpenModal(false)
    }
    const onSuccessHandlerForDelete = (res) => {
        dispatch(removeWishListFood(product.id))
        toast.success(res.message, {
            id: 'wishlist',
        })
    }
    const { mutate } = useWishListDelete()
    const deleteWishlistItem = (id) => {
        mutate(id, {
            onSuccess: onSuccessHandlerForDelete,
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        })
    }

    const handleClick = () => {
        deleteWishlistItem(product?.id)
    }
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
        data,
    } = useMutation(
        'add-favourite',
        () => ProductsApi.addFavorite(product.id),
        {
            onSuccess: (response) => {
                if (response?.data) {
                    dispatch(addWishList(product))
                    toast.success(response.data.message)
                }
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        }
    )

    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation()
            // notify(data.message)
        } else toast.error(t('You are not logged in'))
    }
    const isInList = (id) => {
        return !!wishLists?.food?.find((wishFood) => wishFood.id === id)
    }
    return (
        <>
            <WishlistBox  sx={{ cursor: 'pointer' }}>
                <Grid container md={12} xs={12} spacing={{ xs: 1 }} >
                    <Grid item md={3} sm={4} xs={4}>
                        <Stack
                            onClick={handleFoodDetailModal}
                            sx={{ cursor: 'pointer' }}
                        >
                            <CustomImageContainer
                                src={imageUrl}
                                alt={name}
                                maxWidth="120px"
                                smMaxWidth="80px"
                                height="120px"
                                smHeight="80px"
                                objectFit="cover"
                                borderRadius=".7rem"
                                smWidth="80px"
                                mdHeight="87px"
                            />
                        </Stack>

                        {/*<img src={imageUrl} alt={name} className="PopularRes_img"  />*/}
                    </Grid>
                    <Grid item md={7} sm={6} xs={6}>
                        <Stack padding=".6rem" onClick={handleFoodDetailModal}>
                            <Typography
                                variant={isXSmall ? 'h6' : 'h5'}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography variant="h6">
                                {restaurant_name}
                            </Typography>
                            <RatingWrapTypography variant="subtitle2">
                                {avg_rating?.toFixed(1) || avg_rating?.toFixed(1)}
                                <RatingStarIcon
                                    fontSize="small"
                                    sx={{
                                        ml: '3px',
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    }}
                                />
                            </RatingWrapTypography>
                            <Typography>
                                <span
                                    style={{
                                        color: color1,
                                        fontSize: '13px',
                                        textDecoration: 'line-through',
                                    }}
                                >
                                    {discount > 0 &&
                                        getAmount(
                                            price,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </span>
                                <span
                                    style={{
                                        fontSize: '15px',
                                    }}
                                >
                                    {discountPrice &&
                                        getAmount(
                                            discountPrice,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )}
                                </span>
                            </Typography>
                        </Stack>
                    </Grid>
                    <IconButtonGrid item md={2} xs={2}>
                        <Stack justifyContent="space-between" alignItems="center">
                            {recommenedproducts==='true'?(
                                <>
                                    {!isInList(product?.id) &&
                                        <IconButton onClick={addToFavorite}>
                                            <FavoriteBorderIcon color="primary"/>
                                        </IconButton>}
                                    {isInList(product?.id) &&
                                        <IconButton
                                            onClick={() =>
                                                deleteWishlistItem(product.id)
                                            }
                                        >
                                            <FavoriteIcon color="primary" />
                                        </IconButton>}
                                </>

                            ):(
                                <IconButton onClick={() => setOpenModalDelete(true)}>
                                    <DeleteIcon
                                        sx={{
                                            color: (theme) => theme.palette.error.main,
                                        }}
                                    />
                                </IconButton>)}

                            <Stack
                                sx={{
                                    display: { xs: 'none', md: 'inline' },
                                }}
                            >
                                {languageDirection && (
                                    <ArrowButton
                                        size="small"
                                        onClick={handleFoodDetailModal}
                                        languageDirection={languageDirection}
                                    >
                                        {languageDirection === 'rtl' ? (
                                            <ArrowBackIcon fontSize="small" />
                                        ) : (
                                            <ArrowForwardIcon fontSize="small" />
                                        )}
                                    </ArrowButton>
                                )}
                            </Stack>
                        </Stack>
                    </IconButtonGrid>
                </Grid>
            </WishlistBox>

            {openModal && languageDirection && (
                <RTL direction={languageDirection}>
                    <FoodDetailModal
                        product={product}
                        image={imageUrl}
                        open={openModal}
                        setOpen={setOpenModal}
                        handleModalClose={handleModalClose}
                        currencySymbolDirection={currencySymbolDirection}
                        currencySymbol={currencySymbol}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                    />
                </RTL>
            )}
            <CustomDialogConfirm
                dialogTexts={t('Are you sure you want to  delete this item?')}
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                onSuccess={handleClick}
            />
        </>
    )
}

export default WishlistCard
