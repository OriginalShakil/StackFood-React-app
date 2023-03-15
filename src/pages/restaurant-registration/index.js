import React from 'react'
import { Box, Container } from '@mui/material'
import RestaurantJoin from '../../components/join-restaurant/RestaurantJoin'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'

const index = () => {
    return (
        <>
            <Meta title="restaurant join" description="Restaurant Join" />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '30px' } }}>
                <RestaurantJoin />
            </Container>
        </>
    )
}
export default index
