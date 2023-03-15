import React from 'react'
import FooterLg from './FooterLg'
import FooterSm from './FooterSm'
import footerBg from './footerBg.svg'
import { StyledFooterBackground } from './Footer.style'
import { Container } from '@mui/material'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'
import FooterBottom from './FooterBottom'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'
const Footer = ({ languageDirection }) => {
    // const languageDirection = localStorage.getItem('direction')
    const router = useRouter()

    return (
        <StyledFooterBackground router={router.pathname}>
            <CustomStackFullWidth
                height="100%"
                alignItems="center"
                justifyContent="space-between"
            >
                <FooterTop />
                <FooterMiddle />
                <FooterBottom />
            </CustomStackFullWidth>
        </StyledFooterBackground>
    )
}

export default Footer
