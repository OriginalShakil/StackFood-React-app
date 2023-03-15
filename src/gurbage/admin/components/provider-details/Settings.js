import React from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const Settings = () => {
    const { t } = useTranslation()
    return <CustomPaperBigCard>{t('Settings')}</CustomPaperBigCard>
}

export default Settings
