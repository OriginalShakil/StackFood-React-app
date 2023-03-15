import React from 'react'
// import { Helmet } from 'react-helmet'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

const ServiceCategoriesChildTwo = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Sub Category Setup')}</title>
            {/* </Helmet> */}
            <Box>{t('Sub Category Setup')}</Box>
        </>
    )
}

ServiceCategoriesChildTwo.propTypes = {}

export default ServiceCategoriesChildTwo
