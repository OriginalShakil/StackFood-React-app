import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import CouponList from './CouponList'
import CustomerLayout from '../customer-layout/CustomerLayout'

const Coupon = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<CouponList />} />
            </Container>
        </>
    )
}

export default Coupon
