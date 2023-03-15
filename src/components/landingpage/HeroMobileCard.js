import React from 'react'
import { Box, Typography } from '@material-ui/core'
import LandingSliderImage from '../../../public/static/banners/hero-banner-sm.png'
import { useTranslation } from 'react-i18next'
const HeroMobileCard = () => {
    const { t } = useTranslation()
    const heroImg=""
    const heroText=""
    const subTitle=""
    return (
        <Box
            className="hero-slide-content"
            sx={{
                backgroundImage: `url(${heroImg?heroImg:LandingSliderImage.src})`,
            }}
        >
            <Typography
                variant="h2"
                component="h2"
                className="hero-section-title"
            >
                {heroText?heroText:"BON APPETIE"}
            </Typography>
            <Typography
                variant="h6"
                component="h6"
                className="hero-section-subtitle"
            >
                {subTitle ?subTitle :'FIND BEST RESTAURANTS NEAR YOU'}
            </Typography>
        </Box>
    )
}

export default HeroMobileCard
