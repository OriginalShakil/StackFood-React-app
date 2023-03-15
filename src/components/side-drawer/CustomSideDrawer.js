import React from 'react'
import PropTypes from 'prop-types'
import { SideDrawerWrapper } from './CustomSideDrawer.style'
import { CustomDrawerForSidebar } from '../sidebar/Sidebar.style'

const CustomSideDrawer = (props) => {
    const { open, onClose, children,anchor } = props

    return (
        <CustomDrawerForSidebar
            anchor={anchor}
            onClose={onClose}
            open={open}
            variant="temporary"
        >
            <SideDrawerWrapper>{children}</SideDrawerWrapper>
        </CustomDrawerForSidebar>
    )
}

CustomSideDrawer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default CustomSideDrawer
