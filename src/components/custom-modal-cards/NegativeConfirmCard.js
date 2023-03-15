import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaper,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Grid, Paper } from '@mui/material'
import { ImageSource } from '../../utils/ImageSource'
import close from '../../assets/images/icons/close.png'
import Image from 'next/image'
import { Box } from '@mui/system'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    p: 4,
}
const NegativeConfirmCard = (props) => {
    return (
        <Box sx={style}>
            <CustomStackFullWidth></CustomStackFullWidth>
        </Box>
    )
}

NegativeConfirmCard.propTypes = {}

export default NegativeConfirmCard
