import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import DeliveryTimeInfo from './DeliveryTimeInfo'
import moment from 'moment'

const DeliveryTimeInfoVisibility = (props) => {
    const { trackData } = props
    const currentTimeIsBeforeScheduleTime = () => {
        const date = new Date()
        const orderPlacedTime = trackData?.data?.schedule_at
            ? trackData?.data?.schedule_at
            : trackData?.data?.created_at
        return moment(orderPlacedTime).isBefore(date)
    }
    const handleVisibility = () => {
        if (currentTimeIsBeforeScheduleTime()) {
            if (
                trackData?.data?.order_status !== 'delivered' &&
                trackData?.data?.order_status !== 'failed' &&
                trackData?.data?.order_status !== 'canceled' &&
                trackData?.data?.order_status !== 'refund_requested' &&
                trackData?.data?.order_status !== 'refunded'
            ) {
                return (
                    <Box sx={{ marginBottom: '1rem' }} width="100%">
                        <DeliveryTimeInfo trackData={trackData} />
                    </Box>
                )
            }
        } else {
            return null
        }
    }
    return <>{handleVisibility()}</>
}

DeliveryTimeInfoVisibility.propTypes = {}

export default DeliveryTimeInfoVisibility
