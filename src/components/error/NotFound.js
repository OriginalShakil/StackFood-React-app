import React, { useEffect } from 'react'
import { Stack } from '@mui/material'

import {
    ContentWrapper,
    CustomPaperForNotFound,
    CustomTypographyGray,
    ImageContainerForNotFound,
} from './Errors.style'
import icon from '../../assets/images/icons/404icon.png'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
const NotFound = () => {
    const Router = useRouter()
    const { t } = useTranslation()
    Router.push('/')
    // useEffect(() => {
    //     Router.push('/')
    // }, [])

    return (
        <>
            {/* <DashboardNavbar notFound={true} /> */}
            <ContentWrapper maxWidth="xxl">
                <CustomPaperForNotFound>
                    <Stack alignItems="center" spacing={1}>
                        <ImageContainerForNotFound>
                            <img src={icon.src} alt="icon" />
                        </ImageContainerForNotFound>
                        <CustomTypographyGray variant="h1">
                            {t('Page not found')}
                        </CustomTypographyGray>
                        {/* <CustomLink to="/admin/dashboard">
                            <CustomButtonGray>
                                <CustomTypographyForError>
                                    {t('Go Back Home')}
                                </CustomTypographyForError>
                            </CustomButtonGray>
                        </CustomLink> */}
                    </Stack>
                </CustomPaperForNotFound>
            </ContentWrapper>
        </>
    )
}

export default NotFound
