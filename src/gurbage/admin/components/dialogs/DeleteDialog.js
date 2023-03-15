import React from 'react'
import { toast } from 'react-hot-toast'
import CustomDialogDelete from '../../../../components/custom-dialog/delete/CustomDialogDelete'

const DeleteDialog = () => {
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
            <CustomDialogDelete
                open={open}
                onClick={handleClickOpen}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        </div>
    )
}

export default DeleteDialog
