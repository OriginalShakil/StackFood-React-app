import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import img from '../../../public/static/help/image 43.png'
import img1 from '../../../public/static/help/image 47.png'
import img2 from '../../../public/static/help/image 46.png'
import img3 from '../../../public/static/help/image 45.png'
import {
    HelpBox,
    HelpTypographyBox,
    VisitBox,
    HelpImgBox,
    HelpGrid,
} from './Help.style'
import { useSelector } from 'react-redux'

import { TypographyText } from '../food-card/FoodCard.style'
import CustomImageContainer from "../CustomImageContainer";
import {useTranslation} from "react-i18next";



const HelpPage = ({configData}) => {
    const {t}=useTranslation()


    return (
        <Box>
            <Grid container md={12} xs={12}>
                <Grid item md={12} xs={12}>
                    <HelpBox>
                        {/*<CustomImageContainer src={img.src} alt="logo" />*/}
                        <img src={img.src} alt={t("help")} />
                    </HelpBox>
                </Grid>
                <Grid item md={12} xs={12}>
                    <HelpTypographyBox>
                        <TypographyText
                            sx={{ fontSize: '32px', fontWeight: '600' }}
                        >
                            {t("Need Any help?")}
                        </TypographyText>
                        <TypographyText sx={{ color: '#9B9B9B' }}>
                            {t ( "Communicate with our support team to get proper guidance to your quaternaries.")}
                        </TypographyText>
                    </HelpTypographyBox>
                </Grid>
            </Grid>

            <HelpGrid container md={12} xs={12} spacing={2}>
                <Grid item md={4} xs={12}>
                    <VisitBox>
                        <HelpImgBox>
                            <img src={img1.src} alt={t("help")} />
                        </HelpImgBox>
                        <Box sx={{ textAlign: 'center' }}>
                            <TypographyText
                                sx={{ fontSize: '26px', fontWeight: '700' }}
                            >
                                {t("VISIT US")}
                            </TypographyText>
                            <TypographyText
                                sx={{ fontSize: '14px',  }}
                            >
                                {configData?.address}
                            </TypographyText>
                        </Box>
                    </VisitBox>
                </Grid>
                <Grid item md={4} xs={12}>
                    <VisitBox>
                        <HelpImgBox>
                            <img src={img2.src} alt={t("help")} />
                        </HelpImgBox>
                        <Box sx={{ textAlign: 'center' }}>
                            <TypographyText
                                sx={{ fontSize: '26px', fontWeight: '700' }}
                            >
                                {t ("EMAIL US")}
                            </TypographyText>
                            <TypographyText
                                sx={{ fontSize: '14px',  }}
                            >
                                {configData?.email}
                            </TypographyText>
                        </Box>
                    </VisitBox>
                </Grid>
                <Grid item md={4} xs={12}>
                    <VisitBox>
                        <HelpImgBox>
                            <img src={img3.src} alt={t("help")} />
                        </HelpImgBox>
                        <Box sx={{ textAlign: 'center' }}>
                            <TypographyText
                                sx={{ fontSize: '26px', fontWeight: '700' }}
                            >
                                {t("CALL US")}
                            </TypographyText>
                            <TypographyText
                                sx={{ fontSize: '14px',  }}
                            >
                               {configData?.phone}
                            </TypographyText>
                        </Box>
                    </VisitBox>
                </Grid>
            </HelpGrid>
        </Box>
    )
}

export default HelpPage
