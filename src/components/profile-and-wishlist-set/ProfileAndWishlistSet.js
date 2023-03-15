import React, { useEffect } from 'react'
import { setWishList } from '../../redux/slices/wishList'
import { useWishListGet } from '../../hooks/react-query/config/wish-list/useWishListGet'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/customer'
import { useQuery } from 'react-query'
import { ProfileApi } from '../../hooks/react-query/config/profileApi'

export const ProfileAndWishlistSet = ({ handleParentModalClose }) => {
    const dispatch = useDispatch()
    const onSuccessHandler = (res) => {
        dispatch(setWishList(res))
        //handleClose()
    }

    const { refetch } = useWishListGet(onSuccessHandler)
    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res.data))
        //handleClose()
    }
    const {
        data,
        isError,
        refetch: profileRefatch,
    } = useQuery(['profile-info'], ProfileApi.profileInfo, {
        enabled: false,
        onSuccess: userOnSuccessHandler,
    })
    useEffect(async () => {
        await refetch()
        await profileRefatch()
        handleParentModalClose()
    }, [])
    return <div></div>
}
