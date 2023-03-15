import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import HeroSection from './HeroSection'
import FunFactSection from './FunFactSection'
import BannerSection from './BannerSection'
import LinkSection from './link-section/LinkSection'
import DownloadSection from './DownloadSection'
//import useConfig from '../../hooks/react-query/config/useConfig';
import { useQuery } from 'react-query'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalSettings } from '../../redux/slices/global'
import Demo from '../Exm'
import { useWishListGet } from '../../hooks/react-query/config/wish-list/useWishListGet'
import { onErrorResponse } from '../ErrorResponse'
import { landingPageApi } from './Api'

const LandingPage = (props) => {
    const { global, landingPageData } = props
    const dispatch = useDispatch()
    //const { global } = useSelector((state) => state.globalSettings)
    const [zoneid, setZoneid] = useState(null)
    // const handleOnSuccess = (response) => {
    //     dispatch(setGlobalSettings(response?.data))
    // }
    const isAppUrlExist = global?.app_url_android || global?.app_url_ios
    // const { isLoading, data, isError, error, refetch } = useQuery(
    //     ['config'],
    //     ConfigApi.config,
    //     {
    //         enabled: false,
    //         onSuccess: handleOnSuccess,
    //         onError: onErrorResponse,
    //     }
    // )
    // const { data: landingPageImages, refetch: refetchLandingPageImages } =
    //     useQuery(['landing-page'], landingPageApi.getLandingPageImages, {
    //         enabled: false,
    //         // onSuccess: handleOnSuccess,
    //         onError: onErrorResponse,
    //     })
    useEffect(async () => {
        //await refetch()
        //await refetchLandingPageImages()
        if (typeof window !== 'undefined') {
            setZoneid(JSON.parse(localStorage.getItem('zoneid')))
        }
    }, [])
    const handleModalClose = () => {}

    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    mt: { md: zoneid && '9rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >
                <HeroSection
                    business_name={global?.business_name}
                    banner_section_full={landingPageData?.banner_section_full}
                    handleModalClose={handleModalClose}
                />
                <FunFactSection
                    global={global}
                    react_feature={landingPageData?.react_feature}
                />
                <BannerSection
                    global={global}
                    banner_section_half={landingPageData?.banner_section_half}
                    discount_banner={landingPageData?.discount_banner}
                    isLoading={!landingPageData?.discount_banner}
                />
                <LinkSection />
                {(Number.parseInt(
                    landingPageData?.landing_page_links?.app_url_android_status
                ) === 1 ||
                    Number.parseInt(
                        landingPageData?.landing_page_links?.app_url_ios_status
                    ) === 1) && (
                    <DownloadSection
                        global={global}
                        app_section_image={landingPageData?.app_section_image}
                        landing_page_links={landingPageData?.landing_page_links}
                    />
                )}
            </Container>
        </>
    )
}

export default LandingPage
