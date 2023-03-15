import React from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { RouteLinksData } from './RouteLinksData'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { toast } from 'react-hot-toast'

const RouteLinks = (props) => {
    const { token, global } = props
    const { t } = useTranslation()
    const handleClick = (href, value) => {
        if (value === 'loyalty_points' || value === 'my_wallet') {
            if (token) {
                Router.push(href)
            } else {
                toast.error(t('You must be login to access this page.'))
            }
        } else if (value === 'campaigns') {
            const zoneId = localStorage.getItem('zoneid')
            if (zoneId) {
                Router.push(href)
            } else {
                toast.error(t('You must pick a zone to access this page.'))
            }
        } else if (value === 'restaurant_owner') {
            window.open(href)
        } else if (value === 'delivery_man') {
            window.open(href)
        } else {
            Router.push(href)
        }
    }
    const languageDirection = localStorage.getItem('direction')
    const handleClickToRoute = (href) => {
        Router.push(href)
    }
    return (
        <CustomStackFullWidth spacing={2}>


            {RouteLinksData.map((item, index) => {
                return (
                    <CustomColouredTypography
                        key={index}
                        variant="h5"
                        color="whiteContainer.main"
                        onClick={() => handleClick(item.link, item.value)}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        {t(item.name)}
                    </CustomColouredTypography>
                )
            })}
            {global?.refund_policy_status !== 0 && (
                <CustomColouredTypography
                    variant="h5"
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/refund-policy')}
                    sx={{
                        cursor: 'pointer',
                        marginLeft: languageDirection === 'rtl' ? '10px' : '',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Refund Policy')}
                </CustomColouredTypography>
            )}
            {global?.cancellation_policy_status !== 0 && (
                <CustomColouredTypography
                    variant="h5"
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/cancellation-policy')}
                    sx={{
                        cursor: 'pointer',
                        marginLeft: languageDirection === 'rtl' ? '10px' : '',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Cancellation Policy')}
                </CustomColouredTypography>
            )}
            {global?.shipping_policy_status !== 0 && (
                <CustomColouredTypography
                    variant="h5"
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute('/shipping-policy')}
                    sx={{
                        cursor: 'pointer',
                        marginLeft: languageDirection === 'rtl' ? '10px' : '',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Shipping Policy')}
                </CustomColouredTypography>
            )}
        </CustomStackFullWidth>
    )
}

RouteLinks.propTypes = {}

export default RouteLinks
