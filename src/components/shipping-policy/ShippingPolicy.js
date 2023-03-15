import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ShippingPolicyPage from './ShippingPolicyPage'
const ShippingPolicy = () => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <ShippingPolicyPage />
            </Container>
        </>
    )
}

export default ShippingPolicy
