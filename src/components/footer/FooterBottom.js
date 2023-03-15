import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Container, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { capitalize } from '../../utils/capitalize'

const FooterBottom = (props) => {
    const { global } = useSelector((state) => state.globalSettings)

    const { t } = useTranslation()
    const handleClick = (href) => {
        Router.push(href)
    }
    const languageDirection = localStorage.getItem('direction')
    return (
        <CustomStackFullWidth py="1.5rem" sx={{ backgroundColor: '#00000050' }}>
            <Container maxWidth="lg">
                <CustomStackFullWidth
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent={{ xs: 'center', sm: 'space-between' }}
                    flexWrap="wrap"
                    spacing={2}
                >
                    <CustomColouredTypography
                        variant="h5"
                        color="whiteContainer.main"
                    >
                        &#9400;{'  '}
                        {global?.footer_text || ''}
                    </CustomColouredTypography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <CustomColouredTypography
                            variant="h5"
                            color="whiteContainer.main"
                            onClick={() => handleClick('/terms-and-conditions')}
                            sx={{
                                cursor: 'pointer',
                                marginLeft:
                                    languageDirection === 'rtl' ? '10px' : '',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {t('Terms & Conditions')}
                        </CustomColouredTypography>
                        <CustomColouredTypography
                            variant="h5"
                            color="whiteContainer.main"
                            onClick={() => handleClick('/privacy-policy')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {t('Privacy Policy')}
                        </CustomColouredTypography>
                    </Stack>
                </CustomStackFullWidth>
            </Container>
        </CustomStackFullWidth>
    )
}

FooterBottom.propTypes = {}

export default FooterBottom
