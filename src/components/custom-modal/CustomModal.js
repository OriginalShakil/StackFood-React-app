import React from 'react'
import {Modal, useMediaQuery, useTheme} from '@mui/material'
import {CustomModalWrapper} from './CustomModal.style'

const CustomModal = ({
                         openModal,
                         setModalOpen,
                         children,
                         disableAutoFocus,
                     }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    const handleClose = (event, reason) => {
        if (reason && reason == 'backdropClick') {
            if (disableAutoFocus) {
                return
            } else {
                setModalOpen(false)
            }
        } else {
            setModalOpen(false)
        }
    }
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={disableAutoFocus}
                backDrop
            >
                <CustomModalWrapper>{children}</CustomModalWrapper>
            </Modal>
        </div>
    )
}
CustomModal.propTypes = {}

export default CustomModal
