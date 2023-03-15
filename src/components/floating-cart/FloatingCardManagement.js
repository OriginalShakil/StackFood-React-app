import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FloatingCart from './FloatingCart'
import BottomNav from '../navbar/BottomNav'

const FloatingCardManagement = ({ zoneid }) => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const [showBottomNav, setShowBottomNav] = useState(false)
    useEffect(() => {
        zoneid && zoneid.length > 0 && setShowBottomNav(true)
    }, [zoneid])

    return (
        <>
            <FloatingCart
                sideDrawerOpen={sideDrawerOpen}
                setSideDrawerOpen={setSideDrawerOpen}
            />
            {showBottomNav && (
                <BottomNav setSideDrawerOpen={setSideDrawerOpen} />
            )}
        </>
    )
}

FloatingCardManagement.propTypes = {}

export default FloatingCardManagement
