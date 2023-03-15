import React, { useEffect, useState } from 'react'
import { Grid, Box, CircularProgress, Button } from '@mui/material'
import { useQuery } from 'react-query'

import wallet from '../../../../public/static/profile/wallate.png'
import user from '../../../../public/static/profile/peofile.png'
import order from '../../../../public/static/profile/image 38 (2).png'
import lotaly from '../../../../public/static/profile/point.png'
import CustomShimmerForProfile from '../../customShimmerForProfile/customShimmerForProfile'
import ProfileStatistics from './ProfileStatistics'

import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import { setUser } from '../../../redux/slices/customer'
import BasicInformation from './BasicInformation'
import { useDispatch, useSelector } from 'react-redux'
import { getAmount } from '../../../utils/customFunctions'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import LoadingButton from '@mui/lab/LoadingButton'
import { t } from 'i18next'
import { useUserDelete } from '../../../hooks/react-query/user-delete/useUserDelete'
import AuthModal from '../../auth'
import { useRouter } from 'next/router'
import { removeToken } from '../../../redux/slices/global'
import { onSingleErrorResponse } from '../../ErrorResponse'
import { toast } from 'react-hot-toast'
import { setWalletAmount } from '../../../redux/slices/cart'

const ProfilePage = () => {
    const router = useRouter()
    const [authModalOpen, setOpen] = useState(false)
    const [modalFor, setModalFor] = useState('sign-in')
    const dispatch = useDispatch()
    // const { f_name, l_name } = data
    const { global } = useSelector((state) => state.globalSettings)
    const { userData } = useSelector((state) => state.user)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            enabled: false,
            onError: onSingleErrorResponse,
        }
    )
    if (data) {
        localStorage.setItem('wallet_amount', data?.data?.wallet_balance)
        dispatch(setWalletAmount(data?.data?.wallet_balance))
        dispatch(setUser(data?.data))
    }
    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => {
        setOpen(false)
    }
    // if (isLoading) {
    //     return <CustomShimmerForProfile />
    // }

    const addCurrencySymbol = getAmount(
        data?.data?.wallet_balance,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint
    )
    const onSuccessHandlerForUserDelete = async (res) => {
        localStorage.removeItem('token')
        dispatch(removeToken())
        toast.success('Account has been deleted')
        handleCloseAuthModal()
        handleOpenAuthModal()
        await router.push('/')
    }
    const { mutate } = useUserDelete(onSuccessHandlerForUserDelete)
    const deleteUserHandler = () => {
        mutate()
    }
    useEffect(() => {
        refetch().then()
        data && dispatch(setUser(data?.data))
    }, [])

    return (
        <>
            <AuthModal
                open={authModalOpen}
                handleClose={handleCloseAuthModal}
                modalFor={modalFor}
                setModalFor={setModalFor}
            />
            {data ? (
                <>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 4 }}
                        sx={{ paddingTop: '30px', paddingBottom: '15px' }}
                    >
                        <ProfileStatistics
                            value={userData?.member_since_days}
                            title="Days since Joining"
                            image={user.src}
                            pathname="/customer/profile"
                        />
                        {global?.customer_wallet_status !== 0 && <ProfileStatistics
                            value={addCurrencySymbol}
                            title="Amount in Wallet"
                            image={wallet.src}
                            pathname="/customer/wallets"
                        />
                        }

                        <ProfileStatistics
                            value={userData?.order_count}
                            title="Orders"
                            image={order.src}
                            pathname="/order-history"
                        />
                        {global?.loyalty_point_status !== 0 && <ProfileStatistics
                            value={userData?.loyalty_point}
                            title="Loyalty Points"
                            image={lotaly.src}
                            pathname="/customer/loyality"
                        /> }

                    </Grid>

                    <BasicInformation
                        data={userData}
                        refetch={refetch}
                        deleteUserHandler={deleteUserHandler}
                    />
                </>
            ) : (
                <CustomShimmerForProfile />
            )}
        </>
    )
}

export default ProfilePage
