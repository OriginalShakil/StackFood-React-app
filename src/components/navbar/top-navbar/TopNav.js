import React, { useEffect, useRef, useState } from 'react'
import {
    alpha,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Box,
    Container,
    Button,
    Card,
    Typography,
    Link,
    ButtonBase,
    Avatar,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { styled, useTheme } from '@mui/material/styles'
import ReactCountryFlag from 'react-country-flag'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useSelector } from 'react-redux'
import { useTranslation, withTranslation } from 'react-i18next'
import { TopBarButton, CustomSwitch } from '../Navbar.style'
import Switch from '@mui/material/Switch'
import RoomIcon from '@mui/icons-material/Room'
import { useRouter } from 'next/router'
import {
    CustomColouredTypography,
    CustomStackForLoaction,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomCallTo from '../../CustomCallTo'
import { SignInButton } from '../../../styled-components/CustomButtons.style'
import ChatIcon from '@mui/icons-material/Chat'
import AuthModal from '../../auth'
import { AccountPopover } from '../AccountPopover'
import Toolbar from '@mui/material/Toolbar'
import CustomLogo from '../../CustomLogo'
import DrawerMenu from '../DrawerMenu'
import { StyledMenu } from './TopNav.style'
import ThemeSwitches from './ThemeSwitches'
import { useQuery } from 'react-query'
import AddressReselect from './address-reselect/AddressReselect'
import IconButton from '@mui/material/IconButton'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { useSettings } from '../../../contexts/use-settings'
import { toast } from 'react-hot-toast'
import CustomLanguage from '../../CustomLanguage'

const TopNav = (props) => {
    const { i18n, t } = useTranslation()
    const router = useRouter()
    const [modalFor, setModalFor] = useState('sign-in')
    const { userData } = useSelector((state) => state.user)
    const [language, setLanguage] = useState('')
    const [theme_mode, setThemeMode] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const anchorRef = useRef(null)

    const [openPopover, setOpenPopover] = useState(false)
    const handleOpenPopover = () => {
        setOpenPopover(true)
        setModalFor('sign-in')
    }
    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => {
        setOpen(false)
        setModalFor('sign-in')
    }

    const handleClosePopover = () => {
        setOpenPopover(false)
    }

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('language') || 'en')
        }
    }, [language])

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])

    const { global, token } = useSelector((state) => state.globalSettings)

    const businessLogo = global?.base_urls?.business_logo_url
    const customerbaseUrl = global?.base_urls?.customer_image_url
    // const handleClick = (event) => {
    //     // i18n.changeLanguage(language)
    //     setAnchorEl(event.currentTarget)
    // }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }
    const open = Boolean(anchorEl)

    const getValues = (settings) => ({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
            setThemeMode('light')
            // saveSettings({ ...values, theme: 'light' })
        } else {
            localStorage.setItem('mode', 'dark')
            setThemeMode('dark')
            // saveSettings({ ...values, theme: 'dark' })
        }
        window.location.reload()
    }
    // const handleLanguage = (ln) => {
    //     // setLanguage(ln)
    //     localStorage.setItem('language', ln)
    //     if (ln === 'ar') {
    //         // i18n.changeLanguage(ln)
    //         localStorage.setItem('direction', 'rtl')
    //         saveSettings({ ...values, direction: 'rtl' })
    //         // setLanguage(ln)
    //         toast.success(t('Language Changed Successfully.'))
    //         //handleClose?.()
    //     } else {
    //         // i18n.changeLanguage(ln)
    //         localStorage.setItem('direction', 'ltr')
    //         saveSettings({ ...values, direction: 'ltr' })
    //         //setLanguage(ln)
    //         toast.success(t('Language Changed Successfully.'))
    //         //handleClose?.()
    //     }
    //     window.location.reload()
    // }

    let location = undefined
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        location = localStorage.getItem('location')
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    const theme = useTheme()
    const handleAuthBasedOnRoute = () => {
        return (
            <>
                {!token ? (
                    <>
                        <SignInButton
                            onClick={handleOpenAuthModal}
                            variant="contained"
                        >
                            <CustomStackFullWidth
                                direction={
                                    languageDirection === 'rtl'
                                        ? 'row'
                                        : 'row-reverse'
                                }
                                alignItems="center"
                                spacing={1}
                            >
                                <CustomTypography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.whiteContainer.main,
                                    }}
                                >
                                    {t('Sign In')}
                                </CustomTypography>
                                <LockIcon fontSize="small" />
                            </CustomStackFullWidth>
                        </SignInButton>
                        <AuthModal
                            open={authModalOpen}
                            modalFor={modalFor}
                            setModalFor={setModalFor}
                            handleClose={handleCloseAuthModal}
                        />
                    </>
                ) : (
                    <>
                        <Box
                            align="center"
                            component={ButtonBase}
                            alignItem="center"
                            onClick={() => {
                                router.push('/chat')
                            }}
                        >
                            <IconButton>
                                <ChatIcon
                                    sx={{
                                        height: 25,
                                        width: 25,
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    }}
                                ></ChatIcon>
                            </IconButton>
                        </Box>
                        <Box
                            align="center"
                            ml={languageDirection !== 'rtl' && '.9rem'}
                            mr={languageDirection === 'rtl' && '.9rem'}
                            component={ButtonBase}
                            onClick={handleOpenPopover}
                            ref={anchorRef}
                            // sx={{
                            //     alignItems: 'center',
                            //     display: 'flex',
                            //     ml: 2,
                            // }}
                        >
                            <Avatar
                                sx={{
                                    height: 30,
                                    width: 30,
                                }}
                                src={`${customerbaseUrl}/${userData?.image}`}
                            ></Avatar>
                        </Box>

                        <AccountPopover
                            anchorEl={anchorRef.current}
                            onClose={handleClosePopover}
                            open={openPopover}
                        />
                    </>
                )}
            </>
        )
    }
    const handleLogoClick = () => {
        if (router.pathname === '/') {
            if (zoneid) {
                router.push('/home').then()
            } else {
                router.push('/').then()
            }
        } else {
            router.push('/home').then()
        }
    }

    return (
        <Card>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        borderRadius: '0',
                    }}
                >
                    <Stack
                        pt="10px"
                        pb="10px"
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                    >
                        <CustomStackForLoaction direction="row">
                            {location ? (
                                <AddressReselect location={location} />
                            ) : (
                                <>
                                    <img
                                        src={`${businessLogo}/${global?.logo}`}
                                        height="22px"
                                        width="auto"
                                        onClick={() => handleLogoClick()}
                                    />
                                </>
                            )}
                        </CustomStackForLoaction>
                        <Stack direction="row" spacing={2} justifyContent="end">
                            <ThemeSwitches
                                checked={theme_mode === 'light'}
                                handleThemeChangeMode={changeThemeMode}
                                themeMode={theme_mode}
                            />
                            <CustomCallTo phone={global?.phone}>
                                <TopBarButton
                                    size="small"
                                    variant="text"
                                    startIcon={
                                        <LocalPhoneIcon sx={{ ml: 1 }} />
                                    }
                                >
                                    <CustomColouredTypography
                                        color={theme.palette.neutral[600]}
                                    >
                                        {global?.phone}
                                    </CustomColouredTypography>
                                </TopBarButton>
                            </CustomCallTo>
                            <CustomLanguage />
                            {/*<TopBarButton*/}
                            {/*    // id="demo-customized-button"*/}
                            {/*    variant="text"*/}
                            {/*    size="small"*/}
                            {/*    aria-controls={*/}
                            {/*        open ? 'demo-customized-menu' : undefined*/}
                            {/*    }*/}
                            {/*    aria-haspopup="true"*/}
                            {/*    aria-expanded={open ? 'true' : undefined}*/}
                            {/*    disableElevation*/}
                            {/*    onClick={handleClick}*/}
                            {/*    startIcon={*/}
                            {/*        <ReactCountryFlag*/}
                            {/*            countryCode={*/}
                            {/*                language === 'en' ? 'US' : 'ae'*/}
                            {/*            }*/}
                            {/*            svg*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*    endIcon={*/}
                            {/*        <Stack color={theme.palette.neutral[1000]}>*/}
                            {/*            <KeyboardArrowDownIcon />*/}
                            {/*        </Stack>*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    <CustomColouredTypography*/}
                            {/*        color={theme.palette.neutral[600]}*/}
                            {/*        sx={{*/}
                            {/*            p: '0px 10px',*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {language === 'en' ? 'English' : 'Arabic'}*/}
                            {/*    </CustomColouredTypography>*/}
                            {/*</TopBarButton>*/}
                            {/*<StyledMenu*/}
                            {/*    id="demo-customized-menu"*/}
                            {/*    MenuListProps={{*/}
                            {/*        'aria-labelledby': 'demo-customized-button',*/}
                            {/*    }}*/}
                            {/*    anchorEl={anchorEl}*/}
                            {/*    open={open}*/}
                            {/*    onClose={handleClose}*/}
                            {/*>*/}
                            {/*    {global?.language?.map((lan, index) => (*/}
                            {/*        <MenuItem*/}
                            {/*            onClick={() => handleLanguage(lan.key)}*/}
                            {/*            disableRipple*/}
                            {/*            key={index}*/}
                            {/*            sx={{*/}

                            {/*                '&:hover': {*/}
                            {/*                    backgroundColor: 'primary.main',*/}
                            {/*                }}}*/}
                            {/*        >*/}
                            {/*            <ListItemIcon>*/}
                            {/*                <ReactCountryFlag*/}
                            {/*                    countryCode={*/}
                            {/*                        lan.key === 'en'*/}
                            {/*                            ? 'US'*/}
                            {/*                            : 'ae'*/}
                            {/*                    }*/}
                            {/*                    svg*/}
                            {/*                />*/}
                            {/*            </ListItemIcon>*/}
                            {/*            {lan.value}*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</StyledMenu>*/}
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    flexGrow: 0,
                                }}
                            >
                                {handleAuthBasedOnRoute()}
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                {!location && (
                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none',
                                alignItems: 'center',
                                gap: '10px',
                                flexDirection: 'row',
                                justifyContent: ' space-between ',
                            },
                            flexGrow: 1,
                        }}
                    >
                        {/* <Logo src={logoSm.src} /> */}
                        <Stack alignItems="center" justifyContent="center">
                            <CustomLogo
                                atlText="logo"
                                logoImg={`${businessLogo}/${global?.logo}`}
                                height="22px"
                                width="auto"
                            />
                        </Stack>
                        <Stack>
                            <DrawerMenu />
                        </Stack>
                    </Box>
                )}
            </Container>
        </Card>
    )
}
export default withTranslation()(TopNav)
