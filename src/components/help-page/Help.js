import { Container, CssBaseline } from '@mui/material';
import React from 'react';
import HelpPage from './HelpPage';

const Help = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <HelpPage />
            </Container>

        </>
    );
};

export default Help;