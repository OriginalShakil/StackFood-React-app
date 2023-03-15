import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { useSelector } from 'react-redux'
import { StyleThemBox } from '../food-card/FoodCard.style'
import {useTranslation} from "react-i18next";
import {ConfigApi} from "../../hooks/react-query/config/useConfig";
import {landingPageApi} from "../landingpage/Api";


const AboutUsPage = ({configData}) => {
    const {t}=useTranslation()
    return (
        <Box mt={{xs:"0px",md:"190px"}} >
            <Grid container item md={12} xs={12} spacing={3} justifyContent="center">
               <Typography variant="h3" align="center">{t("About Us")}</Typography>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.about_us,
                            }}
                        ></div>
                    </StyleThemBox>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AboutUsPage

