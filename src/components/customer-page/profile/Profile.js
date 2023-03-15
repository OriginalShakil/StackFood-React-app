import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import ProfilePage from './ProfilePage'
import CustomerLayout from '../customer-layout/CustomerLayout'

const Profile = () => {
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '0px', md: '0' } }}>
                <CustomerLayout component={<ProfilePage />} />
            </Container>
        </div>
    )
}

export default Profile
