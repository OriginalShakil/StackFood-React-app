import React, { useRef, useState } from 'react'
import avatar from '../../../../assets/images/icons/avatar.png'
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar'
import Box from '@mui/material/Box'
import { ButtonBase, Tooltip } from '@mui/material'
import AccountPopover from './AccountPopover'
import { useTranslation } from 'react-i18next'

const Account = () => {
    const anchorRef = useRef(null)
    const [openPopover, setOpenPopover] = useState(false)
    const { t } = useTranslation()
    const handleOpenPopover = () => {
        setOpenPopover(true)
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }

    return (
        <>
            <Tooltip title={t('My Account')}>
                <Box
                    component={ButtonBase}
                    onClick={handleOpenPopover}
                    ref={anchorRef}
                >
                    <CustomAvatar avatarImage={avatar} />
                </Box>
            </Tooltip>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    )
}

export default Account
