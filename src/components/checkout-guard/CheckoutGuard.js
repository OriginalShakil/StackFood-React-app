import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const CheckoutGuard = (props) => {
    const { children, cartList } = props
    const router = useRouter()
    //const { cartList } = useSelector((state) => state.cart)
    const [tokenExist, setTokenExist] = useState(false)
    const [checked, setChecked] = useState(false)
    const { token } = useSelector((state) => state.globalSettings)
    const { page } = router.query

    if (token) {
        if (page === 'campaign') {
            return <>{children}</>
        } else {
            if (cartList.length > 0) {
                return <>{children}</>
            } else {
                router.push('/home')
            }
        }
    } else {
        router.push('/home')
    }

    if (!checked) {
        return null
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>
}

CheckoutGuard.propTypes = {}

export default CheckoutGuard
