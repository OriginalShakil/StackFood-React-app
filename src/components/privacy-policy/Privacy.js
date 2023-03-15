import React from 'react'
import Privacypolicy from './Privacypolicy'
import { Container, CssBaseline } from '@mui/material'

const Privacy = () => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <Privacypolicy />
            </Container>
        </>
    )
}

export default Privacy
