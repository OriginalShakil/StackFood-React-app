import React, { useEffect, useState } from 'react'
import RestaurantDetails from '../../../components/restaurant-details/RestaurantDetails'
import Head from 'next/head'
import Meta from '../../../components/Meta.js'
import CategoryDetailsPage from '../../../components/category/CategoryDetailsPage'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../../hooks/react-query/config/restaurantApi'
import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { Container } from '@mui/material'
const index = () => {
    const [type, setType] = useState('all')
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(10)
    const router = useRouter()
    const { id, name } = router.query

    const [category_id, setCategoryId] = useState(id)
    const { isLoading, data, isError, error, refetch } = useQuery(
        [`category-details`, category_id, offset, page_limit, type],
        () =>
            CategoryApi.categoriesDetails(category_id, type, offset, page_limit)
    )
    const { data: resData } = useQuery(
        [`category-detailsRes`, category_id, offset, page_limit, type],
        () =>
            CategoryApi.categoriesDetailsForRes(
                category_id,
                type,
                offset,
                page_limit
            )
    )
    useEffect(() => {
        type && setOffset(1)
    }, [type])
    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: { xs: '5rem', md: '9rem' },
                mb: { xs: '72px', md: '30px' },
            }}
        >
            <CustomStackFullWidth>
                <CustomPaperBigCard>
                    <Meta title={name} keyword="" description="" />
                    <CategoryDetailsPage
                        id={id}
                        data={{ data }}
                        category_id={category_id}
                        setCategoryId={setCategoryId}
                        resData={resData}
                        offset={offset}
                        type={type}
                        setType={setType}
                        page_limit={page_limit}
                        setOffset={setOffset}
                    />
                </CustomPaperBigCard>
            </CustomStackFullWidth>
        </Container>
    )
}

export default index
