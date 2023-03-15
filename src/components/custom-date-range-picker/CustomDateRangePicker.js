import React, { useState } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/lab'

const CustomDateRangePicker = (props) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const handleStartDateChange = (date) => {
        setStartDate(date)
    }
    const handleEndDateChange = (date) => {
        setEndDate(date)
    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack width="100%" spacing={4}>
                    <DesktopDatePicker
                        label={'Start Date'}
                        value={startDate}
                        minDate={new Date('2017-01-01')}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label={'End Date'}
                        value={endDate}
                        minDate={new Date('2017-01-01')}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    )
}

export default CustomDateRangePicker
