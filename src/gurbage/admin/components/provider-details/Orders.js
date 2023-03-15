import React from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const Orders = () => {
    const { t } = useTranslation()
    return <CustomPaperBigCard>{t('Orders')}</CustomPaperBigCard>
}

export default Orders
