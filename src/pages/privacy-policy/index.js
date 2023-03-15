import React from 'react'
import Privacy from '../../components/privacy-policy/Privacy'
import { useSelector } from 'react-redux'
import img from '../../../public/static/Privacy/RectangleP.png'
import Meta from '../../components/Meta'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import Privacypolicy from '../../components/privacy-policy/Privacypolicy'
import { CustomHeader } from '../../api/Headers'

const index = ({ configData }) => {
    return (
        <div className="div">
            <Meta title={`Privacy Policy - ${configData?.business_name}`} />
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{ mb: { xs: '72px', md: '0' } }}
                paddingTop="1rem"
            >
                <Privacypolicy configData={configData} />
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
