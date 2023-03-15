import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@mui/material'

const CustomAlert = (props) => {
    const { type, text } = props
    return (
        <Alert severity={type} sx={{ textTransform: 'none' }}>
            {text}
        </Alert>
    )
}

CustomAlert.propTypes = {}

export default CustomAlert
