import React from 'react'
import { toast } from 'react-hot-toast'
import CustomDialogConfirm from '../../../../components/custom-dialog/confirm/CustomDialogConfirm'

const ConfirmDialog = () => {
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleSuccess = () => {
        setOpen(false)
        toast.success('Success')
    }
    return (
        <div>
            <CustomDialogConfirm
                open={open}
                onClick={handleClickOpen}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        </div>
    )
}

export default ConfirmDialog
