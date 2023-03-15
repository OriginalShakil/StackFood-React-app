import React from 'react'
import Profile from '../../../components/customer-page/profile/Profile'
import Meta from '../../../components/Meta'
import { useSelector } from 'react-redux'
import AuthGuard from '../../../components/authentication/AuthGuard'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const ProfileLayout = ({ configData }) => {
    const { userData } = useSelector((state) => state.user)

    return (
        <>
            <Meta
                title={`${userData?.f_name} - ${configData?.business_name}`}
                description=""
                keywords=""
            />
            <Profile />
        </>
    )
}
ProfileLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>

export default ProfileLayout
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
