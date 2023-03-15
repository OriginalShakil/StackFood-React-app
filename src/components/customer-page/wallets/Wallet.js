import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import CustomerLayout from '../customer-layout/CustomerLayout'
import WalletList from './WalletList'

const Wallet = () => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' }, minHeight: '115vh' }}
            >
                <CustomerLayout component={<WalletList />} />
            </Container>
        </>
    )
}

export default Wallet
