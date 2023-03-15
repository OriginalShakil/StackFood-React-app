import React from 'react'
import {Grid, Typography, Card, CardContent, Paper, Stack, useMediaQuery} from '@mui/material'
import Link from 'next/link'
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";

const ProfileStatistics = ({ value, title, image,pathname }) => {
    const theme=useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const {t} =useTranslation()
    return (
        <Link href={`${pathname}`}>
            <Grid item xs={6} sm={6} md={3} justifyContent="center" sx={{cursor:"pointer"}}>
                <Paper sx={{ minWidth: "100px" }} elevation={6} >
                    <CardContent >
                        <Grid
                            container
                            md={12}
                            xs={12}
                            sx={{ textAlign: 'center' }}


                        >
                            <Grid item md={10} xs={12}>
                                <Stack flexGrow="wrap" width="100%">
                                    <Typography
                                      variant={isSmall?"h4":"h2"}

                                        sx={{
                                            fontWeight: '500',
                                        }}
                                        color={theme.palette.primary.main}
                                    >
                                        {value}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px',textTransform:"capitalize" }}>
                                        {t(title)}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={2} xs={2} >
                                <Stack  sx={{
                                    display: { xs: 'none', md: 'inline' },

                                }}>
                                    <img src={image} alt="" />
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </Grid>
        </Link>
    )
}
export default ProfileStatistics
