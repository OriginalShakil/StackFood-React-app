import React from 'react'
import { Modal } from '@mui/material'
import ForgotPassword from '../../components/auth/forgot-password/ForgotPassword'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import Meta from '../../components/Meta'
import { CustomHeader } from '../../api/Headers'

const index = ({ configData }) => {
    return (
        <>
            <Meta title={`Forgot Password - ${configData?.business_name}`} />
            <ForgotPassword />
        </>
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
