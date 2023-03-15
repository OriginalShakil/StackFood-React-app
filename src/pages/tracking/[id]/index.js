import React from 'react'
import Tracking from '../../../components/order-tracking/Tracking'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import { OrderApi } from '../../../hooks/react-query/config/orderApi'
import Meta from '../../../components/Meta'
import { useSelector } from 'react-redux'
import { onErrorResponse } from '../../../components/ErrorResponse'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import TrackingPage from '../../../components/order-tracking/TrackingPage'
import { CustomHeader } from '../../../api/Headers'

const index = ({ configData }) => {
    const router = useRouter()
    const { id } = router.query

    const { isLoading, data, isError, error, refetch } = useQuery(
        [`category-tracking`, id],
        () => OrderApi.orderTracking(id),
        {
            onError: onErrorResponse,
        }
    )

    return (
        <div className="div">
            <Meta title={`Orders Tracking - ${configData?.business_name}`} />
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <TrackingPage data={data?.data} />
            </Container>
        </div>
    )
}

export default index
export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    return {
        props: {
            configData: config,
        },
    }
}
