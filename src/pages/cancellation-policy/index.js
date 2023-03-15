import Meta from '../../components/Meta'
import img from '../../../public/static/Privacy/RectangleP.png'

import React from 'react'
import CancellationPolicy from '../../components/cancellation-policy/CancellationPolicy'
import ProtectCancellation from './ProtectCancellation'
import { Container, CssBaseline } from '@mui/material'
import CancellationPolicyPage from '../../components/cancellation-policy/CancellationPolicyPage'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'
const index = ({ configData }) => {
    return (
        <>
            <CssBaseline />
            <Meta
                title={`Cancellation policy - ${configData?.business_name}`}
            />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <ProtectCancellation>
                    <CancellationPolicyPage configData={configData} />
                </ProtectCancellation>
            </Container>
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
