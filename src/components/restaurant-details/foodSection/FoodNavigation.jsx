import React, { useState } from 'react'
import { Button, ButtonGroup, Grid, useMediaQuery, Tabs } from '@mui/material'
import {
    CustomStack,
    CustomBoxTab,
    CustomTabs,
} from '../../../styled-components/CustomStyles.style'
// import SortIcon from '@mui/icons-material/Sort'
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
// import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageLimitDropdown from '../../pagination/PageLimitDropdown'
import { useTranslation } from 'react-i18next'
import { RestaurantDetailsNavButton } from '../../food-card/FoodCard.style'
import { Box } from '@mui/system'
import {RTL} from "../../RTL/RTL";

const FoodNavigation = ({
    catetoryMenus,
    setCategoryId,
    category_id,
    page_limit,
    setPageLimit,
    id,
    usein,
}) => {
    const { t } = useTranslation()
    const matches = useMediaQuery('(min-width:600px)')

    const [gridItem, setGridItem] = useState(10)

    const handleCategoryId = (catId) => {
        setCategoryId(catId)

    }

    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    return (
        <>
            <RTL direction={languageDirection}>
            <CustomTabs
                orientation="horizontal"
                // variant="contained"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Box>
                    <RestaurantDetailsNavButton
                        sx={{
                            color:
                                category_id === 0 || category_id === id
                                    ? 'whiteContainer.main'
                                    : 'whiteContainer',
                            backgroundColor: (theme) =>
                                category_id ===
                                (usein === 'restaurant' ? 0 : id)
                                    ? theme.palette.primary.main
                                    : 'inherit',
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    category_id ===
                                    (usein === 'restaurant' ? 0 : id)
                                        ? theme.palette.primary.main
                                        : 'inherit',
                            },
                        }}
                        onClick={() => handleCategoryId(id)}
                    >
                        {t('All')}
                    </RestaurantDetailsNavButton>

                    {catetoryMenus?.length > 0 &&
                        catetoryMenus?.map((menu) => {
                            return (
                                <RestaurantDetailsNavButton
                                    sx={{
                                        color: (theme) =>
                                            category_id === menu.id &&
                                            'whiteContainer.main',
                                        backgroundColor: (theme) =>
                                            category_id === menu.id
                                                ? theme.palette.primary.main
                                                : 'inherit',
                                        '&:hover': {
                                            backgroundColor: (theme) =>
                                                category_id === menu.id
                                                    ? theme.palette.primary.main
                                                    : 'inherit',
                                        },
                                    }}
                                    key={menu.id}
                                    onClick={() => handleCategoryId(menu.id)}
                                >
                                    {menu.name}
                                </RestaurantDetailsNavButton>
                            )
                        })}
                </Box>
            </CustomTabs>
            </RTL>
        </>
    )
}

export default FoodNavigation
