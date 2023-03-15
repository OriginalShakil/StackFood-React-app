import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import { onErrorResponse } from '../ErrorResponse'
import Typography from '@mui/material/Typography'
import { CustomButton } from '../custom-cards/CustomCards.style'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'

const PaymentUpdate = ({
    id,
    refetchOrderDetails,
    refetchTrackData,
    trackData,
}) => {
    const [openModal, setOpenModal] = useState(false)
    const { t } = useTranslation()
    const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
        useMutation(
            'order-payment-method-update',
            OrderApi.FailedPaymentMethodUpdate
        )

    const handleOnSuccess = () => {
        const handleSuccess = (response) => {
            toast.success(response.data.message)
            refetchOrderDetails()
            refetchTrackData()
        }
        const formData = {
            order_id: id,
            _method: 'put',
        }
        paymentMethodUpdateMutation(formData, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
        })
        setOpenModal(false)
    }
    return (
        <>
            <CustomPaperBigCard>
                <CustomButton
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                >
                    <Typography variant="h5">
                        {t('Switch to cash on delivery')}
                    </Typography>
                </CustomButton>
            </CustomPaperBigCard>
            <CustomDialogConfirm
                dialogTexts="Are you sure you want to switch this order to Cash On Delivery?"
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={handleOnSuccess}
            />
        </>
    )
}

PaymentUpdate.propTypes = {}

export default PaymentUpdate
