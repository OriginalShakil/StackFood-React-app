import React from 'react'
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText, MenuItem, Popover } from '@mui/material'
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar'
import avatar from '../../../../assets/images/icons/avatar.png'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LogoutIcon from '@mui/icons-material/Logout'
import {
    CustomAccountDetailsWrapperForAccountPopover,
    CustomBoxForAccountPopover,
    CustomContainerForAccountPopover,
} from './Navbar.style'
import { useTranslation } from 'react-i18next'

const AccountPopover = (props) => {
    const { t } = useTranslation()
    const { anchorEl, onClose, open, ...other } = props
    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            keepMounted
            onClose={onClose}
            open={open}
            transitionDuration={0}
            {...other}
        >
            <CustomContainerForAccountPopover>
                <CustomBoxForAccountPopover>
                    <CustomAvatar avatarImage={avatar} />
                    <CustomAccountDetailsWrapperForAccountPopover>
                        <Typography variant="body1">abc</Typography>
                        <Typography color="textSecondary" variant="body2">
                            Abcd ifj
                        </Typography>
                    </CustomAccountDetailsWrapperForAccountPopover>
                </CustomBoxForAccountPopover>
                <Divider />
                <CustomAccountDetailsWrapperForAccountPopover marginTop>
                    <MenuItem>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    {t('Logout')}
                                </Typography>
                            }
                        />
                    </MenuItem>
                </CustomAccountDetailsWrapperForAccountPopover>
            </CustomContainerForAccountPopover>
        </Popover>
    )
}

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default AccountPopover
