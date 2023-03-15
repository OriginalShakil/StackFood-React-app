import React from 'react'
import OrderHistory from '../../components/order-history/OrderHistory'
import Meta from '../../components/Meta'
import { useSelector } from 'react-redux'
import AuthGuard from '../../components/authentication/AuthGuard'
import ProfileLayout from '../customer/profile'
import PushNotificationLayout from '../../components/PushNotificationLayout'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'

const OrderLayout = ({ configData }) => {
    return (
        <>
            <div className="div">
                <Meta title={`My Orders - ${configData?.business_name}`} />

                <PushNotificationLayout>
                    <OrderHistory />
                </PushNotificationLayout>
            </div>
        </>
    )
}
OrderLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>
export default OrderLayout
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
