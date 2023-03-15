import { Container, CssBaseline } from '@mui/material'
import React from 'react'
import CategoryList from './CategoryList'
import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";

const Category = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '30px' },mt:{xs: "0px", md: "150px"}}} >
                <CustomPaperBigCard>
                    <CategoryList />
                </CustomPaperBigCard>

            </Container>
        </>
    )
}

export default Category
