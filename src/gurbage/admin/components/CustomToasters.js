import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { CustomBoxFullWidth } from '../../../styled-components/CustomStyles.style'

const CustomToasters = (props) => {
    const { t } = useTranslation()
    const success = () => {
        toast.success('Successfully toasted!')
    }
    const error = () => {
        toast.error("This didn't work.")
    }
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Toasters')}</title>
            {/* </Helmet> */}
            <CustomBoxFullWidth>
                {success()}
                {error()}
                <Toaster />
            </CustomBoxFullWidth>
        </>
    )
}

CustomToasters.propTypes = {}

export default CustomToasters
