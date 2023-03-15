import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'

const CustomFormatedDateTime = ({ date }) => {
    const { global } = useSelector((state) => state.globalSettings)
    let timeFormat = global?.timeformat

    if (timeFormat === '12') {
        return moment(date).format('ll hh:mm a')
    } else {
        return moment(date).format('ll HH:mm')
    }
}

export default CustomFormatedDateTime
