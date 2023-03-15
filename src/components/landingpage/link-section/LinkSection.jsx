import React from 'react'
import {
    Box,
    Button,
    Card,
    Grid,
    Stack,
    styled,
    Typography,
} from '@mui/material'
import VirtaulRestaurant from '../../../../public/static/icons/VirtaulRestaurant.png'
import DeliveryMan from '../../../../public/static/icons/DeliveryMan.png'
import Waves from '../Waves'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { CustomCard, PrimaryButton } from './Linksection.style'

const LinkSection = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const router = useRouter()
    const deliveryManRegister = () => {
        window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/deliveryman/apply`)
    }
    const RestaurantRegister = () => {
        window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/apply`)
    }
const restaurantText=t("Open your own  virtual restaurant on")
    const deliveryText=t("Join as delivery man on")
    return (
        <>
            <Box mt="70px">
                <Grid
                    container
                    spacing={2}
                    className="link-section"
                    sx={{ my: 1 }}
                >
                    <Grid item xs={12} md={6}>
                        <CustomCard elevation={0}>
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                spacing={2}
                            >
                                <img
                                    src={VirtaulRestaurant.src}
                                    alt="icon"
                                    className="link-icon"
                                />
                                <Typography variant="h6">
                                    {t(
                                        `${restaurantText} ${global?.business_name}`
                                    )}
                                </Typography>
                                <PrimaryButton onClick={RestaurantRegister}>
                                    {t('Register')}
                                </PrimaryButton>
                            </Stack>
                        </CustomCard>
                        <Waves sx={{ display: { xs: 'block', md: 'none' } }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomCard elevation={0}>
                            <Stack
                                alignItems="center"
                                justifyContent="space-between"
                                textAlign="center"
                                height="100%"
                                spacing={2}
                            >
                                <img
                                    src={DeliveryMan.src}
                                    alt="icon"
                                    className="link-icon"
                                />

                                <Typography variant="h6">
                                    {t(
                                        `${deliveryText} ${global?.business_name}`
                                    )}
                                </Typography>

                                <PrimaryButton
                                    onClick={() => deliveryManRegister()}
                                >
                                    {t('Register')}
                                </PrimaryButton>
                            </Stack>
                        </CustomCard>
                        <Waves sx={{ display: { xs: 'block', md: 'none' } }} />
                    </Grid>
                </Grid>
                <Waves
                    sx={{ display: { xs: 'none', md: 'block' }, mt: '-10px' }}
                />
            </Box>
        </>
    )
}

export default LinkSection
