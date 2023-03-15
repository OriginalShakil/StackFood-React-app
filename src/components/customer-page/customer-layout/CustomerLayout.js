import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CustomBodyContent } from './Customer.style'
import MenuBar from './MenuBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomTab from '../../CustomTab/CustomTab'
import profile from '../../../../public/static/profile/profile.png'
import cupons from '../../../../public/static/profile/cupons.png'
import wallate from '../../../../public/static/profile/wallate.png'
import loyality from '../../../../public/static/profile/loyality.png'
import refer from "../../../../public/static/refer_code.png"
import address from '../../../../public/static/profile/address.png'
import settings from '../../../../public/static/profile/settings.png'
import order from '../../../../public/static/profile/image 38 (2).png'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import SideDrawerForProfile from '../SideDRawerForProfile'

const CustomerLayout = ({ component }) => {
    const router = useRouter()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const tabData = [
        {
            id: 1,
            label: 'My Orders',
            path: '/order-history',
            img: order,
        },
        {
            id: 2,
            label: 'Personal Info',
            path: '/customer/profile',
            img: profile,
        },
        {
            id: 3,
            label: 'Coupons',
            path: '/customer/coupon',
            img: cupons,
        },
        {
            id: 4,
            label: 'Wallets',
            path: '/customer/wallets',
            img: wallate,
        },
        {
            id: 5,
            label: 'Loyalty-Points',
            path: '/customer/loyality',
            img: loyality,
        },
        {
            id: 6,
            label: 'Referral Code',
            path: '/customer/refer-code',
            img:refer,
        },
        {
            id: 7,
            label: 'Your-Address',
            path: '/customer/address',
            img: address,
        },
        {
            id: 8,
            label: 'Settings',
            path: '/customer/settings',
            img: settings,
        },
    ]
    const handleNavigate = (value) => {
        router.push(value)
    }

    return (
        <>
            <Grid
                container
                md={12}
                spacing={{ xs: 0, md: 3 }}
                pb={{ sx: '0px', md: '70px' }}
                pt="'30px'"
            >
                <Grid
                    container
                    item
                    mt="1rem"
                    sx={{ display: { sm: 'block', md: 'none' } }}
                    alignItems="center"
                >
                    <SideDrawerForProfile tabData={tabData} />
                </Grid>
                <Grid
                    item
                    md={2.5}
                    xs={12}
                    sx={{ display: { xs: 'none', md: 'block' } }}
                >
                    <MenuBar tabData={tabData} />
                </Grid>

                <Grid item md={9.5} xs={12}>
                    <CustomBodyContent>{component}</CustomBodyContent>
                </Grid>
            </Grid>
        </>
    )
}

export default CustomerLayout
