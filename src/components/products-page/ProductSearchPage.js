import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import ProductList from './ProductList'
import Filter from './Filter'
import FoodOrRestaurant from './FoodOrRestaurant'
import SearchResult from './SearchResult'
import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import Loading from '../custom-loading/Loading'
import { useRouter } from 'next/router'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useSelector } from 'react-redux'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import SearchHistoryAndSuggestions from './SearchHistoryAndSuggestions'
import SearchFilterWithResults from './SearchFilterWithResults'
import Skeleton from '@mui/material/Skeleton'
import { getFilterChoices } from './getFilterChoices'
import Meta from '../Meta'
import { onErrorResponse } from '../ErrorResponse'

const ProductSearchPage = ({ product_type,configData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const router = useRouter()
    // const pageLimitFromAdmin = global.
    const [page_limit, setPageLimit] = useState(50)
    const [offset, setOffset] = useState(1)
    const [type, setType] = useState('all')
    const [searchValue, setSearchValue] = useState('')
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [checkfilter, setCheckfilter] = useState(false)
    const [pageData, setPageData] = useState({})

    const apiKey =
        foodOrRestaurant === 'products'
            ? 'products-search'
            : 'restaurant-search'
    const handleAPiCallOnSuccess = (res) => {
        setPageData(res)
    }
    const { isLoading, data, isError, error, refetch, isRefetching } = useQuery(
        [apiKey, foodOrRestaurant, searchValue, offset, page_limit],
        () =>
            ProductsApi.productSearch(
                foodOrRestaurant,
                searchValue,
                offset,
                page_limit
            ),
        {
            onSuccess: handleAPiCallOnSuccess,
            onError: onErrorResponse,
        }
    )

    useEffect(() => {
        let searchValue = ''
        if (typeof window !== 'undefined') {
            searchValue = localStorage.getItem('searchValue')
        }
        if (router.query.searchValue) {
            setSearchValue(router.query.searchValue)
        } else {
            let searchValues = []
            if (typeof window !== 'undefined') {
                searchValues = JSON.parse(localStorage.getItem('searchedValues'))
                if(searchValues.length>0 && searchValues[0]){
                    setSearchValue(searchValues[0])
                }
                else{
                    router.push('/home')
                }

            }



        }
    }, [router])
    console.log("search",router.query.searchValue)
    useEffect(() => {
        setOffset(1)
    }, [foodOrRestaurant])

    if (isError) {
        return <h1>{error.messages}</h1>
    }

    // if (data) {
    // }
    useEffect(() => {
        handleFilteredData(filterData, data)
    }, [checkfilter])
    const handleFilter = () => {
        setCheckfilter((prevState) => !prevState)
    }
    const handleClearAll = async () => {
        await refetch()
    }
    const handleFilteredData = (filterData, data) => {
        let filteredData = getFilterChoices(filterData, data, foodOrRestaurant)
        if (filteredData) {
            setPageData({
                ...data,
                data:
                    foodOrRestaurant === 'products'
                        ? {
                              ...pageData.data,
                              products: filteredData,
                              total_size: filteredData?.length,
                          }
                        : {
                              ...pageData.data,
                              restaurants: filteredData,
                              total_size: filteredData?.length,
                          },
            })
        }
    }


    return (
        <>
            <Meta title={`${searchValue?searchValue:"Searching..."} on ${configData?.business_name}`} />
            <CustomStackFullWidth mb="5rem">
                {pageData && (
                    <SearchFilterWithResults
                        searchValue={searchValue}
                        count={pageData?.data?.total_size}
                        foodOrRestaurant={foodOrRestaurant}
                        setFoodOrRestaurant={setFoodOrRestaurant}
                        isLoading={isRefetching}
                        isNetworkCalling={isLoading}
                        data={pageData}
                        page_limit={page_limit}
                        offset={offset}
                        setOffset={setOffset}
                        global={global}
                        handleFilter={handleFilter}
                        handleClearAll={handleClearAll}
                    />
                )}
            </CustomStackFullWidth>
        </>
    )
}

export default ProductSearchPage
