import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ResturantList from './ResturantList'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CustomPageTitle from '../CustomPageTitle'
import Meta from '../Meta'
import { useSelector } from 'react-redux'

const Searchresturant = ({ restaurantType, title, description }) => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mb: { xs: '72px', md: '30px' },
                    mt: { xs: '0px', md: '150px' },
                }}
            >
                <CustomPaperBigCard>
                    <CustomPageTitle title={title} />
                    <ResturantList restaurantType={restaurantType} />
                </CustomPaperBigCard>
            </Container>
        </>
    )
}

export default Searchresturant
