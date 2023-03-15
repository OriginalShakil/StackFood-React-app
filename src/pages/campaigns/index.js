import React from 'react'
import Products from '../../components/products-page/Products'
import CampaignsPage from '../../components/products-page/CampaignsPage'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import Meta from '../../components/Meta'
import CategoryDetailsPage from '../../components/category/CategoryDetailsPage'
import { Container, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomPageTitle from '../../components/CustomPageTitle'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'

const index = ({ configData, landingPageData, pathName }) => {
    const { t } = useTranslation()
    return (
        <Container
            maxWidth="lg"
            sx={{
                mt: { xs: '5rem', md: '9rem' },
                mb: { xs: '72px', md: '0' },
            }}
        >
            <CustomStackFullWidth marginBottom="1.6rem">
                <CustomPaperBigCard>
                    <Meta
                        title={`${t('Campaigns')} on ${
                            configData?.business_name
                        }`}
                        ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                        pathName={pathName}
                    />
                    <CustomStackFullWidth spacing={2}>
                        <CustomPageTitle title={t('campaigns')} />
                        <CampaignsPage />
                    </CustomStackFullWidth>
                </CustomPaperBigCard>
            </CustomStackFullWidth>
        </Container>
    )
}

export default index
export const getServerSideProps = async ({ params, req, resolvedUrl }) => {
    const domain = req.headers.host
    const pathName = 'https://' + domain + resolvedUrl
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    const landingPageData = await landingPageApi.getLandingPageImages()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData.data,
            pathName: pathName,
        },
    }
}
