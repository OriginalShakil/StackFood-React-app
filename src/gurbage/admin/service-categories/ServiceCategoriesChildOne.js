import React from 'react'
import Box from '@mui/material/Box'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const ServiceCategoriesChildOne = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Category Setup')}</title>
            {/* </Helmet> */}
            <Box>{t('Category Setup')}</Box>
        </>
    )
}

ServiceCategoriesChildOne.propTypes = {}

export default ServiceCategoriesChildOne
