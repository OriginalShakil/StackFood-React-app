import React from 'react'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import LandingSliderImage from '../../../public/static/banners/hero-banner-sm.png'
import { useTranslation } from 'react-i18next'

const HeroCarousal = () => {
    const { t } = useTranslation()
    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className="hero-slide-item">
                    <Box
                        className="hero-slide-content"
                        sx={{
                            backgroundImage: `url(${LandingSliderImage.src})`,
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h2"
                            className="hero-section-title"
                        >
                            BON APPETIE
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            className="hero-section-subtitle"
                        >
                            FIND BEST RESTAURANTS NEAR YOU
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="hero-slide-item">
                    <Box
                        className="hero-slide-content"
                        sx={{
                            backgroundImage: `url(${LandingSliderImage.src})`,
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h2"
                            className="hero-section-title"
                        >
                            BON APPETIE
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            className="hero-section-subtitle"
                        >
                            FIND BEST RESTAURANTS NEAR YOU
                        </Typography>
                    </Box>
                </SwiperSlide>
                <SwiperSlide className="hero-slide-item">
                    <Box
                        className="hero-slide-content"
                        sx={{
                            backgroundImage: `url(${LandingSliderImage.src})`,
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h2"
                            className="hero-section-title"
                        >
                            BON APPETIE
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            className="hero-section-subtitle"
                        >
                            FIND BEST RESTAURANTS NEAR YOU
                        </Typography>
                    </Box>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default HeroCarousal
