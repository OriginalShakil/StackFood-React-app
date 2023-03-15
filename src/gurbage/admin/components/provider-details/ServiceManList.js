import React from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const ServiceManList = () => {
    const { t } = useTranslation()
    return <CustomPaperBigCard>{t('Service Man List')}</CustomPaperBigCard>
}

export default ServiceManList
