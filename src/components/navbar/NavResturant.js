import React, {useEffect, useState} from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {Button, Grid, Menu, MenuItem, Stack, Typography} from '@mui/material'
import nodata from '../../../public/static/nodata.png'
import Fade from '@mui/material/Fade'
import ResOffer from '../../../public/static/Menu/resturant.png'
import {useSelector} from 'react-redux'
import {useQuery} from 'react-query'
import {useTheme} from '@mui/material/styles'
import {RestaurantsApi} from '../../hooks/react-query/config/restaurantApi'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {NavMenuLink} from './Navbar.style'
import {useTranslation} from 'react-i18next'
import ResShimmer from './ResShimmer'
import CustomImageContainer from '../CustomImageContainer'
import {RTL} from "../RTL/RTL";
import CustomEmptyResult from "../empty-view/CustomEmptyResult";

const NavResturant = ({zoneid}) => {
    const {t} = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const {global} = useSelector((state) => state.globalSettings)
    const [resdropdown, setResdropdown] = useState(null)
    const openresdrop = Boolean(resdropdown)
    const [enabled, setEnabled] = useState(false)

    const restuarantImageUrl = `${global?.base_urls?.restaurant_image_url}`

    const {
        isLoading: vegLoading,
        data: popularRestuarants,
        isError: vegIsError,
        error: vegError,
        refetch: restaurantApiRefetch,
    } = useQuery(
        ['restaurants/popular'],
        () => RestaurantsApi?.popularRestaurants(),
        {enabled: false}
    )
    useEffect(()=>{
       if(zoneid){
           restaurantApiRefetch()
       }
    },[zoneid])
    const handleresdropClick = (event) => {
        setResdropdown(event.currentTarget)
        setEnabled(true)
    }
    const handleresdropClose = () => {
        setResdropdown(null)
        setEnabled(false)
    }
    const viewAll = () => {
        router.push('/restaurant')
        handleresdropClose()
    }
    const languageDirection = localStorage.getItem('direction')

    return (
        <>
            <NavMenuLink
                id="fade-button"
                aria-controls={openresdrop ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openresdrop ? 'true' : undefined}
                onMouseEnter={(e) => handleresdropClick(e)}
                onClick={handleresdropClick}
                // sx={{ color: 'black', display: 'flex', cursor: 'pointer' }}
                //  href="#"
                underline="none"
            >
                {t('Resturants')} <KeyboardArrowDownIcon/>
            </NavMenuLink>
            <RTL direction={languageDirection}>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={resdropdown}
                    open={openresdrop}
                    onClose={handleresdropClose}
                    TransitionComponent={Fade}
                    sx={{
                        top: '14px',
                    }}
                >
                    <Grid container md={12} spacing={3} p="1rem" width="750px">
                        {/* <Grid
                        item
                        md={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button size="small">Popular Restaurants</Button>
                    </Grid> */}

                        {popularRestuarants ? (
                            <>
                                <Grid item md={4}>
                                    {popularRestuarants?.data
                                        ?.slice(0, 4)
                                        ?.map((restuarant, index) => {
                                            if (index < 4) {
                                                return (
                                                    <Link
                                                        href={`/restaurant/${restuarant.id}`}
                                                        passHref
                                                    >
                                                        <MenuItem
                                                            onClick={
                                                                handleresdropClose
                                                            }
                                                            sx={{
                                                                alignItems:
                                                                    'center',
                                                                borderRadius: '5px',
                                                                "&:hover": {
                                                                    backgroundColor: theme => theme.palette.primary.main
                                                                }
                                                            }}
                                                        >
                                                            <Stack
                                                                spacing={2.5}
                                                                direction="row"
                                                                alignItems="center"
                                                            >
                                                                <CustomImageContainer
                                                                    src={`${restuarantImageUrl}/${restuarant.logo}`}
                                                                    width="40px"
                                                                    height="40px"
                                                                    borderRadius=".4rem"
                                                                    loading="lazy"
                                                                />
                                                                <Typography
                                                                    variant="h5"
                                                                    fontWeight="400"
                                                                    color={(
                                                                        theme
                                                                    ) =>
                                                                        theme
                                                                            .palette
                                                                            .neutral[1000]
                                                                    }
                                                                >
                                                                    {
                                                                        restuarant.name
                                                                    }
                                                                </Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                    </Link>
                                                )
                                            }
                                        })}
                                </Grid>
                            </>
                        ) : (
                            <ResShimmer shimmerfor="restaurant"/>
                        )}
                        {popularRestuarants ? (
                            <>
                                <Grid item md={4}>
                                    {popularRestuarants?.data
                                        ?.slice(-4)
                                        ?.map((restuarant, index) => {
                                            if (index < 4) {
                                                return (
                                                    <Link
                                                        href={`/restaurant/${restuarant.id}`}
                                                        passHref
                                                    >
                                                        <MenuItem
                                                            onClick={
                                                                handleresdropClose
                                                            }
                                                            sx={{
                                                                alignItems:
                                                                    'center',

                                                                borderRadius: '5px',
                                                                "&:hover": {
                                                                    backgroundColor: theme => theme.palette.primary.main
                                                                }
                                                            }}
                                                        >
                                                            <Stack
                                                                spacing={2.5}
                                                                alignItems="center"
                                                                direction="row"
                                                              height="100%"
                                                            >
                                                                <CustomImageContainer
                                                                    src={`${restuarantImageUrl}/${restuarant.logo}`}
                                                                    width="40px"
                                                                    height="40px"
                                                                    loading="lazy"
                                                                    borderRadius=".4rem"
                                                                />
                                                                <Typography
                                                                    variant="h5"
                                                                    fontWeight="400"
                                                                    color={(
                                                                        theme
                                                                    ) =>
                                                                        theme
                                                                            .palette
                                                                            .neutral[1000]
                                                                    }
                                                                >
                                                                    {
                                                                        restuarant.name
                                                                    }
                                                                </Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                    </Link>
                                                )
                                            }
                                        })}
                                </Grid>
                            </>
                        ) : (
                            <ResShimmer shimmerfor="restaurant"/>
                        )}

                        <Grid item md={4}>
                            <Button
                                sx={{
                                    zIndex: 1,
                                    position: 'absolute',
                                    bottom: '20%',
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) => theme.palette.neutral[100],
                                    right: '11%',
                                    padding: '9px 25px',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                }}
                                size="medium"
                                onClick={viewAll}
                            >
                                {t('View all')}
                            </Button>
                            <CustomImageContainer
                                src={ResOffer.src}
                                alt="restaurant-image"
                                borderRadius=".6rem"
                                height="202px"
                                width="225px"
                            />
                            {/*<img src={ResOffer.src} loading="lazy" />*/}
                        </Grid>
                        {popularRestuarants?.data===0 && (
                            <Grid item md={8}>
                                <CustomEmptyResult image={nodata} label="No restaurant found"/>
                            </Grid>
                            )}
                    </Grid>
                </Menu>
            </RTL>
        </>
    )
}

export default NavResturant
