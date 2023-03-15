import React from 'react'
import PropTypes from 'prop-types'
import { RestaurantDetailsNavButton } from '../food-card/FoodCard.style'
import { ButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

const FilterButtons = ({ setType, type }) => {
    const { t } = useTranslation()
    return (
        <ButtonGroup>
            <RestaurantDetailsNavButton
                className={type === 'all' ? 'selected-btn' : 'general-btn '}
                onClick={() => setType('all')}
                sx={{ width: { xs: '80px', md: '100px' } }}
            >
                {t('All')}
            </RestaurantDetailsNavButton>
            <RestaurantDetailsNavButton
                // color={
                //     type === 'veg' ? 'primary' : 'whiteContainer'
                // }
                className={type === 'veg' ? 'selected-btn' : 'general-btn '}
                onClick={() => setType('veg')}
                sx={{ width: { xs: '80px', md: '100px' } }}
            >
                {t('Veg')}
            </RestaurantDetailsNavButton>
            <RestaurantDetailsNavButton
                className={type === 'non_veg' ? 'selected-btn' : 'general-btn '}
                onClick={() => setType('non_veg')}
                sx={{ width: { xs: '80px', md: '100px' } }}
            >
                {t('Non-Veg')}
            </RestaurantDetailsNavButton>
        </ButtonGroup>
    )
}

FilterButtons.propTypes = {}

export default FilterButtons
