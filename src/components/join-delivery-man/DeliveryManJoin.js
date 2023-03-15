import React from 'react'
import {
    CustomBoxFullWidth,
    CustomPaperBigCard,
    CustomStackFullWidth,
    FlexContainerCenter,
} from '../../styled-components/CustomStyles.style'
import DeliveryManJoinForm from './DeliveryManJoinForm'
import { useGetZone } from '../../hooks/react-query/config/get-zone/useGetZone'
import { useDeliveryMan } from '../../hooks/react-query/config/deliveryman-store/useDeliveryManStore'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import {Typography} from "@mui/material";
import {t} from "i18next";
import {onErrorResponse} from "../ErrorResponse";

const DeliveryManJoin = () => {
    const router = useRouter()
    const { data } = useGetZone()

    const { mutate, isLoading } = useDeliveryMan()
    const formSubmitHandler = (values) => {
        const onSuccessHandler = (resData) => {
            toast.success(resData.message)
            router.push('/')
        }
        mutate(values, {
            onSuccess: onSuccessHandler,
            onError:onErrorResponse
        })
    }

    return (
        <FlexContainerCenter>
            <CustomPaperBigCard >
                <Typography>{t('Deliveryman Registration')}</Typography>
                <DeliveryManJoinForm
                    formSubmit={formSubmitHandler}
                    zoneData={data}
                    isLoading={isLoading}
                />
            </CustomPaperBigCard>
        </FlexContainerCenter>
    )
}
export default DeliveryManJoin
