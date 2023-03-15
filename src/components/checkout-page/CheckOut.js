import React, { useEffect } from 'react'
import { CssBaseline, Container } from '@mui/material'
import CheckoutPage from './CheckoutPage'
import Router from 'next/router'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import ZoneWiseGuard from '../route-guard/ZoneWiseGuard'
import { useSelector } from 'react-redux'

const CheckOut = () => {
    return (
        <>
            <CheckoutPage />
        </>
    )
}

export default CheckOut
