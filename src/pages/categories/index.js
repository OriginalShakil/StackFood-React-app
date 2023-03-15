import React from 'react'
import Category from '../../components/category/Category'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'

const index = ({ configData, landingPageData, pathName }) => {
    const { t } = useTranslation()
    return (
        <div className="div">
            <Meta
                title={`${t('Categories')} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            <Category />
        </div>
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
