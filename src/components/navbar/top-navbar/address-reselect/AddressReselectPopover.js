import React, { useEffect, useState } from 'react'
import { Alert, Popover } from '@mui/material'
import DeliveryAddress from '../../../checkout-page/DeliveryAddress'
import SimpleBar from 'simplebar-react'
import { CustomButtonPrimary } from '../../../../styled-components/CustomButtons.style'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../../custom-tables/Tables.style'
import { toast } from 'react-hot-toast'
import MapModal from '../../../landingpage/google-map/MapModal'
import CustomAlert from '../../../alert/CustomAlert'

const AddressReselectPopover = (props) => {
    const { anchorEl, onClose, open, t, address, setAddress, token, ...other } =
        props
    const [openMapModal, setOpenMapModal] = useState(false)
    const handleCloseMapModal = () => {
        setOpenMapModal(false)
        onClose()
    }
    const popOverHeightHandler = () => {
        if (token) {
            return '200px'
        } else {
            return '150px'
        }
    }


    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                onClose={onClose}
                open={open}
                PaperProps={{
                    sx: { width: { xs: 300, sm: 320, md: 350 }, p: '1rem' },
                }}
                transitionDuration={2}
                {...other}
            >
                <SimpleBar
                    style={{
                        height: popOverHeightHandler(),
                    }}
                >
                    <CustomStackFullWidth alignItems="center" spacing={1}>
                        {token ? (
                            open && (
                                <DeliveryAddress
                                    setAddress={setAddress}
                                    address={address}
                                    hideAddressSelectionField="true"
                                    renderOnNavbar="true"
                                />
                            )
                        ) : (
                            <CustomAlert
                                type="info"
                                text={t(
                                    'To select from saved addresses, you need to sign in.'
                                )}
                            />
                        )}
                        <CustomTypography>{t('Or')}</CustomTypography>
                        <CustomButtonPrimary
                            onClick={() => setOpenMapModal(true)}
                        >
                            {t('Pick from map')}
                        </CustomButtonPrimary>
                    </CustomStackFullWidth>
                </SimpleBar>
            </Popover>
            {openMapModal && (
                <MapModal
                    open={openMapModal}
                    handleClose={handleCloseMapModal}
                />
            )}
        </>
    )
}

AddressReselectPopover.propTypes = {}

export default AddressReselectPopover
