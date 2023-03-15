import LandingPage from '../components/landingpage'
import React, { useEffect } from 'react'
import PushNotificationLayout from '../components/PushNotificationLayout'
import Meta from '../components/Meta'
import { setGlobalSettings } from '../redux/slices/global'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { CustomHeader } from '../api/Headers'

const Home = ({ configData, landingPageData }) => {
    console.log(landingPageData)
    const dispatch = useDispatch()
    useEffect(() => {
        if (configData && landingPageData) {
            if (configData.length === 0 && landingPageData.length === 0) {
                Router.push('/404')
            } else {
                dispatch(setGlobalSettings(configData))
            }
        } else {
        }
    }, [configData, landingPageData])
    return (
        <>
            <Meta
                title={configData?.business_name}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
            />
            <PushNotificationLayout>
                {configData && landingPageData && (
                    <LandingPage
                        global={configData}
                        landingPageData={landingPageData}
                    />
                )}
            </PushNotificationLayout>
        </>
    )
}
export default Home

export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    const landingPageRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/landing-page`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const landingPageData = await landingPageRes.json()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData,
        },
    }

    // if (config.length>0 && landingPageData.length>0) {
    //     return {
    //         props: {
    //             configData: config,
    //             landingPageData: landingPageData,
    //         },
    //     }
    // } else {
    //     return {
    //         redirect: {
    //             destination: '/404',
    //             permanent: false,
    //         },
    //     }
    // }
}
