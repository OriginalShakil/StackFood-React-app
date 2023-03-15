import React from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
//import catagori from '../../../public/static/featurecatagori/image 11.png'
import { CatagoriCardPaper, CatagoriImg } from './Catagori.style'
import { motion } from "framer-motion";

const CategoryCard = ({ categoryImage, name, id, reduxImage }) => {
    const image = `${reduxImage}/${categoryImage}`
    return (
        <Box>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
            <CatagoriCardPaper elevation={0}>

                <CatagoriImg>
                    <img src={image} alt=loyalty />
                </CatagoriImg>
                <Stack sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{name}</Typography>
                    <Typography variant="h6">(25 Items)</Typography>
                </Stack>

            </CatagoriCardPaper>
            </motion.div>
        </Box>
    )
}

export default CategoryCard
