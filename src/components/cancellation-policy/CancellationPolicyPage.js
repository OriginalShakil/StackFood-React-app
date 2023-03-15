import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'
import {useTheme} from "@mui/material/styles";

const CancellationPolicyPage = ({configData}) => {
    const { t } = useTranslation()
    const theme=useTheme()
    return (
        <Box marginTop={{xs:"50px",md:"150px"}}>
            <Grid container item md={12} xs={12} spacing={3}>
                <Grid item md={12} xs={12} alignItems="center" justifyContent="center">
                    <Typography textAlign="center" fontWeight="700" variant="h2" color={theme.palette.neutral[1000]}>{t("Cancellation Policy")}</Typography>
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.cancellation_policy_data,
                            }}
                        ></div>
                    </StyleThemBox>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CancellationPolicyPage
