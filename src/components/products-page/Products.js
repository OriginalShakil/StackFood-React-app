import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ProductPage from './ProductPage'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Meta from '../Meta'
import CategoryDetailsPage from '../category/CategoryDetailsPage'
import CustomPageTitle from '../CustomPageTitle'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'

const Products = ({ type, title, description }) => {
    const { t } = useTranslation()
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mt: { xs: '5rem', md: '9rem' },
                    mb: { xs: '72px', md: '30px' },
                }}
            >
                <CustomStackFullWidth>
                    <CustomPaperBigCard>
                        <CustomStackFullWidth>
                            <CustomPageTitle title={title} />
                            <Box sx={{ marginTop: '1.2rem' }}>
                                <ProductPage product_type={type} />
                            </Box>
                        </CustomStackFullWidth>
                    </CustomPaperBigCard>
                </CustomStackFullWidth>
            </Container>
        </>
    )
}

export default Products
