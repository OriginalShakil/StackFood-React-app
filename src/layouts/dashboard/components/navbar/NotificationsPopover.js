import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
    CustomContentWrapperForNavbarPopover,
    CustomNavbarPopoverHeader,
    CustomWrapperForNavbarPopover,
} from './Navbar.style'
import { useTranslation } from 'react-i18next'
import { CustomTypographyBold } from '../../../../styled-components/CustomStyles.style'

export const NotificationsPopover = (props) => {
    const { anchorEl, onClose, onUpdateUnread, open, ...other } = props
    const { t } = useTranslation()
    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
            }}
            onClose={onClose}
            open={open}
            transitionDuration={0}
            {...other}
        >
            <CustomWrapperForNavbarPopover>
                <CustomNavbarPopoverHeader>
                    <CustomTypographyBold color="inherit" variant="h6">
                        {t('Notifications')}
                    </CustomTypographyBold>
                </CustomNavbarPopoverHeader>
                <CustomContentWrapperForNavbarPopover>
                    <Typography variant="subtitle2">
                        {t('Notifications')}
                    </Typography>
                </CustomContentWrapperForNavbarPopover>
            </CustomWrapperForNavbarPopover>
        </Popover>
    )
}

NotificationsPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    onUpdateUnread: PropTypes.func,
    open: PropTypes.bool,
}
