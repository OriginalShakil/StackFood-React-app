import React from 'react'
import {
    CustomLink,
    FlexContainer,
    ImageContainer,
} from '../../styled-components/CustomStyles.style'
import icon from '../../assets/images/icons/icon.png'
import { useTranslation } from 'react-i18next'
import { CustomColouredTypographyForDashboardNavbarLogo } from './Dashboard.style'

const DashboardNavbarLogo = () => {
    const { t } = useTranslation()
    return (
        <>
            <CustomLink to="/admin/dashboard">
                <FlexContainer>
                    <ImageContainer>
                        <img src={icon} alt="icon" />
                    </ImageContainer>
                    <CustomColouredTypographyForDashboardNavbarLogo variant="h4">
                        {t('On Demand Service')}
                    </CustomColouredTypographyForDashboardNavbarLogo>
                </FlexContainer>
            </CustomLink>
        </>
    )
}

export default DashboardNavbarLogo
