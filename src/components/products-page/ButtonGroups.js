import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Stack } from '@mui/material'
import { PrimaryButton } from './FoodOrRestaurant'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import { useSelector } from 'react-redux'

const ButtonGroups = ({ handleSortBy }) => {
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [selected, setSelected] = useState(filterData.sortBy)
    const { t } = useTranslation()
    const theme = useTheme()
    const orangeColor = theme.palette.primary.main
    const handleAsc = () => {
        setSelected('asc')
        handleSortBy('asc')
    }
    const handleDsc = () => {
        setSelected('dsc')
        handleSortBy('dsc')
    }
    return (
        <Stack
            alignItems="center"
            justifyContent="flex-start"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={2}
        >
            <PrimaryButton
                onClick={() => handleAsc()}
                backgroundColor={
                    selected === 'asc'
                        ? orangeColor
                        : theme.palette.neutral[200]
                }
            >
                <Stack direction="row" spacing={1}>
                    <CustomColouredTypography
                        color={selected === 'asc' && theme.palette.neutral[100]}
                    >
                        {t('Ascending')}
                    </CustomColouredTypography>
                    <CustomColouredTypography
                        color={selected === 'asc' && theme.palette.neutral[100]}
                    >
                        {t('(A-Z)')}
                    </CustomColouredTypography>
                </Stack>
            </PrimaryButton>
            <PrimaryButton
                onClick={() => handleDsc()}
                backgroundColor={
                    selected === 'dsc'
                        ? orangeColor
                        : theme.palette.neutral[200]
                }
            >
                <Stack direction="row" spacing={1}>
                    <CustomColouredTypography
                        color={selected === 'dsc' && theme.palette.neutral[100]}
                    >
                        {t('Descending')}
                    </CustomColouredTypography>
                    <CustomColouredTypography
                        color={selected === 'dsc' && theme.palette.neutral[100]}
                    >
                        {t('(Z-A)')}
                    </CustomColouredTypography>
                </Stack>
            </PrimaryButton>
        </Stack>
    )
}

ButtonGroups.propTypes = {}

export default ButtonGroups
