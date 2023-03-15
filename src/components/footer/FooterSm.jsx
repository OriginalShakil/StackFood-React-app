import React from 'react'
import {
    Box,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'
//import FooterLogo from '../../Assets/footer-logo.png';
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import DownloadComponent from '../landingpage/DownloadComponent'
import LetsConnect from './LetsConnect'
import LogoColor from '../../../public/static/header/logo.png'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
const FooterSm = (props) => {
    const { t } = useTranslation()

    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    let token = undefined
    if (typeof window != 'undefined') {
        token = localStorage.getItem('token')
    }
    return (
        <>
            <Box {...props}>
                <Box className="footer-top">
                    <Container>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} md={5}>
                                <Link href={zoneid ? '/home' : '/'}>
                                    <img
                                        src={LogoColor.src}
                                        alt="Footer Logo"
                                        className="footer-logo"
                                    />
                                </Link>
                                <DownloadComponent className="download-component" />
                                <LetsConnect />
                            </Grid>
                            <Grid item xs={12} md={3} sx={{ mt: 3 }}>
                                <Box textAlign={'center'}>
                                    <Typography
                                        color={'#828282'}
                                        className="font-signika-negative"
                                    >
                                        24/7 Helpline
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: '700' }}
                                        color={'#473E38'}
                                        className="font-signika-negative"
                                    >
                                        +760 3498768
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ mb: 3 }}>
                                <Stack direction={'column'}>
                                    <Stack
                                        direction={'row'}
                                        spacing={1}
                                        justifyContent={'center'}
                                    >
                                        <IconButton
                                            sx={{ color: '#EF7822' }}
                                            aria-label="Facebook"
                                        >
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: '#EF7822' }}
                                            aria-label="Instagram"
                                        >
                                            <InstagramIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: '#EF7822' }}
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: '#EF7822' }}
                                            aria-label="Twitter"
                                        >
                                            <TwitterIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box className="footer-middle">
                    <Container>
                        <Grid container>
                            <Grid item xs={12} md={5}>
                                <Grid container>
                                    <Grid item xs={12} md={6} sx={{ mb: 3 }}>
                                        <Stack
                                            className="footer-menu"
                                            direction={'column'}
                                            spacing={2}
                                            justifyContent={'center'}
                                            textAlign={'center'}
                                            sx={{ color: '#000' }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                className="footer-menu-title"
                                            >
                                                My account
                                            </Typography>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/profile'
                                                        : '/'
                                                }
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    Profile
                                                </Typography>
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/address'
                                                        : '/'
                                                }
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    Address
                                                </Typography>
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/order-history'
                                                        : '/'
                                                }
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    My Orders
                                                </Typography>
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/wallets'
                                                        : '/'
                                                }
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    Wallet
                                                </Typography>
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/loyality'
                                                        : '/'
                                                }
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {' '}
                                                    Loyality Points
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ mb: 3 }}>
                                        <Stack
                                            className="footer-menu"
                                            direction={'column'}
                                            spacing={2}
                                            justifyContent={'center'}
                                            textAlign={'center'}
                                            sx={{ color: '#000' }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                className="footer-menu-title"
                                            >
                                                Others
                                            </Typography>
                                            <Link href="/terms-and-conditions">
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {t('Terms & Conditions')}
                                                </Typography>
                                            </Link>
                                            <Link href="/privacy-policy">
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {t('Privacy Policies')}
                                                </Typography>
                                            </Link>
                                            <Link
                                                href="/help-and-support"
                                                underline="none"
                                                color="#000000"
                                            >
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {t('Help & Support')}
                                                </Typography>
                                            </Link>
                                            <Link href="#">
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {t('About Us')}
                                                </Typography>
                                            </Link>
                                            <Link href="/help-and-support">
                                                <Typography
                                                    underline="none"
                                                    color="#000000"
                                                >
                                                    {t('Contact Us')}
                                                </Typography>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Stack
                                    className="footer-menu"
                                    direction={'column'}
                                    spacing={2}
                                    justifyContent={'center'}
                                    textAlign={'center'}
                                    sx={{ color: '#000' }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        className="footer-menu-title"
                                    >
                                        {t(' Quick Links')}
                                    </Typography>
                                    <Link href={zoneid ? '/restaurant' : '/'}>
                                        <Typography
                                            underline="none"
                                            color="#000000"
                                        >
                                            {t('Campaigns')}
                                        </Typography>
                                    </Link>
                                    <Link href={zoneid ? '/restaurant' : '/'}>
                                        <Typography
                                            underline="none"
                                            color="#000000"
                                        >
                                            {t('Restaurants')}
                                        </Typography>
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box className="footer-bottom">
                    <Container>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12}>
                                <Typography
                                    color={'#000'}
                                    textAlign={'center'}
                                    fontWeight={600}
                                >
                                    Copyright © 2021 array it Ltd
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default FooterSm
