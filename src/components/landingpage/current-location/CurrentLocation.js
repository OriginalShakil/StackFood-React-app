import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CurrentLocation = (props) => {
    const { openLocation, handleCloseLocation, isGeolocationAvailable } = props
    const { t } = useTranslation()
    return (
        <>
            <Dialog
                open={openLocation}
                onClose={handleCloseLocation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("Use Google's location service?")}
                </DialogTitle>
                <DialogContent>
                    {/*{!isGeolocationAvailable ? (*/}
                    {/*    <DialogContentText id="alert-dialog-description">*/}
                    {/*        {t(*/}
                    {/*            'Let Google help apps determine location. This means sending anonymous location data  to Google, even when no apps are running.'*/}
                    {/*        )}*/}
                    {/*    </DialogContentText>*/}
                    {/*) : !isGeolocationEnabled ? (*/}
                    {/*    <DialogContentText id="alert-dialog-description">*/}
                    {/*        {t(*/}
                    {/*            'Let Google help apps determine location. This means sending anonymous location data  to Google, even when no apps are running.'*/}
                    {/*        )}*/}
                    {/*    </DialogContentText>*/}
                    {/*) : coords ? (*/}
                    {/*    <DialogContentText id="alert-dialog-description">*/}
                    {/*        {coords.latitude} , {coords.longitude}*/}
                    {/*    </DialogContentText>*/}
                    {/*) : (*/}
                    {/*    <div>*/}
                    {/*        {t('Getting the location data&hellip;')}{' '}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLocation}>
                        {t('Disagree')}
                    </Button>
                    {/*{coords ? (*/}
                    {/*    <Button*/}
                    {/*        onClick={() => handleAgreeLocation()}*/}
                    {/*        autoFocus*/}
                    {/*    >*/}
                    {/*        {t('Agree')}*/}
                    {/*    </Button>*/}
                    {/*) : (*/}
                    {/*    <Button*/}
                    {/*        onClick={() => handleCloseLocation()}*/}
                    {/*        autoFocus*/}
                    {/*    >*/}
                    {/*        {t('Okay')}*/}
                    {/*    </Button>*/}
                    {/*)}*/}
                </DialogActions>
            </Dialog>
        </>
    )
}

CurrentLocation.propTypes = {}

export default CurrentLocation
