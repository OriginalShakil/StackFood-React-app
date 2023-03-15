import React from 'react'
import {Container, Stack} from '@mui/material'
import HeroCard from './HeroCard'
import LandingHeroBanner from '../../../public/static/banners/hero-banner.png'
import ImageNotFound from '../../../public/static/no-image-found.png'

import HeroSectionSm from './HeroSectionSm'
import { useSelector } from 'react-redux'
import Skeleton from "@mui/material/Skeleton";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const HeroSection = ({
    business_name,
    modalview,
    handleModalClose,
    banner_section_full,
                         isLoading
}) => {
    const { global } = useSelector((state) => state.globalSettings)
    const heroImg = banner_section_full?.banner_section_img_full
    // `${global?.base_urls?.react_landing_page_images}/${heroImg}`

    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Container maxWidth="xl" mt="1.5rem" disableGutters={true}>
            {isLoading ? (
                <Stack width="100%" paddingTop={{xs:"30px",md:"60px"}} sx={{ height: { xs: '180px', sm: '300px', md: '400px' }}}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        width="100%"
                        height="100%"
                    />

                </Stack>
            ):(
                <HeroCard
                    elevation={0}
                    sx={{
                        width: '100%',
                        height: { xs: '180px', sm: '300px', md: '400px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        // background: (theme) =>
                        //     `url(${
                        //         heroImg
                        //             ? `${global?.base_urls?.react_landing_page_images}/${heroImg}`
                        //             : ImageNotFound.src
                        //     }) ${theme.palette.primary.main}`,
                        //backgroundBlendMode: 'saturation',
                        // opacity: '0.9',
                        boxShadow: `inset 0 0 0 1000px rgba(0,0,0,.23)`,

                        backgroundImage: `url(${
                            heroImg
                                ? `${global?.base_urls?.react_landing_page_images}/${heroImg}`
                                : ImageNotFound.src
                        })`,
                    }}
                    business_name={business_name}
                    banner_section_full={banner_section_full}
                    modalview={modalview}
                    handleModalClose={handleModalClose}
                />
            ) }

        </Container>
    )
}

export default HeroSection
