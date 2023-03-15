import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const WalletProtect = (props) => {
    const { children } = props
    const router = useRouter()
    const { global, token } = useSelector((state) => state.globalSettings)
    const handleChildren = () => {
        if (token) {
            if (global?.customer_wallet_status === 1) {
                return children
            } else {
                router.push('/home')
            }
        } else {
            router.push('/')
        }
    }
    return <>{handleChildren()}</>
}

WalletProtect.propTypes = {}

export default WalletProtect
