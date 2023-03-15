import React from 'react';
import {CustomHeader} from "../../api/Headers";
import {landingPageApi} from "../../components/landingpage/Api";
import index from "../categories";
import Meta from "../../components/Meta";
import {t} from "i18next";
import AllCuisines from "../../components/cuisines-page/AllCuisines";

const Index = ({configData, landingPageData, pathName}) => {
    return (
        <>
            <Meta
                title={`${t('Categories')} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            <AllCuisines/>
        </>
    );
};

export default Index;

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