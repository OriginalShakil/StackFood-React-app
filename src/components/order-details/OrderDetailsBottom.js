import React, {useEffect, useState} from 'react'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import { CustomButton } from '../custom-cards/CustomCards.style'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { useMutation } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import { onErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import {useTheme} from "@mui/material/styles";
import CustomModal from "../custom-modal/CustomModal";
import CancelOrder from "./CancelOrder";
import {useGetOrderCancelReason} from "../../hooks/react-query/config/order-cancel/useGetCanelReasons";

const OrderDetailsBottom = ({
    id,
    refetchOrderDetails,
    refetchTrackData,
    trackData,
}) => {
    const [openModal, setOpenModal] = useState(false)
    const [cancelReason,setCancelReason]=useState(null)
    const { t } = useTranslation()
    const theme =useTheme()
    const {data:cancelReasonsData,refetch}=useGetOrderCancelReason()
     useEffect(()=>{
         refetch()
     },[])
    const { mutate: orderCancelMutation, isLoading: orderLoading } =
        useMutation('order-cancel', OrderApi.CancelOrder)
    const handleTrackOrderClick = () => {
        Router.push(`/tracking/${id}`)
    }

    const handleOnSuccess = () => {
        if(!cancelReason){
            toast.error("Please select a cancellation reason")
        }
        else {
            const handleSuccess = (response) => {
                 //toast.success(response.data.message)
                refetchOrderDetails()
                refetchTrackData()
            }
            const formData = {
                order_id: id,
                reason:cancelReason,
                _method: 'put',
            }
            orderCancelMutation(formData, {
                onSuccess: handleSuccess,
                onError: onErrorResponse,
            })
            setOpenModal(false)
        }

    }

    return (
        <>
            <CustomPaperBigCard>
                <Grid container spacing={4}>
                    {trackData &&
                    trackData?.data?.order_status === 'confirmed' ? (
                        <Grid item xs={12} md={12}>
                            <CustomButton
                                variant="contained"
                                onClick={handleTrackOrderClick}
                            >
                                <Typography variant="h5">
                                    {t('Track Order')}
                                </Typography>
                            </CustomButton>
                        </Grid>
                    ) : (
                        <Grid item xs={6} md={6}>
                            <CustomButton
                                variant="contained"
                                onClick={handleTrackOrderClick}
                            >
                                <Typography variant="h5" >
                                    {t('Track Order')}
                                </Typography>
                            </CustomButton>
                        </Grid>
                    )}
                    {trackData &&
                        trackData?.data?.order_status !== 'confirmed' && (
                            <Grid item xs={6} md={6}>
                                <CustomButton
                                    variant="outlined"

                                    onClick={() => setOpenModal(true)}
                                >
                                    <Typography variant="h5" color={theme.palette.primary.main}>
                                        {t('Cancel Order')}
                                    </Typography>
                                </CustomButton>
                            </Grid>

                        )}
                </Grid>
            </CustomPaperBigCard>
            <CustomModal
                //dialogTexts="Are you sure you want to cancel this order?"
                openModal={openModal}
                setModalOpen={setOpenModal}

                // onSuccess={handleOnSuccess}
            >
                <CancelOrder cancelReason={cancelReason}
                             setCancelReason={setCancelReason}
                             cancelReasonsData={cancelReasonsData}
                             setModalOpen={setOpenModal}
                             handleOnSuccess={handleOnSuccess}/>
            </CustomModal>
        </>
    )
}

export default OrderDetailsBottom
