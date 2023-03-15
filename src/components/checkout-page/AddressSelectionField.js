import React from 'react'
import PropTypes from 'prop-types'
import { InputField, SaveAddressBox } from './CheckOut.style'
import { InputBase, Typography } from '@mui/material'
import AddNewAddress from '../customer-page/address/AddNewAddress'
import Link from 'next/link'

const AddressSelectionField = (props) => {

    const { theme, address, refetch, t } = props
    const borderColor=theme.palette.primary.main
    return (
        <>
            <InputField
                variant="outlined"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    border:`.5px solid ${borderColor}`,
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontSize: '15px',

                        [theme.breakpoints.down('sm')]: {
                            fontSize: '12px',
                        },
                    }}
                    placeholder="Set Location"
                    inputProps={{
                        'aria-label': 'search google maps',
                    }}
                    value={address?.address}
                />

                <AddNewAddress refetch={refetch} />
            </InputField>
            <SaveAddressBox>
                <Link href="/customer/address">
                    <Typography
                        color={theme.palette.primary.main}
                        sx={{ cursor: 'pointer' }}
                    >
                        {t('View Saved Address')}
                    </Typography>
                </Link>
            </SaveAddressBox>
        </>
    )
}

AddressSelectionField.propTypes = {}

export default AddressSelectionField
