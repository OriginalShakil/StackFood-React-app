import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import CustomerLayout from '../../components/customer-page/customer-layout/CustomerLayout'
//import Profile from './profile/Profile'
import WithAuth from '../../components/authentication/auth-guard'
import Profile from '../../components/customer-page/profile/Profile'

import Meta from '../../components/Meta'
const index = () => {
    return (
        <div>
            <Meta title="profile" description="" keywords="" />

            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<Profile />} />
            </Container>
        </div>
    )
}

export default index
