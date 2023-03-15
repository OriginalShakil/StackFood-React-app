import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const AuthGuard = (props) => {
    const { children } = props
    //const { token } = useSelector((state) => state.globalSettings)
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(
        () => {
            if (!router.isReady) {
                return
            }

            const token = localStorage.getItem('token')

            if (token) {
                setChecked(true)
            } else {
                router.push('/')
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady]
    )

    if (!checked) {
        return null
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>
}

AuthGuard.propTypes = {}

export default AuthGuard
