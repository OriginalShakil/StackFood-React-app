import React from 'react';
import {CssBaseline, Container, Stack} from '@mui/material';
import WishlistPage from './WishlistPage';

const WishList = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '30px' } }}>
               <Stack mt={{xs:"80px",md:"150px"}} minHeight="70vh">
                   <WishlistPage />
               </Stack>
            </Container>
        </>
    );
};

export default WishList;