import React from 'react'
import WithAuth from '../../../components/authentication/auth-guard'
import Coupon from '../../../components/customer-page/coupon/Coupon'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import { useTranslation } from 'react-i18next'
import AuthGuard from '../../../components/authentication/AuthGuard'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const index = ({ configData }) => {
    const { t } = useTranslation()
    return (
        <div className="div">
            <Meta title={`My Coupons - ${configData?.business_name}`} />
            <Coupon />
        </div>
    )
}
index.getLayout = (page) => <AuthGuard>{page}</AuthGuard>
export default index
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
