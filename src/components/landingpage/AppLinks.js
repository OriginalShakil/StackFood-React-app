import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { CustomButton } from './Landingpage.style'
import CustomImageContainer from '../CustomImageContainer'
import GooglePlay from '../../../public/static/GooglePlay.png'
import AppStore from '../../../public/static/AppStore.png'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const AppLinks = (props) => {
    const { global, landing_page_links } = props
    const goToApp = (href) => {
        window.open(href)
    }
    let languageDirection
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            gap={languageDirection === 'rtl' && '10px'}
        >
            {Number.parseInt(landing_page_links?.app_url_android_status) ===
                1 && (
                <CustomButton
                    onClick={() => goToApp(landing_page_links?.app_url_android)}
                >
                    <CustomImageContainer
                        src={GooglePlay.src}
                        alt="GooglePlay"
                        objectFit="contained"
                    />
                </CustomButton>
            )}

            {Number.parseInt(landing_page_links?.app_url_ios_status) === 1 && (
                <CustomButton
                    onClick={() => goToApp(landing_page_links?.app_url_ios)}
                >
                    <CustomImageContainer
                        src={AppStore.src}
                        alt="GooglePlay"
                        objectFit="contained"
                    />
                </CustomButton>
            )}

            {/* </Link> */}
        </Stack>
    )
}

AppLinks.propTypes = {}

export default AppLinks
