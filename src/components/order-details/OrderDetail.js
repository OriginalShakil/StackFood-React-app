import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import OrderDetails from './OrderDetails';
import PushNotificationLayout from "../PushNotificationLayout";

const OrderDetail = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <PushNotificationLayout>
                    <OrderDetails />
                </PushNotificationLayout>

            </Container>
        </>
    );
};

export default OrderDetail;