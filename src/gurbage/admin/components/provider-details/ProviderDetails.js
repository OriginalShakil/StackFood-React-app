import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Overview from './Overview'
import SubscribedServices from './SubscribedServices'
import Orders from './Orders'
import ServiceManList from './ServiceManList'
import Settings from './Settings'
import Reviews from './Reviews'
import {
    CustomTab,
    CustomTabsForProviderDetails,
    CustomTypographyForProviderDetails,
} from './ProviderDetails.style'
// import { Helmet } from 'react-helmet'
import {
    CustomBoxFullWidth,
    CustomBoxWithSpacing,
} from '../../../../styled-components/CustomStyles.style'

const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Subscribed Services', value: 'subscribed_services' },
    { label: 'Orders', value: 'orders' },
    { label: 'Service Man List', value: 'service_man_list' },
    { label: 'Settings', value: 'settings' },
    { label: 'Reviews', value: 'reviews' },
]

const ProviderDetails = (props) => {
    const [currentTab, setCurrentTab] = useState('overview')
    const { t } = useTranslation()
    const handleTabsChange = (event, value) => {
        setCurrentTab(value)
    }

    return (
        <>
            {/* <Helmet> */}
                <title>{t('Provider Details')}</title>
            {/* </Helmet> */}
            <CustomBoxFullWidth>
                <Typography variant="h3">
                    {t('Provider Details With Cards and Tabs')}
                </Typography>
                <CustomBoxWithSpacing marginTopBottom={1.125}>
                    <CustomTabsForProviderDetails
                        indicatorColor="primary"
                        onChange={handleTabsChange}
                        scrollButtons="auto"
                        textColor="primary"
                        value={currentTab}
                        variant="scrollable"
                        TabIndicatorProps={{
                            style: {
                                display: 'none',
                            },
                        }}
                    >
                        {tabs.map((tab) => (
                            <CustomTab
                                variant="fullWidth"
                                currentTab={currentTab}
                                key={tab.value}
                                label={
                                    <CustomTypographyForProviderDetails
                                        variant="h5"
                                        currentTab={currentTab}
                                        tabValue={tab.value}
                                    >
                                        {t(tab.label)}
                                    </CustomTypographyForProviderDetails>
                                }
                                value={tab.value}
                            />
                        ))}
                    </CustomTabsForProviderDetails>
                </CustomBoxWithSpacing>
                <Box>
                    {currentTab === 'overview' && <Overview />}
                    {currentTab === 'subscribed_services' && (
                        <SubscribedServices />
                    )}
                    {currentTab === 'orders' && <Orders />}
                    {currentTab === 'service_man_list' && <ServiceManList />}
                    {currentTab === 'settings' && <Settings />}
                    {currentTab === 'reviews' && <Reviews />}
                </Box>
            </CustomBoxFullWidth>
        </>
    )
}

ProviderDetails.propTypes = {}

export default ProviderDetails
