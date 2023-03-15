import React from 'react'
import {
    ListItemText,
    List,
    ListItem,
    MenuItem,
    Divider,
    Typography,
    Grid,
} from '@mui/material'
import { useRouter } from 'next/router'
import Link from './Link'
import ListItemIcon from '@mui/material/ListItemIcon'
//import { InboxOutlined } from '@mui/icons-material'
import profile from '../../../../public/static/profile/profile.png'
import loyality from '../../../../public/static/profile/loyality.png'
import settings from '../../../../public/static/profile/settings.png'
import cupons from '../../../../public/static/profile/cupons.png'
import address from '../../../../public/static/profile/address.png'
import wallate from '../../../../public/static/profile/wallate.png'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const MenuBar = ({ tabData }) => {
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()

    const router = useRouter()

    const activeRoute = (routeName, currentRoute) => {
        return routeName === currentRoute ? true : false
    }

    return (
        <List>
            <Typography
                sx={{
                    padding: '0px 0px 30px 0px',
                    color: (theme) => theme.palette.neutral[1000],
                    fontSize: '26px',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginTop: '12px',
                }}
            >
                {t('Your Profile')}
            </Typography>
            {tabData.map((item, index) => {
                if (
                    (global?.customer_wallet_status === 0 && item.id === 4) ||
                    (global?.loyalty_point_status === 0 && item.id === 5) ||
                    (global?.ref_earning_status === 0 &&  item.id===6)
                ) {
                    return null
                } else {
                    return (
                        <Link
                            href={`${item.path}?title=${item.label}`}
                            style={{ textDecoration: 'none' }}
                            key={index}
                        >
                            <Grid container md={12} xs={12}>
                                <Grid md={12} xs={12}>
                                    <MenuItem
                                        selected={activeRoute(
                                            item.path,
                                            router.pathname
                                        )}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    theme.palette.primary.main,
                                            },
                                        }}
                                    >
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <img width="26px"
                                                    src={item.img.src}
                                                    alt={item.label}
                                                />{' '}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={t(
                                                    item.label.replaceAll(
                                                        '-',
                                                        ' '
                                                    )
                                                )}
                                            />
                                        </ListItem>
                                    </MenuItem>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </Link>
                    )
                }
            })}
        </List>
    )
}
export default MenuBar
