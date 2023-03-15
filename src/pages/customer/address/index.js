import React, { useTransition } from 'react'
import WithAuth from '../../../components/authentication/auth-guard'
import Address from '../../../components/customer-page/address/Address'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import AuthGuard from '../../../components/authentication/AuthGuard'
import SettingsLayout from '../settings'
import { useTranslation } from 'react-i18next'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const AddressLayout = ({ configData }) => {
    const { t } = useTranslation()
    return (
        <>
            <Meta title={`My Address - ${configData?.business_name}`} />
            <Address />
        </>
    )
}
AddressLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>

export default AddressLayout
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
