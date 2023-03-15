import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import SettingPage from './SettingPage'
import CustomerLayout from '../customer-layout/CustomerLayout'

const Settings = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <CustomerLayout component={<SettingPage />} />
            </Container>
        </>
    )
}

export default Settings
