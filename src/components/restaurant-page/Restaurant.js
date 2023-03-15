import React from 'react'
import { Container, CssBaseline } from '@mui/material'
import RestaurantList from './RestaurantList'

const Restaurant = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '30px' } }}>
                <RestaurantList />
            </Container>
        </>
    )
}

export default Restaurant
