import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import LoyalityList from './LoyalityList'
import CustomerLayout from '../customer-layout/CustomerLayout'

const Loyalitys = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<LoyalityList />} />
            </Container>
        </>
    )
}

export default Loyalitys
