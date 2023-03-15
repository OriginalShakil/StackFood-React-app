import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import img from '../../../public/static/Privacy/RectangleP.png'
import { StyleThemBox } from '../food-card/FoodCard.style'
import { t } from 'i18next'
import { useTheme } from '@mui/material/styles'

const Privacypolicy = ({ configData }) => {
    const theme = useTheme()
    return (
        <Box sx={{ marginTop: { xs: '80px', md: '150px' } }}>
            <Grid container item md={12} xs={12} spacing={3}>
                <Grid
                    item
                    md={12}
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        textAlign="center"
                        fontWeight="700"
                        variant="h2"
                        color={theme.palette.neutral[1000]}
                    >
                        {t('Privacy Policy')}
                    </Typography>
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingBottom: '50px' }}>
                    <StyleThemBox>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: configData?.privacy_policy,
                            }}
                        ></div>
                    </StyleThemBox>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Privacypolicy
