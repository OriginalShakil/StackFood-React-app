import { useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
    ButtonTextWrapper,
    CustomButtonSidebar,
    CustomCollapseForDashboardSidebarItem,
    CustomIconButtonSidebar,
    CustomListItemSidebar,
} from './DashboardSidebar.style'
import { CustomLink } from '../../../../../styled-components/CustomStyles.style'

export const DashboardSidebarItem = (props) => {
    const {
        active,
        children,
        chip,
        depth,
        icon,
        info,
        open: openProp,
        path,
        title,
        openSidedrawer,

        ...other
    } = props
    const [open, setOpen] = useState(openProp)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    let paddingLeft = 18

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth
    }

    // Branch
    if (children) {
        return (
            <>
                {openSidedrawer ? (
                    <CustomListItemSidebar disableGutters {...other}>
                        <Tooltip title={title}>
                            <CustomButtonSidebar
                                fullWidth
                                endIcon={
                                    !open ? (
                                        <ChevronRightIcon fontSize="small" />
                                    ) : (
                                        <KeyboardArrowDownIcon fontSize="small" />
                                    )
                                }
                                disableRipple
                                onClick={handleToggle}
                                startIcon={icon}
                                active={active}
                            >
                                <ButtonTextWrapper>{title}</ButtonTextWrapper>
                                {info}
                            </CustomButtonSidebar>
                        </Tooltip>
                        <CustomCollapseForDashboardSidebarItem in={open}>
                            {children}
                        </CustomCollapseForDashboardSidebarItem>
                    </CustomListItemSidebar>
                ) : (
                    <CustomListItemSidebar paddingX disableGutters {...other}>
                        <CustomIconButtonSidebar active={active}>
                            {icon}
                        </CustomIconButtonSidebar>
                    </CustomListItemSidebar>
                )}
            </>
        )
    }

    // Leaf
    return (
        <>
            {openSidedrawer ? (
                <CustomListItemSidebar flex disableGutters>
                    <CustomLink to={path} width>
                        <Tooltip title={title}>
                            <CustomButtonSidebar
                                fullWidth
                                startIcon={icon}
                                endIcon={chip}
                                disableRipple
                                active={active}
                                paddingLeft
                                noBackGroundColor
                            >
                                <ButtonTextWrapper>{title}</ButtonTextWrapper>
                                {info}
                            </CustomButtonSidebar>
                        </Tooltip>
                    </CustomLink>
                </CustomListItemSidebar>
            ) : (
                <CustomLink to={path} width>
                    <Tooltip title={title}>
                        <CustomIconButtonSidebar active={active}>
                            {icon}
                        </CustomIconButtonSidebar>
                    </Tooltip>
                </CustomLink>
            )}
        </>
    )
}

DashboardSidebarItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
}

DashboardSidebarItem.defaultProps = {
    active: false,
    open: false,
}
