import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Container, Grid, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import LogoSide from '../navbar/second-navbar/LogoSide'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'
import AppLinks from '../landingpage/AppLinks'
import RouteLinks from './RouteLinks'
import SomeInfo from './SomeInfo'
import ractangle from '../../../public/static/footer/Rectangle.svg'
import phone from '../../../public/static/footer/phone.svg'
import magnifying from '../../../public/static/footer/magnifying.svg'
import { useTheme } from '@mui/material/styles'

const FooterMiddle = (props) => {
    const { global, token } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth alignItems="center" py="3rem">
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 1, md: 4 }}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3.5}
                        align={isSmall && 'center'}
                    >
                        <CustomStackFullWidth
                            spacing={4}
                            alignItems={{ xs: 'center', sm: 'flex-start' }}
                            justifyContent="flex-start"
                        >
                            <Link href={zoneid ? '/home' : '/'}>
                                <LogoSide global={global} width="200px" />
                            </Link>
                            <SocialLinks global={global} />
                            <AppLinks global={global} />
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2.5}
                        align={isSmall && 'center'}
                    >
                        <RouteLinks token={token} global={global} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <SomeInfo
                            image={ractangle}
                            alt="rantangle"
                            title="Send us mails"
                            info={global?.email}
                            t={t}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <SomeInfo
                            image={phone}
                            alt="Phone"
                            title="Contact us"
                            info={global?.phone}
                            t={t}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <SomeInfo
                            image={magnifying}
                            alt="magnifying"
                            title="Find us here"
                            info={global?.address}
                            t={t}
                        />
                    </Grid>
                </Grid>
            </Container>
        </CustomStackFullWidth>
    )
}

FooterMiddle.propTypes = {}

export default FooterMiddle
