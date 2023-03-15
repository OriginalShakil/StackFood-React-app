import * as React from 'react'
import { useMemo } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'react-i18next'
import { getSections } from '../../layouts/dashboard/components/navbar/dashboard-sidebar-content/SectionsData'
import { useLocation } from 'react-router'
import DashboardSidebarContent from '../../layouts/dashboard/components/navbar/dashboard-sidebar-content/DashboardSidebarContent'
import {
    CustomAppbarForIconicSidebar,
    CustomIconButtonForIconicSidebar,
    CustomWrapperForIconicSidebar,
} from './IconicSidebar.style'

const drawerWidth = 280

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
})

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export const IconicDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

const IconicSidebar = (props) => {
    const { children } = props
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const sections = useMemo(() => getSections(t), [t])
    const admindetails = {
        email: 'Admin@admin.com',
        type: 'admin',
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <CustomWrapperForIconicSidebar>
            <CssBaseline />
            <CustomAppbarForIconicSidebar position="fixed" open={open}>
                <Toolbar>
                    <CustomIconButtonForIconicSidebar
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        open={open}
                    >
                        <MenuIcon />
                    </CustomIconButtonForIconicSidebar>
                </Toolbar>
            </CustomAppbarForIconicSidebar>

            <IconicDrawer variant="permanent" open={open}>
                <DashboardSidebarContent onClick={handleDrawerOpen} />
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </IconicDrawer>
        </CustomWrapperForIconicSidebar>
    )
}

export default IconicSidebar
