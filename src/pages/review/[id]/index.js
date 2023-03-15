import React from 'react'
//import WithAuth from '../../components/authentication/auth-guard'

import Meta from '../../../components/Meta'
import ReviewPage from '../../../components/review-page/ReviewPage'
import { useRouter } from 'next/router'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { Container, Stack } from '@mui/material'
import { CustomPaperBigCard } from '../../../styled-components/CustomStyles.style'
import ReviewLists from '../../../components/review-page/ReviewLists'
import { CustomHeader } from '../../../api/Headers'
const index = ({ configData }) => {
    const router = useRouter()
    const { id } = router.query
    return (
        <div className="div">
            <Meta title={`Reviews - ${configData?.business_name}`} />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <Stack mt={{ xs: '80px', md: '150px' }} minHeight="500px">
                    <CustomPaperBigCard>
                        <ReviewLists id={id} />
                    </CustomPaperBigCard>
                </Stack>
            </Container>
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
