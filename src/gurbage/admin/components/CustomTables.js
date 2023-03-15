import React from 'react'
import Tables from '../../../components/custom-tables/Tables'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { CustomBoxFullWidth } from '../../../styled-components/CustomStyles.style'

const CustomTables = (props) => {
    const { t } = useTranslation()
    return (
        <CustomBoxFullWidth>
            {/* <Helmet> */}
                <title>{t('Tables')}</title>
            {/* </Helmet> */}
            <Tables />
        </CustomBoxFullWidth>
    )
}

CustomTables.propTypes = {}

export default CustomTables
