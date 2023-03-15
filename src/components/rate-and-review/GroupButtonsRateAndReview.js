import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Tabs } from '@mui/material'
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { useTranslation } from 'react-i18next'

const GroupButtonsRateAndReview = ({ setType, type }) => {
    const { t } = useTranslation()
    return (
        <Tabs
            orientation="horizontal"
            // variant="contained"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <ButtonGroup>
                <RestaurantDetailsNavButton
                    background={type === 'items'}
                    onClick={() => setType('items')}
                    sx={{ width: { xs: '80px', md: '100px' } }}
                >
                    {t('Items')}
                </RestaurantDetailsNavButton>
                <RestaurantDetailsNavButton
                    // color={
                    //     type === 'veg' ? 'primary' : 'whiteContainer'
                    // }
                    background={type === 'delivery_man'}
                    onClick={() => setType('delivery_man')}
                    sx={{ width: { xs: '80px', md: '100px' } }}
                >
                    {t('Delivery man')}
                </RestaurantDetailsNavButton>
            </ButtonGroup>
        </Tabs>
    )
}

GroupButtonsRateAndReview.propTypes = {}

export default GroupButtonsRateAndReview
