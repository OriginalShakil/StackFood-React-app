import React from 'react'
import { Box, Grid, Stack } from '@mui/material'
import DownloadComponent from './DownloadComponent'
import LandingDownloadBanner from '../../../public/static/banners/DownloadBanner.png'

import Link from 'next/link'
import CustomImageContainer from '../CustomImageContainer'
import { imageNotFoundPlaceholder } from '../../utils/LocalImages'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const DownloadSection = ({ global, app_section_image, landing_page_links }) => {
    const appImge = ''
    const { t } = useTranslation()
    return (
        <CustomStackFullWidth>
            <Grid container spacing={2} sx={{ my: 1 }} alignItems={'center'}>
                <Grid item xs={12} md={6} align="center">
                    <CustomImageContainer
                        src={
                            app_section_image
                                ? `${global?.base_urls?.react_landing_page_images}/${app_section_image}`
                                : imageNotFoundPlaceholder.src
                        }
                        height="500px"
                        maxWidth="300px"
                        objectFit="contained"
                        alt={t('App View')}
                    />
                </Grid>
                <Grid item xs={12} md={6} align="center">
                    {landing_page_links && (
                        <DownloadComponent
                            className="download-component"
                            landing_page_links={landing_page_links}
                        />
                    )}
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    )
}

export default DownloadSection
