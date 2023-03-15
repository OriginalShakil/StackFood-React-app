import React from 'react'
import OrderDetail from '../../../components/order-details/OrderDetail'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const index = ({ configData }) => {
    return (
        <div className="div">
            <Meta title={`Order details - ${configData?.business_name}`} />

            <OrderDetail />
        </div>
    )
}

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
