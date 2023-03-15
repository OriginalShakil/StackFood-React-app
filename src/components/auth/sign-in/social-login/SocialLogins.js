import React, { memo } from 'react'
import { Stack } from '@mui/material'
import GoogleLoginComp from './GoogleLoginComp'
import FbLoginComp from './FbLoginComp'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { loginSuccessFull } from '../../../../utils/ToasterMessages'
import { useTranslation } from 'react-i18next'
import { setToken } from '../../../../redux/slices/global'
import ProfileAndWishlistSet from '../../../profile-and-wishlist-set/ProfileAndWishlistSet'
import { setWishList } from '../../../../redux/slices/wishList'
import { useWishListGet } from '../../../../hooks/react-query/config/wish-list/useWishListGet'
import { setUser } from '../../../../redux/slices/customer'
import { useQuery } from 'react-query'
import { ProfileApi } from '../../../../hooks/react-query/config/profileApi'
import { onSingleErrorResponse } from '../../../ErrorResponse'

const SocialLogins = (props) => {
    const { socialLogins, handleParentModalClose } = props
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res.data))
    }
    const { refetch: profileRefatch } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            enabled: false,
            onSuccess: userOnSuccessHandler,
            onError: onSingleErrorResponse,
        }
    )
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
    }
    const { refetch } = useWishListGet(onSuccessHandler)
    const handleSuccess = async (value) => {
        localStorage.setItem('token', value)
        toast.success(t(loginSuccessFull))
        await refetch()
        await profileRefatch()
        dispatch(setToken(value))
        handleParentModalClose?.()
    }
    return (
        <Stack alignItems="center" justifyContent="center" spacing={0.5} >
            {socialLogins.map((item, index) => {
                if (item?.login_medium === 'google' && item.status === true) {
                    return (
                        <GoogleLoginComp
                            key={index}
                            handleSuccess={handleSuccess}
                            handleParentModalClose={handleParentModalClose}
                            global={global}
                        />
                    )
                } else if (
                    item?.login_medium === 'facebook' &&
                    item.status === true
                ) {
                    return (
                        <FbLoginComp
                            key={index}
                            handleSuccess={handleSuccess}
                            handleParentModalClose={handleParentModalClose}
                            global={global}
                        />
                    )
                }
            })}
        </Stack>
    )
}

SocialLogins.propTypes = {}

export default memo(SocialLogins)
