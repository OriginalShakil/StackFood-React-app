import React from 'react'
import { useTranslation } from 'react-i18next'

const ServiceZones = (props) => {
    const { t } = useTranslation()
    return <p>{t('Service Zones')}</p>
}

ServiceZones.propTypes = {}

export default ServiceZones
