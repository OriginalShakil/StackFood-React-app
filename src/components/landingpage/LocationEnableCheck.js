import React from 'react'
import DialogContent from '@mui/material/DialogContent'
import { CustomTypography } from '../custom-tables/Tables.style'
import DialogContentText from '@mui/material/DialogContentText'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import DialogActions from '@mui/material/DialogActions'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'

const LocationEnableCheck = (props) => {
    const {
        openLocation,
        handleCloseLocation,
        isGeolocationEnabled,
        t,
        coords,
        handleAgreeLocation,
    } = props
    return (
        <Dialog
            open={openLocation}
            onClose={handleCloseLocation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                {!isGeolocationEnabled ? (
                    <CustomTypography>
                        {t(
                            'You denied location permission. Please allow browsers location permission from your device, refresh the site and receive more accurate delivery.'
                        )}
                    </CustomTypography>
                ) : (
                    coords && (
                        <DialogContentText id="alert-dialog-description">
                            <CustomStackFullWidth
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CustomTypography>
                                    {t('You are at')}
                                </CustomTypography>
                                {coords.latitude} , {coords.longitude}
                            </CustomStackFullWidth>
                        </DialogContentText>
                    )
                )}
            </DialogContent>
            <DialogActions>
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <Button variant="outlined" onClick={handleCloseLocation}>
                        <CustomTypography>{t('Close')}</CustomTypography>
                    </Button>
                    {coords ? (
                        <Button
                            variant="contained"
                            onClick={() => handleAgreeLocation()}
                        >
                            {t('Agree')}
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleCloseLocation()}
                            variant="contained"
                        >
                            {t('Okay')}
                        </Button>
                    )}
                </CustomStackFullWidth>
            </DialogActions>
        </Dialog>
    )
}

LocationEnableCheck.propTypes = {}

export default LocationEnableCheck
