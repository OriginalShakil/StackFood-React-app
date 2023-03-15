import React, { useEffect } from 'react'
import CheckOut from '../../components/checkout-page/CheckOut'
import Meta from '../../components/Meta'
import { Container, CssBaseline } from '@mui/material'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import ProductPage from '../../components/products-page/ProductPage'
import { useTranslation } from 'react-i18next'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CheckoutGuard from '../../components/checkout-guard/CheckoutGuard'
import AuthGuard from '../../components/authentication/AuthGuard'
import AddressLayout from '../customer/address'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'

const CheckoutLayout = ({ configData }) => {
    const { t } = useTranslation()
    const { cartList } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.globalSettings)
    //token && cartList?.length === 0 && Router.push('/home')
    const router = useRouter()
    const { page } = router.query
    // useEffect(() => {
    //     if (page !== 'campaign') {
    //         if (cartList.length === 0) {
    //             router.push('/home')
    //         }
    //     }
    // }, [cartList])

    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mt: { xs: '5rem', md: '9rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >
                <CustomStackFullWidth>
                    <Meta
                        title={`Checkout on ${configData?.business_name}`}
                        description=""
                        keywords=""
                    />
                    {token && page === 'campaign' && <CheckOut />}
                    {token && page !== 'campaign' && cartList.length > 0 && (
                        <CheckOut />
                    )}
                </CustomStackFullWidth>
            </Container>
        </>
    )
}
//
// CheckoutLayout.getLa
// CheckoutLayout.getLayout = (page) =>

export default CheckoutLayout
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
