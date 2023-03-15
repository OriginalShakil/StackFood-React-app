import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../../components/Meta'
import InterestOptions from '../../components/interest/InterestOptions'
import { Container } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Box } from '@mui/system'
import { InfoSetByApi } from '../../components/InfoSetByApi'
import { useQuery } from 'react-query'
import { ProfileApi } from '../../hooks/react-query/config/profileApi'
import { setUser } from '../../redux/slices/customer'
import {
    onErrorResponse,
    onSingleErrorResponse,
} from '../../components/ErrorResponse'
import { setWalletAmount } from '../../redux/slices/cart'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'

const Interest = ({ configData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const businessLogo = global?.base_urls?.business_logo_url
    const business_name = global?.business_name
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            onError: onSingleErrorResponse,
        }
    )
    const dispatch = useDispatch()
    if (data) {
        // localStorage.setItem('wallet_amount', data?.data?.wallet_balance)
        dispatch(setWalletAmount(data?.data?.wallet_balance))
        dispatch(setUser(data?.data))
    }
    return (
        <>
            <Meta
                title={configData?.business_name}
                description="A multi-restaurant e-commerce web app"
                keywords=""
                ogImage={`${businessLogo}/${global?.logo}`}
            />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <Box mt={{ xs: '90px', md: '150px' }}>
                    <InterestOptions />
                </Box>
            </Container>
        </>
    )
}

export default Interest
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
