import React from 'react'
import ProductSearch from '../../components/products-page/ProductSearch'
import { Box } from '@mui/system'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { CustomHeader } from '../../api/Headers'

const index = ({ configData }) => {
    return (
        <>
            <Box>
                <ProductSearch type="most-reviewed" configData={configData} />
            </Box>
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
