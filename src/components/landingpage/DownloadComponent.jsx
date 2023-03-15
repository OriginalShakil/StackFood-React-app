import React from 'react'
import { Button, styled } from '@mui/material'
import { LandingPageTypographyWhite } from './landingPageStyle'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import AppLinks from './AppLinks'

const DownloadComponent = (props) => {
    const { landing_page_links } = props
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const ImageButton = styled(Button)(({ theme }) => ({
        width: '153px',
        height: '50px',
        padding: '0',
    }))
    const goToApp = (s) => {
        window.open(s)
    }
    return (
        <>
            {(Number.parseInt(landing_page_links?.app_url_android_status) ===
                1 ||
                Number.parseInt(landing_page_links?.app_url_ios_status) ===
                    1) && (
                <CustomStackFullWidth
                    alignItems="center"
                    justifyContent="center"
                >
                    <LandingPageTypographyWhite variant="h2">
                        {t('Download app to enjoy more!')}
                    </LandingPageTypographyWhite>
                    <LandingPageTypographyWhite sx={{ mt: 1 }}>
                        {t(
                            'Download our app from google play store & app store.'
                        )}
                    </LandingPageTypographyWhite>
                    <AppLinks
                        global={global}
                        landing_page_links={landing_page_links}
                    />
                </CustomStackFullWidth>
            )}
        </>
    )
}

export default DownloadComponent
