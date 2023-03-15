import { Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FoodNavigation from './FoodNavigation'
import FoodCard from '../../food-card/FoodCard'

import { useSelector } from 'react-redux'
import { ProductApis } from '../../../hooks/react-query/config/productsApi'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import CustomePagination from '../../pagination/Pagination'
import { useTranslation } from 'react-i18next'
import CustomShimmerForCard from '../../CustomShimmer/CustomShimmerForCard'
import GroupButtons from './GroupButtons'
import { CustomTypography } from '../../custom-tables/Tables.style'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'

import Skeleton from '@mui/material/Skeleton'
import CustomSearch from '../../custom-search/CustomSearch'
import noData from '../.././../../public/static/food.png'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import { RTL } from '../../RTL/RTL'
import useMediaQuery from '@mui/material/useMediaQuery'
import {foodCount} from "../../../utils/customFunctions";

const RestaurantFoodItems = ({ category_ids, restaurant_id }) => {
    const matches = useMediaQuery('(max-width:1180px)')
    const { t } = useTranslation()
    const [openSearchSuggestions, setOpenSearchSuggestions] = useState(false)
    const [onSearchdiv, setOnSearchdiv] = useState(false)
    const [selectedBtn, setSelectedBtn] = useState(1)
    const [catetoryMenus, setCategoryMenus] = useState([])
    //   const [selectedFoodMenu, setSelectedFoodMenu] = useState(0)
    const [category_id, setCategoryId] = useState(0)
    const [type, setType] = useState('all')
    const [isSearch, setIsSearch] = useState('')
    const [searchOffset, setSearchOffset] = useState(1)
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(10)
    const [productData, setProductData] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [totalSize, setTotalSize] = useState(null)
    const [reRenderSearch, setRerenderSearch] = useState(false)

    const { global } = useSelector((state) => state.globalSettings)
    const categorySearch = ''
    const {
        isLoading: isLoadingCategoryData,
        data: categoryData,
        isError,
        error,
        // refetch: placeApiRefetch,
    } = useQuery(['category'], () => CategoryApi.categories(categorySearch))

    useEffect(() => {
        if (categoryData && category_ids?.length > 0) {
            const catetoryMenu = categoryData?.data?.filter((item) =>
                category_ids.includes(item.id)
            )
            setCategoryMenus(catetoryMenu)
        }
    }, [categoryData, category_ids])

    const handleLatestFood = (res) => {
        setProductData(res.data.products)
        setTotalSize(res.data.total_size)
    }
    const {
        isLoading: isLoadingLatestFood,
        data: latestFoodData,
        isError: isErrorLatestFood,
        error: LatestFood,
        refetch,
        isRefetching: isRefetchingLatestFood,
    } = useQuery(
        ['latest-food', restaurant_id, category_id, type, offset, page_limit],
        () =>
            ProductApis.latestFood({
                restaurant_id,
                category_id,
                type,
                offset,
                page_limit,
            }),
        {
            enabled: false,
            onSuccess: handleLatestFood,
        }
    )
    const handleOnSuccess = (res) => {

        setProductData(res.data.products)
        setTotalSize(res.data.total_size)
    }

    const {
        isLoading: isLoadingSearchFood,
        refetch: refetchSearchFood,
        isRefetching: isRefetchingSearch,
    } = useQuery(
        [
            'search-latest-food',
            restaurant_id,
            searchKey,
            type,
            searchOffset,
            page_limit,
        ],
        () =>
            ProductApis.searchlatestFood({
                restaurant_id,
                searchKey,
                type,
                searchOffset,
                page_limit,
            }),
        {
            enabled: false,
            onSuccess: handleOnSuccess,
        }
    )

    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    useEffect(() => {
        searchKey === '' && refetch()
    }, [category_id, type, offset])
    useEffect(() => {
        if (latestFoodData?.data?.products) {
            setProductData(latestFoodData?.data?.products)
        }
    }, [latestFoodData])
    useEffect(async () => {
        searchKey !== '' && (await refetchSearchFood())
    }, [searchKey, type, offset])
    useEffect(async () => {
        await refetch()
    }, [restaurant_id])

    if (isError) {
        return <h1>{error.messages}</h1>
    }
    const handleSearchResult = async (values) => {
        if (values === '') {
            await refetch()
            setSearchKey('')
            setIsSearch('')
        } else {
            setCategoryId(0)
            setType('all')
            setSearchKey(values)
            setIsSearch('search')
        }
    }
    const handleCategoryId = (values) => {
        setSearchKey('')
        setOffset(1)
        setRerenderSearch((prevState) => !prevState)
        setCategoryId(values)
    }
    const handleType = (value) => {
        setOffset(1)
        setType(value)
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
                <FoodNavigation
                    catetoryMenus={catetoryMenus}
                    setCategoryId={handleCategoryId}
                    category_id={category_id}
                    page_limit={page_limit}
                    setPageLimit={setPageLimit}
                    usein="restaurant"
                    id={0}
                    //  setType={setType}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>

                <CustomSearch
                    key={reRenderSearch}
                    handleSearchResult={handleSearchResult}
                    label={t('Search foods in restaurant')}
                    isLoading={isLoadingSearchFood}
                    setOnSearchdiv={setOnSearchdiv}
                    setOpenSearchSuggestions={setOpenSearchSuggestions}
                    searchFrom="restaurantDetails"
                />

            </Grid>
            <Grid item xs={12} sm={12} md={12} align="center">

                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                    >
                        <GroupButtons setType={handleType} type={type} />
                    </CustomStackFullWidth>

            </Grid>
            <Grid item xs={12} sm={12} md={12} align="center">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.5}
                >
                    <CustomTypography>{t('We found')}</CustomTypography>
                    <CustomColouredTypography color="primary">
                        {isLoadingLatestFood ||
                        isRefetchingLatestFood ||
                        isRefetchingSearch ? (
                            <Skeleton variant="text" width="10px" />
                        ) : totalSize ? (
                            foodCount(productData)
                        ) : (
                            0
                        )}
                    </CustomColouredTypography>
                    <CustomTypography>{t('foods for you')}</CustomTypography>
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                container
                spacing={{ xs: 1, md: 3 }}
            >
                {(isLoadingLatestFood ||
                    isRefetchingLatestFood ||
                    isRefetchingSearch) && (
                    <>
                        {[...Array(5)].map((i, index) => {
                            return (
                                <Grid key={index} item md={2.4} sm={4} xs={6}>
                                    <CustomShimmerForCard />
                                </Grid>
                            )
                        })}
                    </>
                )}
                {!isRefetchingSearch &&
                    !isLoadingLatestFood &&
                    !isRefetchingLatestFood &&
                    productData.map((product) => {
                        if(product?.variations === null || product?.variations[0]?.values || product?.variations?.length === 0){
                            return (
                                <Grid
                                    key={product?.id}
                                    item
                                    md={matches ? 3 : 2.4}
                                    sm={4}
                                    xs={6}
                                >
                                    <FoodCard
                                        sm={1}
                                        xs={1}
                                        product={product}
                                        productImageUrl={
                                            global?.base_urls?.product_image_url
                                        }
                                    />
                                </Grid>
                            )
                        }

                    })}
                {productData.length === 0 && !isLoadingLatestFood && (
                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                        height="300px"
                    >
                        <CustomEmptyResult
                            label="No Data Found"
                            image={noData}
                        />
                        {/*<Image*/}
                        {/*    src={notFoundImage}*/}
                        {/*    alt={t('Empty image')}*/}
                        {/*    width={200}*/}
                        {/*    height={200}*/}
                        {/*/>*/}
                    </CustomStackFullWidth>
                )}
            </Grid>
            {totalSize > page_limit && (
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomePagination
                        total_size={totalSize}
                        page_limit={page_limit}
                        offset={isSearch === 'search' ? searchOffset : offset}
                        setOffset={
                            isSearch === 'search' ? setSearchOffset : setOffset
                        }
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default RestaurantFoodItems
