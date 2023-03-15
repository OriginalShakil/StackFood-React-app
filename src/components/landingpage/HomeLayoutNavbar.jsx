import React from 'react'
import PropTypes from 'prop-types'
import { HomeLayoutNavbarStyle } from './HomeLayoutNavbar.style'
import { Toolbar, Typography } from '@mui/material'

const HomeLayoutNavbar = (props) => {
    return (
        <>
            <HomeLayoutNavbarStyle
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: 'calc(100% - 280px)',
                    },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        right: 0,
                        px: 2,
                    }}
                >
                    <Typography>Navbar</Typography>
                </Toolbar>
            </HomeLayoutNavbarStyle>
        </>
    )
}

HomeLayoutNavbar.propTypes = {}

export default HomeLayoutNavbar
