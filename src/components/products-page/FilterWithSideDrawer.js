import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { PrimaryButton } from './FoodOrRestaurant'
import { useTranslation } from 'react-i18next'
import { Stack } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { CustomTypography } from '../custom-tables/Tables.style'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import SideDrawerFilter from '../../gurbage/admin/components/filter/SideDrawerFilter'
import FilterCard from './FilterCard'
import { useDispatch } from 'react-redux'
import { setFilterDrawerOpenByDispatch } from '../../redux/slices/searchFilter'
const FilterWithSideDrawer = ({ handleFilter, handleClearAll,foodOrRestaurant }) => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleDrawerOpen = () => {
        setSideDrawerOpen(true)
        dispatch(setFilterDrawerOpenByDispatch(true))
    }
    const handleDrawerClose = () => {
        setSideDrawerOpen(false)
        dispatch(setFilterDrawerOpenByDispatch(false))
    }
    return (
        <>
            <PrimaryButton
                variant="outlined"
                onClick={() => handleDrawerOpen()}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <FilterListIcon color="primary" />
                    <CustomTypography variant="h4">
                        {t('Filter')}
                    </CustomTypography>
                </Stack>
            </PrimaryButton>
            <CustomSideDrawer
                open={sideDrawerOpen}
                onClose={() => handleDrawerClose()}
                anchor="right"
            >
                <FilterCard
                    setSideDrawerOpen={setSideDrawerOpen}
                    handleFilter={handleFilter}
                    handleClearAll={handleClearAll}
                    foodOrRestaurant={foodOrRestaurant}
                    sideDrawerOpen={sideDrawerOpen}
                />
            </CustomSideDrawer>
        </>
    )
}

FilterWithSideDrawer.propTypes = {}

export default FilterWithSideDrawer
