import React from 'react'
import { memo } from 'react'
import {
    Box,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'
import FooterLogo from '../../../public/static/footer/footer-logo.png'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
//import DownloadComponent from '../Home/DownloadComponent';
import LetsConnect from './LetsConnect'
import DownloadComponent from '../landingpage/DownloadComponent'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import CustomLogo from '../CustomLogo'
import { useSelector } from 'react-redux'
import { TopBarButton } from '../navbar/Navbar.style'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import CustomCallTo from '../CustomCallTo'
import { CustomTypography } from '../custom-tables/Tables.style'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import LogoSide from '../navbar/second-navbar/LogoSide'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterLg = (props) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const businessLogo = global?.base_urls?.business_logo_url
    const isAppUrlExist = global?.app_url_android || global?.app_url_ios

    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    let token = undefined
    if (typeof window != 'undefined') {
        token = localStorage.getItem('token')
    }
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            <Box {...props}>
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.footerTopBg,
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        color: (theme) => theme.palette.whiteContainer.main,
                    }}
                >
                    <Container>
                        <Grid
                            container
                            alignItems="center"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            <Grid
                                item
                                xs={12}
                                md={5}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Link href={zoneid ? '/home' : '/'}>
                                    <LogoSide global={global} width="160px" />
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack direction={'column'}>
                                    <CustomTypography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.whiteContainer
                                                    .main,
                                        }}
                                    >
                                        {t('Follow us on')}
                                    </CustomTypography>
                                    <Stack direction={'row'} spacing={1}>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Facebook"
                                        >
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Instagram"
                                        >
                                            <InstagramIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Twitter"
                                        >
                                            <TwitterIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box
                                    textAlign={
                                        props?.languageDirection === 'rtl'
                                            ? 'center'
                                            : 'right'
                                    }
                                >
                                    <CustomTypography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                        }}
                                    >
                                        {t('24/7 Helpline')}
                                    </CustomTypography>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-end"
                                    >
                                        <CustomCallTo phone={global?.phone}>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <LocalPhoneIcon fontSize="small" />
                                                <CustomColouredTypography
                                                    color={
                                                        theme.palette
                                                            .whiteContainer.main
                                                    }
                                                >
                                                    {global?.phone}
                                                </CustomColouredTypography>
                                            </Stack>
                                        </CustomCallTo>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        <CustomStackFullWidth
                            alignItems="center"
                            spacing={2}
                            sx={{ display: { md: 'none' } }}
                        >
                            <Link href={zoneid ? '/home' : '/'}>
                                <LogoSide global={global} width="160px" />
                            </Link>
                            <CustomStackFullWidth
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={1}
                                flexWrap="wrap"
                            >
                                <Stack direction={'column'}>
                                    <CustomTypography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.whiteContainer
                                                    .main,
                                        }}
                                    >
                                        {t('Follow us on')}
                                    </CustomTypography>
                                    <Stack direction={'row'} spacing={1}>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Facebook"
                                        >
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Instagram"
                                        >
                                            <InstagramIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.neutral[300],
                                            }}
                                            aria-label="Twitter"
                                        >
                                            <TwitterIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                                <Box
                                    textAlign={
                                        props?.languageDirection === 'rtl'
                                            ? 'center'
                                            : 'right'
                                    }
                                >
                                    <CustomTypography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                        }}
                                    >
                                        {t('24/7 Helpline')}
                                    </CustomTypography>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-end"
                                    >
                                        <CustomCallTo phone={global?.phone}>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <LocalPhoneIcon fontSize="small" />
                                                <CustomColouredTypography
                                                    color={
                                                        theme.palette
                                                            .whiteContainer.main
                                                    }
                                                >
                                                    {global?.phone}
                                                </CustomColouredTypography>
                                            </Stack>
                                        </CustomCallTo>
                                    </Stack>
                                </Box>
                            </CustomStackFullWidth>
                        </CustomStackFullWidth>
                    </Container>
                </Box>
                <Box
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.footerMiddleBg,
                        paddingTop: ' 30px',
                        paddingBottom: '30px',
                        color: (theme) => theme.palette.whiteContainer.main,
                    }}
                >
                    <Container>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={5}>
                                {isAppUrlExist && <DownloadComponent />}
                                <LetsConnect
                                    languageDirection={props?.languageDirection}
                                    web="web"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={5}>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            justifyContent="flex-start"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.whiteContainer
                                                        .main,
                                            }}
                                        >
                                            <CustomTypography
                                                variant="h6"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    color: (theme) =>
                                                        theme.palette
                                                            .whiteContainer
                                                            .main,
                                                }}
                                            >
                                                {t('My account')}
                                            </CustomTypography>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/profile'
                                                        : '/'
                                                }
                                            >
                                                {t('Profile')}
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/address'
                                                        : '/'
                                                }
                                            >
                                                {t('Address')}
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/order-history'
                                                        : '/'
                                                }
                                            >
                                                {t('My Orders')}
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/wallets'
                                                        : '/'
                                                }
                                            >
                                                {t('Wallet')}
                                            </Link>
                                            <Link
                                                href={
                                                    token
                                                        ? '/customer/loyality'
                                                        : '/'
                                                }
                                            >
                                                {t('Loyalty Points')}
                                            </Link>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={6}>
                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            justifyContent="flex-start"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.whiteContainer
                                                        .main,
                                            }}
                                        >
                                            <CustomTypography
                                                variant="h6"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    color: (theme) =>
                                                        theme.palette
                                                            .whiteContainer
                                                            .main,
                                                }}
                                            >
                                                {t('Others')}
                                            </CustomTypography>
                                            <Link href="/help-and-support">
                                                {t('Help & Support')}
                                            </Link>
                                            <Link href="/about-us">
                                                {t('About Us')}
                                            </Link>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={2} md={2}>
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    justifyContent="flex-end"
                                    textAlign="right"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.neutral[100],
                                    }}
                                >
                                    <CustomTypography
                                        variant="h6"
                                        sx={{
                                            textTransform: 'uppercase',
                                            color: (theme) =>
                                                theme.palette.whiteContainer
                                                    .main,
                                        }}
                                    >
                                        {t('Quick Links')}
                                    </CustomTypography>
                                    <Link href={zoneid ? '/restaurant' : '/'}>
                                        {t('Restaurants')}
                                    </Link>
                                    <Link href={zoneid ? '/campaigns' : '/'}>
                                        {t('Campaigns')}
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.footerCenterBg,
                        paddingTop: '10px',
                        paddingBottom: ' 10px',
                        color: (theme) => theme.palette.whiteContainer.main,
                    }}
                >
                    <Container>
                        <CustomStackFullWidth
                            direction={{ xs: 'column-reverse', sm: 'row' }}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>
                                {t('Copyright ©')} 2022 {global?.business_name}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="flex-end"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.whiteContainer.main,
                                }}
                            >
                                <Link
                                    href="/terms-and-conditions"
                                    component="button"
                                    underline="none"
                                    color="inherit"
                                >
                                    {t('Terms & Conditions')}
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    component="button"
                                    underline="none"
                                    color="inherit"
                                >
                                    {t('Privacy Policy')}
                                </Link>
                            </Stack>
                        </CustomStackFullWidth>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default memo(FooterLg)
