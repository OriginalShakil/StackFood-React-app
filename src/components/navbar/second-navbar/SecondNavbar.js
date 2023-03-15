import React, { useRef } from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { Stack } from '@mui/material'
import DrawerMenu from '../DrawerMenu'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { ConfigApi } from '../../../hooks/react-query/config/useConfig'
import { setGlobalSettings } from '../../../redux/slices/global'
import LogoSide from './LogoSide'
import NavLinks from './NavLinks'
import Wishlist from './Wishlist'
import ManageSearch from './ManageSearch'

const SecondNavbar = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch()
    const anchorEl = useRef()
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['config'],
        ConfigApi.config
    )
    if (data) {
        dispatch(setGlobalSettings(data))
    }
    const { global, token } = useSelector((state) => state.globalSettings)
    let zoneid = undefined
    let location = undefined
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
        languageDirection = localStorage.getItem('direction')
        location = localStorage.getItem('location')
    }

    return (
        <>
            {location && (
                <>
                    <Container maxWidth="lg" >
                        <Toolbar disableGutters={true}>
                            <CustomStackFullWidth
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={2}
                                >
                                    <LogoSide global={global} width="auto" />
                                    {!isSmall && (
                                        <NavLinks
                                            languageDirection={
                                                languageDirection
                                            }
                                            t={t}
                                            zoneid={zoneid}
                                        />
                                    )}
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {!isSmall && (
                                        <ManageSearch
                                            zoneid={zoneid}
                                            router={router}
                                            token={token}
                                        />
                                    )}
                                    {token &&
                                        router.pathname !== '/' &&
                                        !isSmall && <Wishlist />}
                                    {isSmall && <DrawerMenu zoneid={zoneid} />}
                                </Stack>
                            </CustomStackFullWidth>
                        </Toolbar>
                    </Container>
                </>
            )}
        </>
    )
}
export default SecondNavbar
