import React from 'react'
import { CssBaseline, Container } from '@mui/material'
import ProductSearchPage from './ProductSearchPage'
import HomeSearch from "../home/HomeSearch";
import {Box} from "@mui/system";

const ProductSearch = ({ type,configData }) => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mt: { xs: '5rem', md: '9rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >
                <Box sx={{ display: { xs: 'inline', md:'none' } }}>
                    <HomeSearch />
                </Box>
                <ProductSearchPage product_type={type} configData={configData} />
            </Container>
        </>
    )
}

export default ProductSearch
