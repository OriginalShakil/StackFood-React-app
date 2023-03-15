import React, { useEffect, useState } from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import LandingBannerOne from '../../../public/static/banners/BannerOne.png'
import LandingBannerTwo from '../../../public/static/banners/BannerTwo.png'
import LandingHomeBannerLg from '../../../public/static/banners/HomeBannerLg.png'
import { LandingPageTypography } from './landingPageStyle'
import { useTranslation } from 'react-i18next'
import ImageNotFound from '../../../public/static/no-image-found.png'
import Skeleton from '@mui/material/Skeleton'
import {useRouter} from "next/router";

const demoData = [
    {
        title: '',
        img: ImageNotFound,
        sub_title: '',
    },
    {
        title: '',
        img: ImageNotFound,
        sub_title: '',
    },
]
const BannerSection = ({
    banner_section_half,
    discount_banner,
    global,
    isLoading,
}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        if (banner_section_half?.length > 0) {
            const newData = demoData.map((item, index) => ({
                ...item,
                title: banner_section_half[index]?.title || '',
                sub_title: banner_section_half[index]?.sub_title || '',
                img: banner_section_half[index]?.img,
            }))
            setData(newData)
        } else {
            setData(demoData)
        }
    }, [banner_section_half])
    const { t } = useTranslation()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const title = ''
    const subTitle = ''
    const discountUpTo = ''
    const discountItem = ''
    const router = useRouter()
    return (
        <>
            <Box>
                <Grid container spacing={2} sx={{ my: 1 }}>
                    {data.length===0 ? (
                        <>
                            {[...Array(2)].map((item, index) => {
                                return (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                                width: '100%',
                                                height: ' 250px',
                                                padding: '30px',
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width="140px"
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="140px"
                                            />
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </>
                    ) : (
                        data.map((item, index) => {
                            return (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card
                                        elevation={0}
                                        className={
                                            languageDirection === 'rtl'
                                                ? 'banner-card-sm rtlab'
                                                : 'banner-card-sm rtl'
                                        }
                                        sx={{
                                            backgroundImage: `url(${
                                                typeof item.img === 'string'
                                                    ? `${global?.base_urls?.react_landing_page_images}/${item.img}`
                                                    : ImageNotFound.src
                                            })`,
                                        }}
                                    >
                                        <LandingPageTypography variant="h6">
                                            {item.title}
                                        </LandingPageTypography>
                                        <LandingPageTypography sx={{ mt: 1 }}>
                                            {item.sub_title}
                                        </LandingPageTypography>
                                    </Card>
                                </Grid>
                            )
                        })
                    )}

                    { data.length >0 ? discount_banner && (
                        <Grid item xs={12} md={12} className="banner-item lg">
                            <Card
                                elevation={0}
                                className="banner-card-lg ltr"
                                sx={{
                                    backgroundImage: `url(${`${global?.base_urls?.react_landing_page_images}/${discount_banner.img}`})`,
                                }}
                            >
                                <LandingPageTypography variant="h6">
                                    {discount_banner.title}
                                </LandingPageTypography>
                                <LandingPageTypography sx={{ mt: 1 }}>
                                    {discount_banner.sub_title}
                                </LandingPageTypography>
                            </Card>
                        </Grid>
                    ) : <Grid item xs={12} md={12} className="banner-item lg">
                        <Card
                            elevation={0}
                        >
                            <Skeleton variant='rectangular' width='100%' height='180px'/>
                        </Card>
                    </Grid> }
                </Grid>
            </Box>
        </>
    )
}

export default BannerSection
