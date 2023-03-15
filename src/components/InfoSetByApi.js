import React from 'react'
import { useQuery } from 'react-query'
import { ProfileApi } from '../hooks/react-query/config/profileApi'
import { setUser } from '../redux/slices/customer'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setWalletAmount } from '../redux/slices/cart'

export const InfoSetByApi = () => {
    const dispatch = useDispatch()
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo
    )

    if (data) {
        localStorage.setItem('wallet_amount', data?.data?.wallet_balance)
        dispatch(setWalletAmount(data?.data?.wallet_balance))
        dispatch(setUser(data?.data))
    }
}
