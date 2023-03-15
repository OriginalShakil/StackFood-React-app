import { Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import { CustomColouredPaper } from './FeaturedCategory.style'
const FeaturedCategoryCard = ({
    categoryImage,
    name,
    id,
    categoryImageUrl, height
}) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const image = `${categoryImageUrl}/${categoryImage}`
    return (
        <Grid item>
            <Link href={`category/${id}?name=${name}`}>
                <CustomColouredPaper elevation={0}>

                       <CustomImageContainer
                           src={image}
                           alt={name}
                           width="100%"
                           height="100px"
                           borderRadius=".5rem"
                           marginBottom="1rem"
                           objectFit="contained"
                           smMb="5px"
                           smHeight={height}


                       />

                    {/*<img className="featureimg" src={image} alt={name} />*/}
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography
                            sx={{
                                color: theme=>theme.palette.neutral[1000],
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '1',
                                WebkitBoxOrient: 'vertical',

                            }}
                            variant={isXSmall ? 'h6' : 'h5'}
                        >
                            {name}
                        </Typography>
                    </Stack>
                </CustomColouredPaper>
            </Link>
        </Grid>
    )
}

export default FeaturedCategoryCard
