import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import {
    CustomAppbarFilter,
    CustomTypographyForSideDrawerFilter,
    WrapperForSideDrawerFilter,
} from '../../gurbage/admin/components/filter/SideDrawerFilter.style'
import Toolbar from '@mui/material/Toolbar'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import CustomDateRangePicker from '../custom-date-range-picker/CustomDateRangePicker'
import CustomMultiSelectTags from '../custom-multi-select-tags/CustomMultiSelectTags'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../styled-components/CustomButtons.style'
//import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useTranslation } from 'react-i18next'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import CustomSlider from '../custom-slider/CustomSlider'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomGroupCheckbox from '../custom-group-checkboxs/CustomGroupCheckbox'
import { useDispatch, useSelector } from 'react-redux'
import {
    setFilterbyByCuisineDispatch,
    setFilterbyByDispatch,
    setFilterDrawerOpenByDispatch,
    setPriceByDispatch,
    setRatingByDispatch,
    setSortbyByDispatch,
} from '../../redux/slices/searchFilter'
import { setIconicSidebar } from '../../redux/slices/layout'
import ButtonGroups from './ButtonGroups'
import {useGetCuisines} from "../../hooks/react-query/cuisines/useGetCuisines";
import SimpleBar from "simplebar-react";

const FilterCard = ({ setSideDrawerOpen, handleFilter, handleClearAll ,foodOrRestaurant,sideDrawerOpen}) => {
    const { t } = useTranslation()
    const { filterData } = useSelector((state) => state.searchFilterStore)

    const [stateData, setStateData] = useState({
        ...filterData,
    })
    const dispatch = useDispatch()
    const handleSortBy = (value) => {
        setStateData({
            ...stateData,
            sortBy: value,
        })
    }
    const handleFilterBy = (event) => {
        setStateData({
            ...stateData,
            filterBy: {
                ...stateData.filterBy,
                [event.target.name]: event.target.checked,
            },
        })
    }
    const handleFilterByCuisine = (event) => {
        if(event.target.checked){
            setStateData({
                ...stateData,
                filterByCuisine: [
                    ...stateData.filterByCuisine,
                    event.target.value,
                ],
            })
        }else{
            let filter = stateData?.filterByCuisine.filter((item) => item !== event.target.value)
            setStateData(
                {
                    ...stateData,
                    filterByCuisine:filter
                }
                )
        }
    }
    const handlePrice = (value) => {
        setStateData({
            ...stateData,
            price: value,
        })
    }
    const handleChangeRatings = (value) => {
        setStateData({
            ...stateData,
            rating: value,
        })
    }
    const checkboxData = ['Veg', 'Non Veg', 'Currently Available Foods']

    const handleFilterSubmit = () => {
        dispatch(setPriceByDispatch(stateData.price))
        dispatch(setRatingByDispatch(stateData.rating))
        dispatch(setFilterbyByDispatch(stateData.filterBy))
        dispatch(setFilterbyByCuisineDispatch(stateData?.filterByCuisine))
        dispatch(setSortbyByDispatch(stateData.sortBy))

        handleFilter()
        setSideDrawerOpen(false)
        dispatch(setFilterDrawerOpenByDispatch(false))
    }
    const handleFilterClear = () => {
        dispatch(setPriceByDispatch(''))
        dispatch(setRatingByDispatch(''))
        dispatch(setSortbyByDispatch(''))
        dispatch(
            setFilterbyByDispatch({
                veg: false,
                nonVeg: false,
                currentAvailableFoods: false,
                discountedFoods: false,
            })
        )
        dispatch(setFilterbyByCuisineDispatch( []))
        dispatch(setFilterDrawerOpenByDispatch(false))
        setSideDrawerOpen(false)
        handleClearAll()
    }
    const {data,isLoading,refetch,isRefetching}=useGetCuisines()
    useEffect(()=>{
        refetch()
        dispatch(setFilterbyByCuisineDispatch( []))
    },[])
    useEffect(()=>{
        dispatch(setFilterbyByCuisineDispatch( []))
    },[sideDrawerOpen])
    
    return (
        <Box>
            <CustomAppbarFilter>
                <Toolbar>
                    <CustomColouredTypography variant="h3" color="primary">
                        {t('Filter your search results')}
                    </CustomColouredTypography>
                </Toolbar>
            </CustomAppbarFilter>
            <WrapperForSideDrawerFilter>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Sort By')}</Typography>
                        <ButtonGroups handleSortBy={handleSortBy} />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Filter By')}</Typography>
                        <CustomGroupCheckbox
                            handleChangeFilter={handleFilterBy}
                            checkboxState={filterData.filterBy}
                            checkboxData={checkboxData}
                        />
                    </Stack>
                    {foodOrRestaurant==="restaurants" && <Stack spacing={1}>
                        <Typography variant="h4">{t('Cuisines')}</Typography>
                        <SimpleBar style={{ maxHeight: 200,}} >
                            <CustomGroupCheckbox isLoading={isLoading} checkboxData={data?.Cuisines} forcuisine="true"handleChangeFilter={handleFilterByCuisine}   />
                        </SimpleBar>

                    </Stack> }
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Price')}</Typography>
                        <CustomSlider
                            handleChangePrice={handlePrice}
                            priceValue={filterData.price}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="h4">{t('Rating')}</Typography>
                        <CustomRatings
                            handleChangeRatings={handleChangeRatings}
                            ratingValue={filterData.rating}
                        />
                    </Stack>
                </Stack>
                <Stack
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    mt="1rem"
                >
                    <CustomButtonGray onClick={handleFilterClear}>
                        {t('Clear all Filter')}
                    </CustomButtonGray>
                    <CustomButtonPrimary fullWidth onClick={handleFilterSubmit}>
                        {t('Filter')}
                    </CustomButtonPrimary>
                </Stack>
            </WrapperForSideDrawerFilter>
        </Box>
    )
}

FilterCard.propTypes = {}

export default FilterCard
