import React from 'react'
import { Alert, AlertTitle, Stack } from '@mui/material'
// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'

const CustomAlerts = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Alerts')}</title>
            {/* </Helmet> */}
            <CustomStackFullWidth spacing={5}>
                <Stack spacing={2}>
                    <Alert severity="error">
                        This is an error alert — check it out!
                    </Alert>
                    <Alert severity="warning">
                        This is a warning alert — check it out!
                    </Alert>
                    <Alert severity="info">
                        This is an info alert — check it out!
                    </Alert>
                    <Alert severity="success">
                        This is a success alert — check it out!
                    </Alert>
                </Stack>

                <Stack spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        This is a warning alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        This is an info alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>check it out!</strong>
                    </Alert>
                </Stack>
                <Stack spacing={2}>
                    <Alert variant="outlined" severity="error">
                        This is an error alert — check it out!
                    </Alert>
                    <Alert variant="outlined" severity="warning">
                        This is a warning alert — check it out!
                    </Alert>
                    <Alert variant="outlined" severity="info">
                        This is an info alert — check it out!
                    </Alert>
                    <Alert variant="outlined" severity="success">
                        This is a success alert — check it out!
                    </Alert>
                </Stack>
                <Stack spacing={2}>
                    <Alert variant="filled" severity="error">
                        This is an error alert — check it out!
                    </Alert>
                    <Alert variant="filled" severity="warning">
                        This is a warning alert — check it out!
                    </Alert>
                    <Alert variant="filled" severity="info">
                        This is an info alert — check it out!
                    </Alert>
                    <Alert variant="filled" severity="success">
                        This is a success alert — check it out!
                    </Alert>
                </Stack>
            </CustomStackFullWidth>
        </>
    )
}

CustomAlerts.propTypes = {}

export default CustomAlerts
