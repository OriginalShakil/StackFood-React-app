import React from 'react'

import { AppBarStyle } from './Navbar.style'
import SecondNavbar from './second-navbar/SecondNavbar'
// import TopNav from './top-navbar/TopNav'
import dynamic from 'next/dynamic'

const Navigation = () => {
    const TopNav = dynamic(() => import('./top-navbar/TopNav'), {
        ssr: false,
    })
    return (
        <AppBarStyle>
            <TopNav />
            <SecondNavbar />
        </AppBarStyle>
    )
}

export default Navigation
