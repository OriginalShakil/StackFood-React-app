import React from 'react'
import { Box } from '@mui/material'
import Meta from '../../components/Meta'
import Chat from '../../components/chat/Chat'
import { Container } from '@material-ui/core'
import AuthGuard from '../../components/authentication/AuthGuard'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'

const ChatLayout = ({ configData }) => {
    return (
        <Box minHeight="70vh">
            <Meta title={`Chatting - ${configData?.business_name}`} />
            <Container maxWidth="lg">
                <Chat />
            </Container>
        </Box>
    )
}
ChatLayout.getLayout = (page) => <AuthGuard>{page}</AuthGuard>
export default ChatLayout
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
