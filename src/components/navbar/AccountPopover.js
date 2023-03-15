import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
// import toast from 'react-hot-toast'
import {
    Avatar,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Stack,
    Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { removeToken } from '../../redux/slices/global'
import { useTranslation } from 'react-i18next'
import { clearWishList } from '../../redux/slices/wishList'
import { useRoutes } from 'react-router'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import CustomDialogConfirm from '../custom-dialog/confirm/CustomDialogConfirm'
import { logoutSuccessFull } from '../../utils/ToasterMessages'
import { setClearCart } from '../../redux/slices/cart'
import loyality from "../../../public/static/profile/loyality.png";

export const menuData = [
    {
        id: 1,
        name: 'My Orders',
        path: '/order-history',
    },
    {
        id: 2,
        name: 'Profile',
        path: '/customer/profile',
    },
    {
        id: 3,
        name: 'Coupons',
        path: '/customer/coupon',
    },
    {
        id: 4,
        name: 'Wallets',
        path: '/customer/wallets',
    },
    {
        id: 5,
        name: 'Loyalty Points',
        path: '/customer/loyality',
    },
    {
        id: 6,
        name: 'Referral Code',
        path: '/customer/refer-code',

    },
    {
        id: 7,
        name: 'Address',
        path: '/customer/address',
    },

    {
        id: 8,
        name: 'Settings',
        path: '/customer/settings',
    },
]

export const AccountPopover = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const { global } = useSelector((state) => state.globalSettings)
    const router = useRouter()
    const { t } = useTranslation()
    const { anchorEl, onClose, open, ...other } = props
    const dispatch = useDispatch()
    const handleLogout = async () => {
        setIsLogoutLoading(true)
        try {
            setTimeout(() => {
                localStorage.removeItem('token')
                dispatch(removeToken())
                let a = []
                dispatch(clearWishList(a))
                dispatch(setClearCart())

                toast.success(t(logoutSuccessFull))
                onClose?.()
                if (router.pathname === '/') {
                    router.push('/')
                } else {
                    router.push('/home')
                }
            }, 500)
        } catch (err) {
            //   toast.error('Unable to logout.');
        }
    }
    const handleClick = (path) => {
        router.push(`${path}`)
        onClose()
    }
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                onClose={onClose}
                open={open}
                PaperProps={{ sx: { width: 300 } }}
                transitionDuration={2}
                {...other}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        p: 1,
                        cursor: 'pointer',
                    }}
                >
                    <MenuList>
                        {menuData.map((menu, index) => {
                            if (
                                (global?.customer_wallet_status === 0 &&
                                    menu.id === 4) ||
                                (global?.loyalty_point_status === 0 &&
                                    menu.id === 5) ||
                                (global?.ref_earning_status === 0 &&  menu.id===6)
                            ) {
                                return null
                            } else {
                                return (
                                    <MenuItem
                                        onClick={() => handleClick(menu.path)}
                                        key={menu.id}
                                        sx={{
                                            justifyContent: `${
                                                languageDirection === 'rtl' &&
                                                'flex-end'
                                            }`,
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    theme.palette.primary.main,
                                            },
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {t(menu.name)}
                                        </Typography>
                                    </MenuItem>
                                )
                            }
                        })}
                    </MenuList>
                </Box>
                <Divider />
                <Box
                    sx={{ my: 1, cursor: 'pointer' }}
                    alignItems={languageDirection === 'rtl' ? 'end' : 'start'}
                    width="100%"
                >
                    <MenuItem
                        onClick={() => setOpenModal(true)}
                        sx={{
                            justifyContent: `${
                                languageDirection === 'rtl'
                                    ? 'flex-end'
                                    : 'flex-start'
                            }`,
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    {t('Logout')}
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Box>
            </Popover>
            <CustomDialogConfirm
                isLoading={isLogoutLoading}
                dialogTexts={t('Are you sure you want to  logout?')}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={handleLogout}
            />
        </>
    )
}

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}
