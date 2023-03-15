import React, { useEffect, useState } from 'react'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import GroupButtonsRateAndReview from './GroupButtonsRateAndReview'
import ItemForm from './ItemForm'
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import { useRouter } from 'next/router'
import Shimmer from './Shimmer'
import { useSelector } from 'react-redux'
import DeliverymanForm from './DeliverymanForm'

const RateAndReview = () => {
    const { deliveryManInfo } = useSelector((state) => state.searchFilterStore)
    const [type, setType] = useState('items')
    const router = useRouter()
    const { id } = router.query
    const {
        isLoading,
        data,
        isError,
        error,
        refetch: refetchOrderDetails,
    } = useQuery(['order-details', id], () => OrderApi.orderDetails(id))
    useEffect(() => {
        id && refetchOrderDetails()
    }, [id])

    return (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            spacing={2}
            mt="9rem"
            mb="2rem"
        >
            {deliveryManInfo && (
                <GroupButtonsRateAndReview setType={setType} type={type} />
            )}
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                {type === 'items' ? (
                    data?.data ? (
                        data?.data?.map((item, index) => {
                            return (
                                <CustomPaperBigCard key={index}>
                                    <ItemForm data={item} />
                                </CustomPaperBigCard>
                            )
                        })
                    ) : (
                        <Shimmer />
                    )
                ) : (
                    <CustomPaperBigCard>
                        <DeliverymanForm data={deliveryManInfo} orderId={id} />
                    </CustomPaperBigCard>
                )}
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

export default RateAndReview
