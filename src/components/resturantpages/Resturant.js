import { CssBaseline, Container } from '@mui/material';
import React from 'react';
import ResturantOffer from './ResturantOffer';

const Resturant = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <ResturantOffer />
            </Container>
        </>
    );
};

export default Resturant;