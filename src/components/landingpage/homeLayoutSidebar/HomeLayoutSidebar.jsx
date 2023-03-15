import React from 'react'
import PropTypes from 'prop-types'
import { Box, Drawer } from '@mui/material'
import { Scrollbar } from '../../Scrollbar'

const HomeLayoutSidebar = (props) => {
    return (
        <Drawer
            anchor="left"
            //onClose={onClose}
            open
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.primary.light,
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            sidebar
        </Drawer>
    )
}

HomeLayoutSidebar.propTypes = {}

export default HomeLayoutSidebar
