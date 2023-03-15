import React, { memo, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Dropdown } from 'react-bootstrap'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    useMediaQuery, Stack,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { HomeTitleTypography } from './HomeStyle'
import { useTranslation } from 'react-i18next'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomButton } from '../custom-cards/CustomCards.style'
import { useTheme } from '@mui/material/styles'
import {onSingleErrorResponse} from "../ErrorResponse";
import {RTL} from "../RTL/RTL";

const Resturant = () => {
    const theme = useTheme()
    const [loadMore, setLoadMore] = useState(16)
    const [restaurantData, setrestaurantData] = useState()
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [searchKey, setSearchKey] = useState(' ')
    const [offset, setOffSet] = useState(1)
    const [page_limit, setPage_Limit] = useState(20)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    // const tempColor=theme.palette.neutral[100]
    // const [value, setValue] = useState(value)
    const handleSelect = (e) => {
        setFilterType(e)
    }

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['all-restaurant'],
        () =>
            RestaurantsApi?.restaurants({
                type,
                offset,
                page_limit,
                filterType,
                searchKey,
            },{
                onError:onSingleErrorResponse
            })
    )
    useEffect(() => {
        refetch()
    }, [filterType])
    if (isError) {
        return <h1>{error.messages}</h1>
    }
    //const count = Math.ceil(data?.data?.restaurants.length / loadMore)

    const handleMore = () => {
        setLoadMore(loadMore + 6)
    }
    let mode = undefined
    if (typeof window !== 'undefined') {
        mode = localStorage.getItem('mode')
    }
    const lightColor=theme.palette.neutral[1000]
    const languageDirection = localStorage.getItem('direction')
    const borderColor=theme.palette.primary.main
    return (
        <RTL direction={languageDirection}>
        <Box pt={{ xs: '15px', md: '80px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <CustomTypography variant="h3" fontWeight="700">
                            {t('All Restaurants')}
                        </CustomTypography>

                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle
                                style={{
                                    background: 'none',
                                    border: `1px solid ${borderColor}`,
                                    textTransform: 'capitalize',
                                    color: lightColor,
                                }}
                                variant={mode === 'light' ? 'success' : 'dark'}
                                id="dropdown-basic"
                            >
                                <FilterListIcon />{' '}
                                {!isSmall && t('Filter by :')}{' '}
                                {filterType && t(filterType).replaceAll('_', ' ')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                variant={mode === 'light' ? 'success' : 'dark'}
                            >
                                <Dropdown.Item eventKey="All">
                                    {t('All')}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Delivery">
                                    {t('Delivery')}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="take_away">
                                    {t('Take Away')}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomStackFullWidth>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    container
                    spacing={{ xs: 4.5, sm:2, md: 2 }}
                    justifyContent="center"
                >
                    {data ? (
                        <>
                            {data?.data?.restaurants
                                ?.slice(0, loadMore).map((restaurantData) => (
                                    <Grid
                                        key={restaurantData?.id}
                                        item
                                        md={1.5}
                                        sm={2.5}
                                        xs={4}
                                    >
                                        <RestaurantBoxCard
                                            key={restaurantData?.id}
                                            id={restaurantData.id}
                                            image={restaurantData?.logo}
                                            name={restaurantData?.name}
                                            rating={restaurantData?.avg_rating}
                                            restaurantImageUrl={
                                                global?.base_urls
                                                    ?.restaurant_image_url
                                            }
                                            restaurantDiscount={
                                                restaurantData.discount &&
                                                restaurantData.discount
                                            }
                                            freeDelivery={
                                                restaurantData.free_delivery
                                            }
                                            open={restaurantData?.open}
                                            active={restaurantData?.active}
                                        />
                                    </Grid>
                                ))}
                        </>
                    ) : (
                        <Stack mt='30px'>
                            <CustomShimmerRestaurant />
                        </Stack>
                    )}
                </Grid>
                <Grid item xs={12} md={12} align="center" my="1rem">
                    {loadMore < data?.data?.restaurants.length && (
                        <Button
                            sx={{ padding: '10px 50px' }}
                            variant="contained"
                            onClick={handleMore}
                        >
                            {t('See more')}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
        </RTL>
    )
}

export default Resturant
