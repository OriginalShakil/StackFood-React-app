import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import { CustomFab } from '../../styled-components/CustomStyles.style'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import {useTheme} from "@mui/material/styles";

const IncrementDecrementManager = (props) => {
    const theme=useTheme()
    const { decrementPrice, totalPrice, quantity, incrementPrice } = props
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
        >
            <CustomFab
                onClick={decrementPrice}
                color="primary"
                aria-label="remove"
                disabled={totalPrice === 0 || quantity <= 1}
            >
                <RemoveIcon size="small" sx={{color:theme=>theme.palette.neutral[1000]}}/>
            </CustomFab>
            <Typography variant="h5">{quantity}</Typography>
            <CustomFab
                color="primary"
                aria-label="add"
                onClick={incrementPrice}
            >
                <AddIcon size="small" sx={{color:theme=>theme.palette.neutral[1000]}}/>
            </CustomFab>
        </Stack>
    )
}

IncrementDecrementManager.propTypes = {}

export default IncrementDecrementManager
