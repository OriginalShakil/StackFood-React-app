import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { CustomDrawerForSidebar, SidebarContentWrapper } from './Sidebar.style'
import { IconicDrawer } from './IconicSidebar'
import DashboardSidebarContent from '../../layouts/dashboard/components/navbar/dashboard-sidebar-content/DashboardSidebarContent'
import { useDispatch } from 'react-redux'
import { setIconicSidebar } from '../../redux/slices/layout'
import { useLocation } from 'react-router-dom'

const Sidebar = (props) => {
    const location = useLocation()
    const { content, open, onClose } = props
    const [openIconicDrawer, setOpenIconicDrawer] = useState(true)
    const [hoverOn, setHoverOn] = useState(false)
    const dispatch = useDispatch()
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    })
    useEffect(() => {
        if (!lgUp) {
            onClose?.()
        }

    }, [location.pathname])

    if (openIconicDrawer) {
        dispatch(setIconicSidebar(false))
    } else {
        dispatch(setIconicSidebar(true))
    }

    const handleIconicDrawerAlwaysOpen = () => {
        setOpenIconicDrawer(true)
        setHoverOn(false)
    }

    const handleIconicDrawerOpen = () => {
        setOpenIconicDrawer(true)
        localStorage.setItem('iconicDrawer', true)
    }

    const handleIconicDrawerClose = () => {
        setOpenIconicDrawer(false)
        setHoverOn(true)
    }
    if (lgUp) {
        return (
            <IconicDrawer open={openIconicDrawer} variant="permanent">
                <DashboardSidebarContent
                    open={openIconicDrawer}
                    onOpen={handleIconicDrawerOpen}
                    onClose={handleIconicDrawerClose}
                    alwaysOpen={handleIconicDrawerAlwaysOpen}
                    hover={hoverOn}
                />
            </IconicDrawer>
        )
    }
    return (
        <CustomDrawerForSidebar
            anchor="left"
            onClose={onClose}
            open={open}
            variant="temporary"
        >
            <SidebarContentWrapper>{content}</SidebarContentWrapper>
        </CustomDrawerForSidebar>
    )
}

Sidebar.propTypes = {}

export default Sidebar
