import {alpha, Box, Button, Grid, Stack, Typography} from '@mui/material'
import React, { useState } from 'react'
import location from '../../../assets/images/icons/location.png'
import favorite from '../../../assets/images/icons/favorite.png'
import { getAmount, isAvailable } from '../../../utils/customFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { RestaurantsApi } from '../../../hooks/react-query/config/restaurantApi'
import { useTranslation } from 'react-i18next'
import { RatingStarIcon, TypographyText } from '../../food-card/FoodCard.style'
import Link from 'next/link'
import TimerIcon from '@mui/icons-material/Timer'
import {
    addWishListRes,
    removeWishListRes,
} from '../../../redux/slices/wishList'
import { useWishListResDelete } from '../../../hooks/react-query/config/wish-list/useWishListResDelete'
import { CustomColouredTypography } from '../../../styled-components/CustomStyles.style'
import DeleteIcon from '@mui/icons-material/Delete'
import MapModal from '../google-address/map-modal'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { CustomTypographyGray } from '../../../styled-components/CustomTypographies.style'
import { toast } from 'react-hot-toast'
import CustomImageContainer from '../../CustomImageContainer'
import { useTheme } from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ClosedNowOverlay from './ClosedNowOverlay'
import moment from 'moment'
import useMediaQuery from '@mui/material/useMediaQuery'
const RestaurantTopDetail = ({
    logo,
    name,
    rating_count,
    avg_rating,
    address,
    delivery_time,
    minimum_order,
    latitude,
    longitude,
    id,
    active,
    open,
    schedules,cuisine
}) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const matches = useMediaQuery('(max-width:1180px)')

    const { global, token } = useSelector((state) => state.globalSettings)
    const restaurantImageUrl = global?.base_urls?.restaurant_image_url
    const [openModal, setMapModalOpen] = useState(false)
    const [wishListData, setWishListdata] = useState()
    const { wishLists } = useSelector((state) => state.wishList)
    const dispatch = useDispatch()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const viewMapModal = () => {
        setMapModalOpen(true)
    }
    //
    // const onSuccessHandler = (response) => {
    //     setWishListdata(response)
    // }
    // const { refetch } = useWishListGet(onSuccessHandler)
    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
    } = useMutation('add-favourite', () => RestaurantsApi.addFavorite(id), {
        onSuccess: (response) => {
            toast.success(t('Added to Wishlist successfully.'))

            if (response?.data) {
                dispatch(
                    addWishListRes({
                        logo,
                        name,
                        rating_count,
                        avg_rating,
                        address,
                        delivery_time,
                        minimum_order,
                        latitude,
                        longitude,
                        id,
                    })
                )

                //setOpen(false)
            }
        },
        onError: (error) => {},
    })
    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation()
        } else toast.error(t('You are not logged in'))

        // dispatch(setWishList(wishListData))
        // refetch().then()
    }
    // useEffect(() => {
    //    refetch().then()
    // }, []);
    const onSuccessHandlerForResDelete = (res, id) => {
        if (res) {
            toast.success(
                t('Removed from  favorite successfully.', {
                    id: 'favorite',
                })
            )
            dispatch(removeWishListRes(id))
        }
    }
    const { mutate: restaurantMutate } = useWishListResDelete(
        onSuccessHandlerForResDelete
    )

    const deleteWishlistRes = (id) => {
        restaurantMutate(id)
    }

    const isInList = (id) => {
        return !!wishLists?.restaurant?.find(
            (wishRestaurant) => wishRestaurant.id === id
        )
    }
    const closedNowHandler = () => {
        if (active) {
            if (schedules.length > 0) {
                const todayInNumber = moment().weekday()
                let isOpen = false
                let filteredSchedules = schedules.filter(
                    (item) => item.day === todayInNumber
                )
                let isAvailableNow = []
                filteredSchedules.forEach((item) => {
                    if (isAvailable(item?.opening_time, item?.closing_time)) {
                        isAvailableNow.push(item)
                    }
                })
                if (isAvailableNow.length > 0) {
                    isOpen = true
                } else {
                    isOpen = false
                }
                if (!isOpen) {
                    return <ClosedNowOverlay t={t} theme={theme} />
                }
            } else {
                return <ClosedNowOverlay t={t} theme={theme} />
            }
        } else {
            return <ClosedNowOverlay t={t} theme={theme} />
        }
    }
    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={5} sm={3} md={matches ? 3 : 2}>
                    <Stack sx={{ position: 'relative' }}>
                        <CustomImageContainer
                            height="100px"
                            width="100%"
                            src={`${restaurantImageUrl}/${logo}`}
                            alt="restaurant"
                            borderRadius=".7rem"
                        />
                        {closedNowHandler()}
                    </Stack>

                    {/*<img*/}
                    {/*    height="100px"*/}
                    {/*    width="100%"*/}
                    {/*    src={`${restaurantImageUrl}/${logo}`}*/}
                    {/*    alt="restaurant"*/}
                    {/*/>*/}
                </Grid>
                <Grid item xs={6} sm={8} md={matches ? 8 : 9}>
                    <Stack>
                        <CustomTypography variant="p">{name}</CustomTypography>
                        <Stack direction="row" spacing={.5} width="100%" flexWrap="wrap">
                        {cuisine?.map((item,index)=>{
                            return(
                                    <CustomTypographyGray variant="p" key={index}
                                                          sx={{
                                                              overflow: 'hidden',
                                                              textOverflow: 'ellipsis',
                                                              display: '-webkit-box',
                                                              WebkitLineClamp: '2',
                                                              WebkitBoxOrient: 'vertical',


                                                          }}
                                    >
                                        {item?.name} {(cuisine.length-1)===index ?"":","}
                                    </CustomTypographyGray>
                            )
                        })}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <CustomTypography variant="p">
                                {avg_rating.toFixed(1)}{' '}
                            </CustomTypography>
                            <RatingStarIcon
                                fontSize="small"
                                sx={{
                                    ml: '3px',
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <CustomTypographyGray variant="p">
                                {t('Address')} : {address}
                            </CustomTypographyGray>
                            {/*<Stack*/}
                            {/*    sx={{ cursor: 'pointer',background:(theme)=>theme.palette.primary.midPrimary,padding:"8px",borderRadius:".5rem" }}*/}
                            {/*    onClick={() => viewMapModal()}*/}
                            {/*>*/}
                            {/*    <CustomImageContainer*/}
                            {/*        className="location-icon"*/}
                            {/*        src={location.src}*/}
                            {/*        alt="restaurant"*/}

                            {/*    />*/}
                            {/*</Stack>*/}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    mt={{ xs: '1rem', sm: '0rem', md: '0rem' }}
                    align="center"
                >
                    {!isInList(id) ? (
                        <IconButton
                            onClick={() => addToFavorite()}
                            variant="contained"
                        >
                            <FavoriteBorderIcon color="primary" />
                        </IconButton>
                    ) : (
                        <IconButton
                            variant="outlined"
                            onClick={() => deleteWishlistRes(id)}
                        >
                            <FavoriteIcon color="primary" />
                        </IconButton>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    mt="1rem"
                    spacing={1}
                    alignItems="Center"
                    justifyContent="center"
                >
                    <Grid item xs={6} sm={3} md={3} align="center">
                        <Link href={`/review/${id}`} passHref>
                            <Stack
                                alignItems="center"
                                sx={{ cursor: 'pointer' }}
                            >
                                <CustomColouredTypography
                                    color="primary"
                                    variant="h3"
                                >
                                    {avg_rating.toFixed(1) || '0'}
                                </CustomColouredTypography>
                                <TypographyText>{t('Ratings')}</TypographyText>
                            </Stack>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} align="center">
                        <Stack alignItems="center">
                            <CustomColouredTypography
                                color="primary"
                                variant="h3"
                            >
                                {delivery_time} {t('Min')}
                            </CustomColouredTypography>
                            <Stack direction="row" spacing={1}>
                                <TimerIcon />
                                <TypographyText>
                                    {t('Delivery Time')}
                                </TypographyText>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={3}
                        md={3}
                        align="center"
                        mt={{ xs: '1rem', sm: '0rem', md: '0rem' }}
                    >
                        <Stack alignItems="center">
                            <CustomColouredTypography
                                color="primary"
                                variant="h3"
                            >
                                {getAmount(
                                    minimum_order,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </CustomColouredTypography>
                            <TypographyText>
                                {t('Minimum Order Value')}
                            </TypographyText>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={3}
                        md={3}
                        mt={{ xs: '1rem', sm: '0rem', md: '0rem' }}
                        align="center"
                    >
                        <Stack
                            sx={{
                                cursor: 'pointer',
                                background: (theme) =>
                                    alpha(theme.palette.primary.main,.5),
                                padding: '8px',
                                borderRadius: '.5rem',
                                width: '40px',
                                height: '40px',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => viewMapModal()}
                        >
                            <CustomImageContainer
                                className="location-icon"
                                src={location.src}
                                alt="restaurant"
                                width="18px"
                                height="24px"
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            {openModal && latitude && longitude && (
                <MapModal
                    open={openModal}
                    handleClose={() => setMapModalOpen(false)}
                    latitude={latitude}
                    longitude={longitude}
                    address={address}
                />
            )}
        </Box>
    )
}
export default RestaurantTopDetail
