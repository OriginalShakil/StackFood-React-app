import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Rating } from '@mui/material'
import { Stack } from '@mui/material'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import {useTheme} from "@mui/material/styles";

const CustomRatings = ({ handleChangeRatings, ratingValue, readOnly }) => {

    const [value, setValue] = useState(ratingValue ? ratingValue : 0)
    const handleChange = (event, newValue) => {
        if (!readOnly) {
            setValue(newValue)
            handleChangeRatings(newValue)
        }
    }
    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <Rating
                readOnly={readOnly}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
                sx={{color:theme=>theme.palette.primary.main}}
            />
            {readOnly && (
                <CustomColouredTypography>
                    ({ratingValue})
                </CustomColouredTypography>
            )}
        </Stack>
    )
}

CustomRatings.propTypes = {}

export default CustomRatings
