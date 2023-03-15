import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Stack } from '@mui/material'
import CustomSearch from '../../components/custom-search/CustomSearch'
import CustomNotificationIconWithBadge from './components/navbar/custom-notification-with-badge/CustomNotificationIconWithBadge'
import CustomMailIconWithBadge from './components/navbar/custom-mailicon-with-badge/CustomMailIconWithBadge'
import {
    CustomLink,
    FlexContainerSpaceBetween,
} from '../../styled-components/CustomStyles.style'
import MenuIcon from '@mui/icons-material/Menu'
import Account from './components/navbar/Account'
import PersonIcon from '@mui/icons-material/Person'
import {
    CustomIconButtonForNavbar,
    CustomStackForNavbar,
} from './Dashboard.style'
import DashboardMobileNavbar from './DashboardMobileNavbar'
import Fade from '@mui/material/Fade'
import DashboardNavbarLogo from './DashboardNavbarLogo'
import SearchIcon from '@mui/icons-material/Search'

const DashboardNavbar = (props) => {
    const { notFound } = props
    const [openMobileNavbarItems, setOpenMobileNavbarItems] = useState(false)
    const [openMobileNavbarSearch, setOpenMobileNavbarSearch] = useState(false)
    const [visibilityFor, setVisibilityFor] = useState('')
    const { onOpenSidebar } = props
    const handleOpenNavItems = () => {
        setOpenMobileNavbarItems((prevState) => !prevState)
        setVisibilityFor('nav_items')
        setOpenMobileNavbarSearch(false)
    }
    const handleMobileSearch = () => {
        setOpenMobileNavbarSearch((prevState) => !prevState)
        setVisibilityFor('mobile_search')
        setOpenMobileNavbarItems(false)
    }

    const showMobileNavbar = () => {
        if (visibilityFor === 'nav_items') {
            return (
                <Fade
                    in={openMobileNavbarItems}
                    timeout={{ enter: 500, exit: 500 }}
                >
                    <div>
                        <DashboardMobileNavbar visibilityFor={visibilityFor} />
                    </div>
                </Fade>
            )
        } else if (visibilityFor === 'mobile_search') {
            return (
                <Fade
                    in={openMobileNavbarSearch}
                    timeout={{ enter: 500, exit: 500 }}
                >
                    <div>
                        <DashboardMobileNavbar visibilityFor={visibilityFor} />
                    </div>
                </Fade>
            )
        }
    }

    return (
        <>
            <Navbar {...props}>
                {notFound ? (
                    <>
                        <DashboardNavbarLogo />
                    </>
                ) : (
                    <>
                        <FlexContainerSpaceBetween>
                            <CustomIconButtonForNavbar onClick={onOpenSidebar}>
                                <MenuIcon fontSize="small" />
                            </CustomIconButtonForNavbar>
                            <CustomStackForNavbar
                                direction="row"
                                spacing={3}
                                paddingX="1.25rem"
                            >
                                <CustomSearch />
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    alignItems="center"
                                >
                                    <CustomMailIconWithBadge />
                                    <CustomNotificationIconWithBadge />
                                </Stack>
                                <Account />
                            </CustomStackForNavbar>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >
                                <CustomIconButtonForNavbar
                                    onClick={handleMobileSearch}
                                >
                                    <SearchIcon fontSize="small" />
                                </CustomIconButtonForNavbar>
                                <CustomIconButtonForNavbar
                                    onClick={handleOpenNavItems}
                                >
                                    <PersonIcon fontSize="small" />
                                </CustomIconButtonForNavbar>
                            </Stack>
                        </FlexContainerSpaceBetween>
                        {showMobileNavbar()}
                    </>
                )}
            </Navbar>
        </>
    )
}

DashboardNavbar.propTypes = {}

export default DashboardNavbar
