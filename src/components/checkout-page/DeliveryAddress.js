import React, { useEffect, useState } from 'react'
import {
    Button,
    InputBase,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import { DeliveryCaption, SaveAddressBox, InputField } from './CheckOut.style'
import { useQuery } from 'react-query'
import { AddressApi } from '../../hooks/react-query/config/addressApi'
import AddNewAddress from '../customer-page/address/AddNewAddress'
import Link from 'next/link'
import CustomCheckOutShimmer from '../CustomShimmerForCheckout/CustomCheckOutShimmer'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import CustomAlert from '../alert/CustomAlert'
import AddressSelectionField from './AddressSelectionField'
import AddressSelectionList from './order-summary/AddressSelectionList'

const DeliveryAddress = ({
    setAddress,
    address,
    hideAddressSelectionField,
    handleSize,
    renderOnNavbar,
}) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [allAddress, setAllAddress] = useState()
    const [data, setData] = useState(null)

    const mainAddress = {
        ...address,
    }
    const handleSuccess = (response) => {
        setData(response.data)
    }
    const { refetch, isRefetching } = useQuery(
        ['address-list'],
        AddressApi.addressList,
        {
            enabled: false,
            onSuccess: handleSuccess,
            onError: onSingleErrorResponse,
        }
    )

    useEffect(async () => {
        await refetch()
    }, [])
    useEffect(() => {
        // handleSize(data.total_size)
        data && setAllAddress([mainAddress, ...data.addresses])
    }, [data])

    const handleLatLng = (values) => {
        setAddress({ ...values, lat: values.latitude, lng: values.longitude })
    }

    return (
        <>
            <DeliveryCaption>{t('Delivery Addresses')}</DeliveryCaption>
            {hideAddressSelectionField !== 'true' && (
                <AddressSelectionField
                    theme={theme}
                    address={address}
                    refetch={refetch}
                    t={t}
                />
            )}
            {renderOnNavbar === 'true' ? (
                <AddressSelectionList
                    data={data}
                    allAddress={allAddress}
                    handleLatLng={handleLatLng}
                    t={t}
                    address={address}
                />
            ) : (
                <SimpleBar style={{ maxHeight: 200 }}>
                    <AddressSelectionList
                        data={data}
                        allAddress={allAddress}
                        handleLatLng={handleLatLng}
                        t={t}
                        address={address}
                        isRefetching={isRefetching}
                    />
                </SimpleBar>
            )}
        </>
    )
}
export default DeliveryAddress
