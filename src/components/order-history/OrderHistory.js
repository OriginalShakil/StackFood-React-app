import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import OrderHistoryPage from './OrderHistoryPage';

const OrderHistory = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}  >
                <OrderHistoryPage />
            </Container>
        </>
    );
};

export default OrderHistory;