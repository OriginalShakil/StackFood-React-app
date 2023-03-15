import React from 'react'
import WithAuth from '../../../components/authentication/auth-guard'
import Loyalitys from '../../../components/customer-page/loyality/Loyality'
import Meta from '../../../components/Meta'
import NoSsr from '../../../components/noSSr/NoSsr'
import { useTranslation } from 'react-i18next'
import AuthGuard from '../../../components/authentication/AuthGuard'
import ProfileLayout from '../profile'

import ReferCodeProtect from '../../../components/route-protectors/ReferCodeProtect'
import ReferCode from '../../../components/customer-page/refer-code/ReferCode'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const index = ({ configData }) => {
    const { t } = useTranslation()
    return (
        <NoSsr>
            <div className="div">
                <Meta
                    title={`My Referral Code - ${configData?.business_name}`}
                />
                <ReferCodeProtect>
                    <ReferCode />
                </ReferCodeProtect>
            </div>
        </NoSsr>
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
