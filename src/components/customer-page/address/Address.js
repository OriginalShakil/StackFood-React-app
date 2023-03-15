import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import AddresList from './AddresList'
import CustomerLayout from '../customer-layout/CustomerLayout'

const Address = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<AddresList />} />
            </Container>
        </>
    )
}

export default Address
