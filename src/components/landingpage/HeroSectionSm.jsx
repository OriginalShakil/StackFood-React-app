import { Box } from '@mui/material'
import React from 'react'
import HeroCarousal from './HeroCarousal'
import HeroLocationForm from './HeroLocationForm'
import HeroMobileCard from './HeroMobileCard'

const HeroSectionSm = (props) => {
    return (
        <>
            <Box {...props}>
                <HeroMobileCard />
                <HeroLocationForm handleModalClose={props.handleModalClose} />
            </Box>
        </>
    )
}

export default HeroSectionSm
