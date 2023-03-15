import React, { useEffect } from 'react'
import {
    CustomPaperBigCard,
    FlexContainerCenter,
} from '../../styled-components/CustomStyles.style'
import RestaurantJoinForm from './RestaurantJoinForm'
import { useGetZone } from '../../hooks/react-query/config/get-zone/useGetZone'
import { useRestaurantJoin } from '../../hooks/react-query/config/restaurant-store/useRestaurantStore'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { onErrorResponse } from '../ErrorResponse'
import RestaurantJoinShimmer from './RestaurantJoinShimmer'

const RestaurantJoin = () => {
    const router = useRouter()
    const { refetch, data } = useGetZone()
    const { t } = useTranslation()
    const { isLoading, mutate, onError } = useRestaurantJoin()
    let zoneid = undefined

    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }

    useEffect(async () => {
        await refetch()
    }, [])
    const formSubmitHandler = (values) => {
        const onSuccessHandler = (resData) => {
            toast.success(resData.message)
            if (zoneid) {
                router.push('/home')
            } else {
                router.push('/')
            }
        }
        mutate(values, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }

    return (
        <FlexContainerCenter
            sx={{ mt: { xs: '5rem', md: zoneid ? '9rem' : '-3rem' } }}
        >
            <CustomPaperBigCard>
                <Typography>{t('Restaurant Registration')}</Typography>
                {data ? (
                    <RestaurantJoinForm
                        zoneData={data}
                        formSubmit={formSubmitHandler}
                    />
                ) : (
                    <RestaurantJoinShimmer />
                )}
            </CustomPaperBigCard>
        </FlexContainerCenter>
    )
}
export default RestaurantJoin
