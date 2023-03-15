import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import CustomerLayout from '../customer-layout/CustomerLayout'
import ReferCodePage from "./ReferCodePage";

const ReferCode = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<ReferCodePage />} />
            </Container>
        </>
    )
}

export default ReferCode