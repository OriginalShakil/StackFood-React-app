import React from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const SubscribedServices = () => {
    const { t } = useTranslation()
    return <CustomPaperBigCard>{t('Subscribed Services')}</CustomPaperBigCard>
}

export default SubscribedServices
