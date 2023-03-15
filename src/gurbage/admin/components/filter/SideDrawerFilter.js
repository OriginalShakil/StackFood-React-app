import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import { useTranslation } from 'react-i18next'
import {
    CustomAppbarFilter,
    CustomTypographyForSideDrawerFilter,
    WrapperForSideDrawerFilter,
} from './SideDrawerFilter.style'
import Typography from '@mui/material/Typography'
import CustomDateRangePicker from '../../../../components/custom-date-range-picker/CustomDateRangePicker'
import CustomMultiSelectTags from '../../../../components/custom-multi-select-tags/CustomMultiSelectTags'
import {
    CustomButtonGray,
    CustomButtonPrimary,
} from '../../../../styled-components/CustomButtons.style'

const SideDrawerFilter = () => {
    const { t } = useTranslation()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const handleStartDateChange = (date) => {
        setStartDate(date)
    }
    return (
        <Box>
            <CustomAppbarFilter>
                <Toolbar>
                    <CustomTypographyForSideDrawerFilter>
                        {t('Filter your order')}
                    </CustomTypographyForSideDrawerFilter>
                </Toolbar>
            </CustomAppbarFilter>
            <WrapperForSideDrawerFilter>
                <Stack spacing={4}>
                    <Typography variant="h4">
                        {t('Select Date Range')}
                    </Typography>
                    <CustomDateRangePicker />
                    <Typography variant="h4">
                        {t('Select Categories')}
                    </Typography>
                    <CustomMultiSelectTags label={t('fullWidth')} />
                    <Typography variant="h4">
                        {t('Select  Sub Categories')}
                    </Typography>
                    <CustomMultiSelectTags label={t('fullWidth')} />
                    <Typography variant="h4">{t('Select  Zones')}</Typography>
                    <CustomMultiSelectTags label={t('fullWidth')} />
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    mt="4rem"
                >
                    <CustomButtonGray>{t('Clear all Filter')}</CustomButtonGray>
                    <CustomButtonPrimary>{t('Filter')}</CustomButtonPrimary>
                </Stack>
            </WrapperForSideDrawerFilter>
        </Box>
    )
}

export default SideDrawerFilter
