import React, { useRef, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Tooltip } from '@mui/material'
import { NotificationsPopover } from '../NotificationsPopover'
import { CustomIconButtonForNotificationWithBadge } from '../Navbar.style'
import { CustomBadge } from '../../../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'

const CustomNotificationIconWithBadge = (props) => {
    const anchorRef = useRef(null)
    const { t } = useTranslation()
    const [unread, setUnread] = useState(0)
    const [openPopover, setOpenPopover] = useState(false)
    const handleOpenPopover = () => {
        setOpenPopover(true)
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }

    const handleUpdateUnread = (value) => {
        setUnread(value)
    }

    return (
        <>
            <Tooltip title={t('Notifications')}>
                <CustomIconButtonForNotificationWithBadge
                    ref={anchorRef}
                    size="large"
                    onClick={handleOpenPopover}
                >
                    <CustomBadge badgeContent={15} color="error">
                        <NotificationsIcon fontSize="large" />
                    </CustomBadge>
                </CustomIconButtonForNotificationWithBadge>
            </Tooltip>
            <NotificationsPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                onUpdateUnread={handleUpdateUnread}
                open={openPopover}
            />
        </>
    )
}

CustomNotificationIconWithBadge.propTypes = {}

export default CustomNotificationIconWithBadge
