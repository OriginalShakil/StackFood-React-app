import React from 'react'
import { TextField } from '@mui/material'
import { Autocomplete } from '@mui/lab'
import { top100Films } from './demoData'

const CustomMultiSelectTags = () => {
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => (
                <TextField {...params} label="limitTags" />
            )}
        />
    )
}

export default CustomMultiSelectTags
