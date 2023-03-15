import React, { memo, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Box, CircularProgress, Grid, Stack } from '@mui/material'
import { useQuery } from 'react-query'
import { BannerApi } from '../../hooks/react-query/config/bannerApi'
import { useDispatch, useSelector } from 'react-redux'
import CustomShimmerForBanner from '../CustomShimmer/CustomShimmerForBanner'
import Link from 'next/link'
import CustomImageContainer from '../CustomImageContainer'
import { useRouter } from 'next/router'
import { setBannerFoodByDispatch } from '../../redux/slices/searchFilter'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import placeholder from '../../../public/static/no-image-found.png'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'

const BannerSlider = ({data}) => {
    // const [imgError, setImgError] = React.useState(false);
    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     ['banner-image'],
    //     BannerApi.bannerList,
    //     {
    //         onError: onSingleErrorResponse,
    //     }
    // )
    const { global } = useSelector((state) => state.globalSettings)

    const globalImageUrl = global?.base_urls?.banner_image_url

    //food wise banner modal handled from here
    const router = useRouter()
    const dispatch = useDispatch()
    const [bannerData, setBannerData] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    useEffect(() => {
        bannerData && setOpenModal(true)
    }, [bannerData])
    const handleBannerClick = (banner) => {
        if (banner.type === 'restaurant_wise') {
            router.push(`/restaurant/${banner?.restaurant?.id}`)
        } else {
            setBannerData(banner?.food)
            dispatch(setBannerFoodByDispatch(banner?.food))
        }
    }
    const handleModalClose = () => {
        setOpenModal(false)
        setBannerData(null)
    }
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('md'))
    const newFoods = data?.data?.banners.reduce((acc, curr, index) => {
        if (index && (index + 1) % 2 === 0) {
            acc.push([
                data?.data?.banners?.[index - 1],
                data?.data?.banners?.[index],
            ])
        }
        if (index && index === data?.data?.banners?.length - 1) {
            acc.push([data?.data?.banners?.[index]])
        }
        return acc
    }, [])
    //for maintaining two array of object within each item
    if (newFoods?.length > 0) {
        newFoods.forEach((item, index) => {
            if (index === newFoods.length - 1) {
                if (item.length === 1) {
                    item.push(newFoods[0][0])
                }
            }
        })
    }
    return (
        <>
            <Box
                pt={{ xs: '0px', md: '25px' }}
                sx={{
                    display:
                        data?.data?.banners?.length === 0
                            ? 'none'
                            : { xs: 'none', sm: 'block', md: 'block' },
                }}
            >
                {/* <FloatingCart /> */}
                {data ? (
                    <Carousel
                        id="carouselExampleSlidesOnly"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        {newFoods?.map((banner, index) => (
                            <Carousel.Item key={index}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={6}>
                                        {banner[0] && (
                                            <Stack
                                                onClick={() =>
                                                    handleBannerClick(banner[0])
                                                }
                                            >
                                                <CustomImageContainer
                                                    width="100%"
                                                    height={
                                                        isXSmall
                                                            ? '180px'
                                                            : '280px'
                                                    }
                                                    borderRadius="10px"
                                                    cursor="pointer"
                                                    src={`${globalImageUrl}/${banner[0]?.image}`}
                                                    alt="banner"
                                                    // onClick={() =>
                                                    //     handleBannerClick(banner[0])
                                                    // }
                                                />
                                            </Stack>
                                        )}
                                        {/*{!banner[0]&&*/}
                                        {/*    <img*/}
                                        {/*    style={{*/}
                                        {/*        width: '100%',*/}
                                        {/*        height: isXSmall*/}
                                        {/*            ? '180px'*/}
                                        {/*            : '280px',*/}
                                        {/*        borderRadius: '10px',*/}
                                        {/*        cursor: 'pointer',*/}
                                        {/*    }}*/}
                                        {/*    src={placeholder.src}*/}
                                        {/*    alt="banner"*/}
                                        {/*    // onClick={() =>*/}
                                        {/*    //     handleBannerClick(banner[0])*/}
                                        {/*    // }*/}
                                        {/*/>}*/}
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        {banner[1] && (
                                            <Stack
                                                onClick={() =>
                                                    handleBannerClick(banner[1])
                                                }
                                            >
                                                <CustomImageContainer
                                                    width="100%"
                                                    height={
                                                        isXSmall
                                                            ? '180px'
                                                            : '280px'
                                                    }
                                                    borderRadius="10px"
                                                    cursor="pointer"
                                                    src={`${globalImageUrl}/${banner[1]?.image}`}
                                                    alt="banner"
                                                />
                                            </Stack>
                                        )}
                                    </Grid>
                                </Grid>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <CustomShimmerForBanner />
                )}
            </Box>
            <Box
                pt={{ xs: '0px', md: '25px' }}
                sx={{
                    display:
                        data?.data?.banners?.length === 0
                            ? 'none'
                            : { sm: 'none', md: 'none' },
                }}
            >
                {/* <FloatingCart /> */}
                {data ? (
                    <Carousel
                        id="carouselExampleSlidesOnly"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        {data?.data?.banners?.map((banner, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: isXSmall ? '160px' : '280px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                    }}
                                    src={`${globalImageUrl}/${banner?.image}`}
                                    alt="banner"
                                    onClick={() => handleBannerClick(banner)}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <CustomShimmerForBanner />
                )}
            </Box>
            {openModal && bannerData && (
                <FoodDetailModal
                    product={bannerData}
                    image={`${global?.base_urls?.product_image_url}/${bannerData.image}`}
                    open={openModal}
                    handleModalClose={handleModalClose}
                    setOpen={setOpenModal}
                    currencySymbolDirection={currencySymbolDirection}
                    currencySymbol={currencySymbol}
                    digitAfterDecimalPoint={digitAfterDecimalPoint}
                />
            )}
        </>
    )
}

export default memo(BannerSlider)
