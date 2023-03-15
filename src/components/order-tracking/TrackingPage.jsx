import React, { useState, useEffect } from 'react'
import {
    Box,
    Divider,
    Grid,
    Step,
    StepLabel,
    Stepper,
    Typography,
    StepContent,
    Skeleton,
    Stack,
} from '@mui/material'
import { CustomStepperStyled } from './CustomStepper'
import {
    OrderDetailBox,
    HeadingBox,
    OrderDetailGrid,
    StepBox,
} from './Tracking.style'
import GoogleMapComponent from '../landingpage/google-map/GoogleMapComponent'
import { getDateFormat } from '../../utils/customFunctions'
import MapComponent from '../restaurant-details/google-address/MapComponent'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import ChatIcon from '@mui/icons-material/Chat'
import Link from 'next/link'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import CustomFormatedTime from '../date/CustomFormatedTime'
import DeliverymanInfo from './DeliverymanInfo'
import DeliverymanShimmer from './DeliverymanShimmer'
import SimpleBar from 'simplebar-react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const TrackingPage = ({ data }) => {
    const [actStep, setActStep] = useState(1)

    const steps = [
        {
            label: 'Order placed',
            time: data?.pending,
        },
        {
            label: 'Order Confirmed',
            time: data?.confirmed,
        },
        {
            label: 'Preparing Food',
            time: data?.processing,
        },
        {
            label: 'Food is on the way',
            time: data?.picked_up,
        },
        {
            label: 'Delivered',
            time: data?.delivered,
        },
    ]
    useEffect(() => {
        if (data?.order_status === 'panding') {
            setActStep(1)
        } else if (data?.order_status === 'confirmed') {
            setActStep(2)
        } else if (
            data?.order_status === 'processing' ||
            data?.order_status === 'handover'
        ) {
            setActStep(3)
        } else if (data?.order_status === 'picked_up') {
            setActStep(4)
        } else if (data?.order_status === 'delivered') {
            setActStep(5)
        }
    }, [actStep, data])
    const deliveryLat = data?.delivery_address?.latitude
    const deliveryLong = data?.delivery_address?.longitude
    const resLat = data?.restaurant.latitude
    const resLong = data?.restaurant.longitude

    const { t } = useTranslation()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth mt={{ xs: '6rem', md: '9.5rem' }} mb="2rem">
            <CustomPaperBigCard>
                <Grid container item md={12} xs={12}>
                    <Grid item md={12} xs={12}>
                        {data ? (
                            <HeadingBox>
                                <Typography
                                    sx={{
                                        color: theme=>theme.palette.primary.main,
                                        fontSize: '36px',
                                        fontWeight: '600',
                                    }}
                                >
                                    #{data?.id}
                                </Typography>
                                <CustomStackFullWidth
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    spacing={0.5}
                                >
                                    <Typography>
                                        {t('Order placed at')}
                                    </Typography>
                                    <Typography>
                                        <CustomFormatedDateTime
                                            date={data?.created_at}
                                        />
                                    </Typography>
                                </CustomStackFullWidth>
                            </HeadingBox>
                        ) : (
                            <CustomStackFullWidth alignItems="center">
                                <Skeleton
                                    variant="text"
                                    width="20%"
                                    height="20px"
                                />
                                <Skeleton
                                    variant="text"
                                    width="20%"
                                    height="20px"
                                />
                            </CustomStackFullWidth>
                        )}
                        <Divider />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <SimpleBar
                            style={{ height: isSmall ? '250px' : '190px' }}
                        >
                            <StepBox>
                                <CustomStepperStyled
                                    activeStep={actStep}
                                    alternativeLabel
                                >
                                    {steps.map((labels, index) => (
                                        <Step key={labels}>
                                            <StepLabel>
                                                <Typography>
                                                    {t(labels.label)}
                                                </Typography>
                                                {data ? (
                                                    <Typography>
                                                        {labels.time !==
                                                        null ? (
                                                            <CustomFormatedTime
                                                                date={
                                                                    labels.time
                                                                }
                                                            />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Typography>
                                                ) : (
                                                    <Skeleton variant="text" />
                                                )}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </CustomStepperStyled>
                            </StepBox>
                        </SimpleBar>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <MapComponent
                            latitude={deliveryLat}
                            longitude={deliveryLong}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} align="center" pt="2rem">
                        {data ? (
                            data?.delivery_man ? (
                                <DeliverymanInfo data={data} />
                            ) : (
                                <Typography>
                                    {t('Delivery man has not been assigned')}
                                </Typography>
                            )
                        ) : (
                            <DeliverymanShimmer />
                        )}
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
        </CustomStackFullWidth>
    )
}

export default TrackingPage
