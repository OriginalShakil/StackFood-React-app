import React, { useRef, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail'
import { Tooltip } from '@mui/material'
import MailsPopover from '../MailsPopover'
import { CustomBadge } from '../../../../../styled-components/CustomStyles.style'
import { CustomIconButtonForNotificationWithBadge } from '../Navbar.style'
import { useTranslation } from 'react-i18next'

const CustomMailIconWithBadge = () => {
    const { t } = useTranslation()
    const anchorRef = useRef(null)

    const [openPopover, setOpenPopover] = useState(false)
    const handleOpenPopover = () => {
        setOpenPopover(true)
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }
    return (
        <>
            <Tooltip title={t('Mails')}>
                <CustomIconButtonForNotificationWithBadge
                    ref={anchorRef}
                    size="large"
                    color="inherit"
                    onClick={handleOpenPopover}
                >
                    <CustomBadge badgeContent={15} color="error">
                        <MailIcon fontSize="large" />
                    </CustomBadge>
                </CustomIconButtonForNotificationWithBadge>
            </Tooltip>
            <MailsPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    )
}

export default CustomMailIconWithBadge
