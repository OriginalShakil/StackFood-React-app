import React from 'react'
import Typography from '@mui/material/Typography'
import { Popover } from '@mui/material'
import {
    CustomContentWrapperForNavbarPopover,
    CustomNavbarPopoverHeader,
    CustomWrapperForNavbarPopover,
} from './Navbar.style'
import { useTranslation } from 'react-i18next'
import { CustomTypographyBold } from '../../../../styled-components/CustomStyles.style'

const MailsPopover = (props) => {
    const { anchorEl, onClose, open } = props
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
        >
            <CustomWrapperForNavbarPopover>
                <CustomNavbarPopoverHeader>
                    <CustomTypographyBold color="inherit" variant="h6">
                        {t('Mails')}
                    </CustomTypographyBold>
                </CustomNavbarPopoverHeader>
                <CustomContentWrapperForNavbarPopover>
                    <Typography variant="subtitle2">{t('Mails')}</Typography>
                </CustomContentWrapperForNavbarPopover>
            </CustomWrapperForNavbarPopover>
        </Popover>
    )
}

MailsPopover.propTypes = {}

export default MailsPopover
