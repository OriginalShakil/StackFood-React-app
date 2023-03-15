import React from 'react'
import { CssBaseline, Container } from '@mui/material'

import CancellationPolicyPage from './CancellationPolicyPage'

const CancellationPolicy = () => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <CancellationPolicyPage />
            </Container>
        </>
    )
}

export default CancellationPolicy
