import { Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import SignInPage from './sign-in'
import SignUpPage from './sign-up'

const AuthModal = ({
    open,
    handleClose,
    signInSuccess,
    modalFor,
    setModalFor,
}) => {
    const [signInPage, setSignInPage] = useState(true)
    const handleModal = () => {
        if (modalFor === 'sign-in') {
            return (
                <SignInPage
                    signInSuccess={signInSuccess}
                    handleClose={handleClose}
                    setModalFor={setModalFor}
                    setSignInPage={setSignInPage}
                />
            )
        } else {
            return (
                <SignUpPage
                    handleClose={handleClose}
                    setSignInPage={setSignInPage}
                    setModalFor={setModalFor}
                />
            )
        }
    }
    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                maxWidth="400px"
            >
                {handleModal()}
            </Modal>
        </Box>
    )
}

export default AuthModal
