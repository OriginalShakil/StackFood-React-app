import React from 'react'
import DeleteDialog from './DeleteDialog'
import ConfirmDialog from './ConfirmDialog'
import { Stack } from '@mui/material'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const CustomDialogs = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Dialogs')}</title>
            {/* </Helmet> */}
            <Stack spacing={4}>
                <DeleteDialog />
                <ConfirmDialog />
            </Stack>
        </>
    )
}

CustomDialogs.propTypes = {}

export default CustomDialogs
