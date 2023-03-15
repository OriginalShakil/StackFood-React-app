import React from 'react'
import Wallet from '../../../components/customer-page/wallets/Wallet'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import AuthGuard from '../../../components/authentication/AuthGuard'
import { useTranslation } from 'react-i18next'
import WalletProtect from '../../../components/route-protectors/WalletProtect'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../../api/Headers'

const WalletLayout = ({ configData }) => {
    const { t } = useTranslation()

    return (
        <div className="div">
            <Meta title={`My Wallet - ${configData?.business_name}`} />
            <WalletProtect>
                <Wallet />
            </WalletProtect>
        </div>
    )
}
WalletLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>

export default WalletLayout
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
