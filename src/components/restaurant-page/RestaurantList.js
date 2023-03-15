import { Box, Grid, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useSelector } from 'react-redux'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { useQuery } from 'react-query'
//import LinearProgress from '@mui/material/LinearProgress'
import CustomePagination from '../pagination/Pagination'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomPageTitle from '../CustomPageTitle'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CustomSearch from '../custom-search/CustomSearch'
import { onErrorResponse } from '../ErrorResponse'
import RestaurantListShimmer from './RestaurantListShimmer'

const RestaurantList = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const orangeColor = theme.palette.primary.main
    const [alignment, setAlignment] = useState('web')
    const [page_limit, setPageLimit] = useState(16)
    const [offset, setOffset] = useState(1)
    const [type, setType] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const isMd = useMediaQuery(theme.breakpoints.down('lg'))
    const [reRenderSearch, setRerenderSearch] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const { global } = useSelector((state) => state.globalSettings)

    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['all-restaurant', offset, page_limit],
        () =>
            RestaurantsApi.restaurants({
                offset,
                page_limit,
                type,
                filterType,
                searchKey,
            }),
        {
            onError: onErrorResponse,
        }
    )

    if (data) {
    }
    const handleSelect = (e) => {
        setFilterType(e.target.value)
    }
    // const handleChange = (e, newAlignment) => {
    //     setType(newAlignment)
    //     setAlignment(newAlignment)
    //     refetch().then()
    // }
    useEffect(() => {
        refetch().then()
    }, [filterType])
    useEffect(async () => {
        await refetch()
    }, [type])
    useEffect(async () => {
        await refetch()
    }, [searchKey])
    if (isLoading) {
        return (
            <Box mt={{ xs: '0px', md: '150px' }}>
                <CustomPaperBigCard>
                    <RestaurantListShimmer />
                </CustomPaperBigCard>
            </Box>
        )
    }
    if (isError) {
        return <h1>{error.messages}</h1>
    }
    const handleType = (value) => {
        setType(value)
    }
    const handleSearchResult = async (values) => {
        if (values === '') {
            await refetch()
            setSearchKey('')
        } else {
            //setType('all')
            setSearchKey(values)
        }
    }

    return (
        <>
            {languageDirection && (
                <Box mt={{ xs: '0px', md: '150px' }}>
                    <CustomPaperBigCard>
                        <Grid
                            container
                            spacing={3}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item xs={12} md={12}>
                                <CustomPageTitle title="Restaurant" />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                justifyContent="center"
                            >
                                <GroupButtons
                                    setType={handleType}
                                    type={type}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomSearch
                                    key={reRenderSearch}
                                    handleSearchResult={handleSearchResult}
                                    label="Search a restaurant"
                                    // isLoading={isLoadingSearchFood}
                                    // setOnSearchdiv={setOnSearchdiv}
                                    // setOpenSearchSuggestions={setOpenSearchSuggestions}
                                    // searchFrom="restaurantDetails"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                align={
                                    languageDirection === 'rtl'
                                        ? 'left'
                                        : 'right'
                                }
                            >
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">
                                        {t('Filter')}
                                    </InputLabel>
                                    <Select
                                        sx={{ width: '130px',height:"40px" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterType}
                                        label="Age"
                                        onChange={handleSelect}
                                    >
                                        <MenuItem value="all" sx={{'&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }}}>
                                            {t('All')}
                                        </MenuItem>
                                        <MenuItem value="delivery" sx={{'&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }}}>
                                            {t('Delivery')}
                                        </MenuItem>
                                        <MenuItem value="take_away" sx={{'&:hover': {
                                                backgroundColor: 'primary.dark',
                                            }}}>
                                            {t('Take Away')}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                {/*<Dropdown onSelect={handleSelect}>*/}
                                {/*    <Dropdown.Toggle*/}
                                {/*        style={{*/}
                                {/*            background: 'none',*/}
                                {/*            border: '1px solid #FFEBDD',*/}
                                {/*            color: '#4B566B',*/}
                                {/*            textTransform: 'capitalize',*/}
                                {/*        }}*/}
                                {/*        variant="success"*/}
                                {/*        id="dropdown-basic"*/}
                                {/*    >*/}
                                {/*        <AddRoadOutlinedIcon />{' '}*/}
                                {/*        {filterType*/}
                                {/*            ? filterType.replaceAll('_', ' ')*/}
                                {/*            : t('Filter by')}*/}
                                {/*        :*/}
                                {/*    </Dropdown.Toggle>*/}

                                {/*    <Dropdown.Menu>*/}
                                {/*        <Dropdown.Item eventKey="All">*/}
                                {/*            {t('All')}*/}
                                {/*        </Dropdown.Item>*/}
                                {/*        <Dropdown.Item eventKey="delivery">*/}
                                {/*            {t('Delivery')}*/}
                                {/*        </Dropdown.Item>*/}
                                {/*        <Dropdown.Item eventKey="take_away">*/}
                                {/*            {t('Take away')}*/}
                                {/*        </Dropdown.Item>*/}
                                {/*    </Dropdown.Menu>*/}
                                {/*</Dropdown>*/}
                            </Grid>
                            <Grid item xs={12} md={12} container spacing={1}>
                                {data?.data?.restaurants?.map(
                                    (restaurantData) => {
                                        if (restaurantData) {
                                            return (
                                                <Grid
                                                    item
                                                    xs={4}
                                                    sm={3}
                                                    md={1.5}
                                                >
                                                    <RestaurantBoxCard
                                                        image={
                                                            restaurantData?.logo
                                                        }
                                                        name={
                                                            restaurantData?.name
                                                        }
                                                        rating={
                                                            restaurantData?.avg_rating
                                                        }
                                                        restaurantImageUrl={
                                                            global?.base_urls
                                                                ?.restaurant_image_url
                                                        }
                                                        id={restaurantData?.id}
                                                        active={
                                                            restaurantData.active
                                                        }
                                                        open={
                                                            restaurantData.open
                                                        }
                                                        restaurantDiscount={
                                                            restaurantData.discount &&
                                                            restaurantData.discount
                                                        }
                                                        freeDelivery={
                                                            restaurantData.free_delivery
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        }
                                    }
                                )}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CustomePagination
                                    total_size={data?.data?.total_size}
                                    page_limit={page_limit}
                                    offset={offset}
                                    setOffset={setOffset}
                                />
                            </Grid>
                        </Grid>
                    </CustomPaperBigCard>
                </Box>
            )}
        </>
    )
}

export default RestaurantList
