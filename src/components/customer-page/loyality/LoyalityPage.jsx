import React from 'react'
import { Grid, Typography, Divider, Stack } from '@mui/material'
import { CustomTypographyGray } from '../../error/Errors.style'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
const LoyalityPage = ({ data }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const languageDirection = localStorage.getItem('direction')
    return (
        <>
            <Grid
                container
                md={12}
                xs={12}
                spacing={2}
                sx={{ padding: '10px' }}
            >
                <Grid item md={7} xs={4.5}>
                    <Typography sx={{ fontWeight: '700' }}>
                        $
                        {data?.loyality?.transaction_type === 'point_to_wallet'
                            ? data?.loyality?.debit
                            : data?.loyality?.credit}
                    </Typography>
                    <CustomTypographyGray
                        sx={{ fontSize: '14px', textTransform: 'capitalize' }}
                    >
                        {t(data?.loyality?.transaction_type).replaceAll('_', ' ')}
                    </CustomTypographyGray>
                </Grid>
                <Grid item md={5} xs={7.5} justifySelf="flex-end">
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={{ xs: 1, md:languageDirection==="rtl"? 0:3 }}
                        flexWrap="wrap"

                    >
                        <CustomTypographyGray sx={{ fontSize: '14px' }}>
                            {data?.loyality?.created_at}
                        </CustomTypographyGray>
                        <Typography

                            sx={{
                                fontSize: '14px',
                                textTransform: 'capitalize',
                                paddingRight:languageDirection==='rtl'?"24px":"0px"
                            }}
                            color={
                                data?.loyality?.transaction_type ===
                                'point_to_wallet'
                                    ? theme.palette.success.main:theme.palette.error.main
                            }
                        >
                            {data?.loyality?.transaction_type ===
                            'point_to_wallet'
                                ? t('debit')
                                : t('credit')}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default LoyalityPage
