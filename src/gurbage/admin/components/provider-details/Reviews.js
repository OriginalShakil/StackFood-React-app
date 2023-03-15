import React from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const Reviews = () => {
    const { t } = useTranslation()
    return <CustomPaperBigCard>{t('Reviews')}</CustomPaperBigCard>
}

export default Reviews
