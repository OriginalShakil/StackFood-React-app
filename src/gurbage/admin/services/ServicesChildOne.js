import React from 'react'
// import { Helmet } from 'react-helmet'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

const ServicesChildOne = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Service List')}</title>
            {/* </Helmet> */}
            <Box>{t('Service List')}</Box>
        </>
    )
}

ServicesChildOne.propTypes = {}

export default ServicesChildOne
