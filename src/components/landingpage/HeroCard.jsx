import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import HeroLocationForm from './HeroLocationForm'
import { useTranslation } from 'react-i18next'
import { HeroCardTypography } from './Landingpage.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const HeroCard = (props) => {

    const subTitle = ''
    const { t } = useTranslation()
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <>
            <Card {...props}>
                <CardContent sx={{ width: '100%' }}>
                    <HeroCardTypography>
                        {props?.banner_section_full?.full_banner_section_title}
                    </HeroCardTypography>
                    <HeroCardTypography variant="h3" subtitle="true">
                        {
                            props?.banner_section_full
                                ?.full_banner_section_sub_title
                        }
                    </HeroCardTypography>
                    {!isXSmall && (
                        <HeroLocationForm
                            modalview={props.modalview}
                            handleModalClose={props.handleModalClose}
                        />
                    )}
                </CardContent>
            </Card>
            {isXSmall && (
                <HeroLocationForm
                    modalview={props.modalview}
                    handleModalClose={props.handleModalClose}
                />
            )}
        </>
    )
}

export default HeroCard
