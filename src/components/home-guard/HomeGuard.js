import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const HomeGuard = (props) => {
    const { children } = props
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    useEffect(
        () => {
            if (!router.isReady) {
                return
            }
            const zoneId = JSON.parse(localStorage.getItem('zoneid'))
            if (zoneId?.length > 0) {
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

HomeGuard.propTypes = {}

export default HomeGuard
