import React from 'react'
import WithAuth from '../../../components/authentication/auth-guard'
import Settings from '../../../components/customer-page/settings/Settings'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import HomeGuard from '../../../components/home-guard/HomeGuard'
import HomePage from '../../home'
import AuthGuard from '../../../components/authentication/AuthGuard'
import { useTranslation } from 'react-i18next'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const SettingsLayout = ({ configData }) => {
    const { t } = useTranslation()
    return (
        <div className="div">
            <Meta title={`Settings - ${configData?.business_name}`} />

            <Settings />
        </div>
    )
}
SettingsLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>
export default SettingsLayout
export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    return {
        props: {
            configData: config,
        },
    }
}
