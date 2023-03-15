import React from 'react'
import { CustomAppbar } from './Dashboard.style'
import Toolbar from '@mui/material/Toolbar'
import CustomSearch from '../../components/custom-search/CustomSearch'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import CustomMailIconWithBadge from './components/navbar/custom-mailicon-with-badge/CustomMailIconWithBadge'
import CustomNotificationIconWithBadge from './components/navbar/custom-notification-with-badge/CustomNotificationIconWithBadge'
import Account from './components/navbar/Account'

const DashboardMobileNavbar = (props) => {
    const { visibilityFor } = props

    const renderVisibility = () => {
        if (visibilityFor === 'nav_items') {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                    width="100%"
                >
                    <Box>
                        <CustomMailIconWithBadge />
                    </Box>
                    <Box>
                        <CustomNotificationIconWithBadge />
                    </Box>
                    <Account />
                </Stack>
            )
        } else if (visibilityFor === 'mobile_search') {
            return <CustomSearch />
        }
    }
    return (
        <CustomAppbar>
            <Toolbar>{renderVisibility()}</Toolbar>
        </CustomAppbar>
    )
}

export default DashboardMobileNavbar
