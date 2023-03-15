import React, {useEffect} from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";


const RefundPolicyPage = ({configData}) => {
     const { t } = useTranslation()
     const theme=useTheme()
    return (
        <Box marginTop={{xs:"50px",md:"150px"}}>
            <Grid container item md={12} xs={12} spacing={3}>
                <Grid item md={12} xs={12} alignItems="center" justifyContent="center">
                    <Typography textAlign="center" fontWeight="700" variant="h2" color={theme.palette.neutral[1000]}>{t("Refund Policy")}</Typography>
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.refund_policy_data,
                            }}
                        ></div>
                    </StyleThemBox>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RefundPolicyPage
