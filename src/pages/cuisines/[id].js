import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {CustomPaperBigCard, CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import CuisinesDetailsPage from "../../components/cuisines-page/CuisinesDetailsPage";
import {useRouter} from "next/router";
import {useGetCuisinesDetails} from "../../hooks/react-query/cuisines/useGetCuisinesDetails";
import {CustomHeader} from "../../api/Headers";
import {landingPageApi} from "../../components/landingpage/Api";
import Meta from "../../components/Meta";
import {t} from "i18next";

const Index = ({configData, landingPageData, pathName}) => {
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(10)
    const router = useRouter()
    const { id, name } = router.query
const {data ,refetch,isLoading}=useGetCuisinesDetails({id,page_limit,offset})

    useEffect(()=>{
        refetch()
    },[id])
    return (
        <>
            <Meta
                title={`${name} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            <Container
                maxWidth="lg"
                sx={{
                    mt: { xs: '5rem', md: '9rem' },
                    mb: { xs: '72px', md: '30px' },
                }}
            >
                <CustomStackFullWidth>
                    <CustomPaperBigCard>
                        <CuisinesDetailsPage data={data} isLoading={isLoading}/>
                    </CustomPaperBigCard>
                </CustomStackFullWidth>
            </Container>

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
