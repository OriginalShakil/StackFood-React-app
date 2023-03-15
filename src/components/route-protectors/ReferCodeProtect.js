import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const ReferCodeProtect = (props) => {
    const { children } = props
    const router = useRouter()
    const { global, token } = useSelector((state) => state.globalSettings)
    const handleChildren = () => {
        if (token) {
            if (global?.ref_earning_status === 1) {
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

ReferCodeProtect.propTypes = {}

export default ReferCodeProtect
