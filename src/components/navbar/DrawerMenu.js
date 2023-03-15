import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { CustomDrawer, ButtonContainer, SearchProduct } from './Navbar.style'
import CollapsableMenu from './CollapsableMenu'
import SearchIcon from '@mui/icons-material/Search'
import LockIcon from '@mui/icons-material/Lock'
import {
    Button,
    alpha,
    IconButton,
    InputBase,
    Paper,
    Typography,
    Grid,
    Stack,
    Container,
} from '@mui/material'
import AuthModal from '../auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { removeToken } from '../../redux/slices/global'
import { useTranslation } from 'react-i18next'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { CustomSwitch } from './Navbar.style'
import { CustomLink } from '../../styled-components/CustomStyles.style'
import {RTL} from "../RTL/RTL";
import Link from "next/link";
import CustomLanguage from "../CustomLanguage";
import {useGetCuisines} from "../../hooks/react-query/cuisines/useGetCuisines";

//import { SearchIconWrapper } from '../custom-search/CustomSearch.style';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))



const DrawerMenu = ({zoneid}) => {
    const [forSignup, setForSignup] = useState('')
    const [modalFor, setModalFor] = useState('sign-in')
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const [openDrawer, setOpenDrawer] = useState(false)
    // const [isLoggedIn, setLogin] = useState(false)
    const { token } = useSelector((state) => state.globalSettings)
    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = (page) => {
        setOpen(true)
        setForSignup(page)
    }

    const handleCloseAuthModal = () => {
        setOpen(false)
        setForSignup('sign-in')
    }
    const [enabled, setEnabled] = useState(true)
    const [theme_mode, setThemeMode] = useState('')
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token')
            dispatch(removeToken())
            setOpenDrawer(false)
            router.push('/')
        } catch (err) {
            //   toast.error('Unable to logout.');
        }
    }

    const toggleDrawer = (openDrawer) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }
        setOpenDrawer(openDrawer)
    }
    const searchKey = ''

    const {
        isLoading,
        data: categoryData,
        isError,
        error,
        refetch: categoryApiRefetch,
    } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        { enabled:false },
    )
    const {
        isLoading: vegLoading,
        data: popularRestuarants,
        isError: vegIsError,
        error: vegError,
        refetch: restaurantApiRefetch,
    } = useQuery(
        ['restaurants/popular'],
        () => RestaurantsApi?.popularRestaurants(),
        { enabled: false }
    )
    useEffect(()=>{
      if(zoneid){
          categoryApiRefetch()
          restaurantApiRefetch()
      }
    },[zoneid])
    const {data,refetch,isRefetching}=useGetCuisines()
    useEffect(()=>{
        refetch()
    },[])

    const collapsableMenu = {
        cat: {
            text: 'Categories',
            items: categoryData?.data.map((item) => item),
            path: '/category',
        },
        res: {
            text: 'Restaurants',
            items: popularRestuarants?.data?.map((i) => i),
            path: '/restaurant',
        },
        cuisine: {
            text: 'Cuisines',
            items: data?.Cuisines?.map((i) => i),
            path: '/cuisines',
        },
        profile: {
            text: 'Profile',
            // items: [
            //     { name: 'Personal Info',
            //         path:"/restaurant"
            //     },
            //     { name: 'Coupons' },
            //     { name: 'Wallets' },
            //     { name: 'Loyality Points' },
            //     { name: 'Your Address' },
            //     { name: 'Settings' },
            // ],
        },
    }
    let location = undefined
    if (typeof window !== 'undefined') {
        location = localStorage.getItem('location')
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('location')
    }
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    const changeThemeMode = (e) => {
        if (e.target.checked) {
            localStorage.setItem('mode', 'light')
        } else {
            localStorage.setItem('mode', 'dark')
        }
        window.location.reload()
    }
    const handleRoute = (path) => {
        router.push(`/${path}`)
        setOpenDrawer(false)
    }
  const gotoSettings=()=>{
      router.push("/customer/settings")
      setOpenDrawer(false)
  }

    const menuList = () => (
      <RTL direction={languageDirection}>
          <Box
              sx={{ width: 'auto' }}
              role="presentation"
              onKeyDown={toggleDrawer(false)}
          >
              {/*<SearchProduct variant="outlined">*/}
              {/*     <InputBase*/}
              {/*        sx={{ ml: 1, flex: 1 }}*/}
              {/*        placeholder="Search products here..."*/}
              {/*        inputProps={{*/}
              {/*            'aria-label': 'search google maps',*/}
              {/*        }}*/}
              {/*    />*/}
              {/*    <IconButton*/}
              {/*        type="submit"*/}
              {/*        sx={{ p: '10px', color: orangeColor }}*/}
              {/*        aria-label="search"*/}
              {/*    >*/}
              {/*        <SearchIcon />*/}
              {/*    </IconButton>*/}
              {/*</SearchProduct>*/}
              <List component="nav" aria-labelledby="nested-list-subheader">
                  <ListItemButton sx={{ marginTop:"20px",
                      '&:hover': {
                          backgroundColor: 'primary.main',
                      }}}>
                      <ListItemText
                          primary={t("Home")}
                          onClick={() => handleRoute('/home')}
                      />
                  </ListItemButton>
                  <CollapsableMenu
                      value={collapsableMenu.cat}
                      setOpenDrawer={setOpenDrawer}
                      toggleDrawers={toggleDrawer}
                      pathName="/categories"
                  />
                  <CollapsableMenu
                      value={collapsableMenu.res}
                      setOpenDrawer={setOpenDrawer}
                      toggleDrawers={toggleDrawer}
                      pathName="/restaurant"
                  />
                  <CollapsableMenu
                      value={collapsableMenu.cuisine}
                      setOpenDrawer={setOpenDrawer}
                      toggleDrawers={toggleDrawer}
                      pathName="/cuisines"
                  />
                  {/*<CollapsableMenu value={collapsableMenu.profile} setOpenDrawer={setOpenDrawer} toggleDrawers={toggleDrawer}/>*/}
                  <ListItemButton sx={{'&:hover': {
                          backgroundColor: 'primary.main',
                      }}}>
                      <ListItemText
                          primary={t('Profile')}
                          onClick={() => handleRoute('customer/profile')}
                      />
                  </ListItemButton>
                  <ListItemButton sx={{'&:hover': {
                          backgroundColor: 'primary.main',
                      }}}>
                      <ListItemText
                          primary={t('Favorites')}
                          onClick={() => handleRoute('wishlist')}
                      />
                  </ListItemButton>
                  {/*<ListItemButton>*/}
                  {/*    <ListItemText primary={t('Notifications')} />*/}
                  {/*</ListItemButton>*/}
                  <ListItemButton sx={{'&:hover': {
                          backgroundColor: 'primary.main',
                      }}}>
                      <ListItemText
                          primary={t('Terms & Conditions')}
                          onClick={() => handleRoute('terms-and-conditions')}
                      />
                  </ListItemButton>
                  <ListItemButton sx={{'&:hover': {
                          backgroundColor: 'primary.main',
                      }}}>
                      <ListItemText
                          primary={t('Privacy Policy')}
                          onClick={() => handleRoute('privacy-policy')}
                      />
                  </ListItemButton>

                  <Stack
                      direction="row"
                      justifyContent="space-between"
                      pl="15px"
                      pr="20px"
                  >
                      <Stack  sx={{cursor:'pointer'}} textAlign="left">
                          <CustomLanguage formMobileMenu="true"/>
                      </Stack>

                      <CustomSwitch
                          checked={theme_mode === 'light'}
                          onChange={changeThemeMode}
                      />
                  </Stack>

                  <ButtonContainer>
                      <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 3, mb: 1 }}
                          onClick={() => handleLogout()}
                      >
                          {t('Logout')}
                      </Button>
                  </ButtonContainer>
              </List>
          </Box>
      </RTL>
          )

          const withOutLogin = () => (
              <RTL direction={languageDirection}>
          <Box
              sx={{ width: 'auto' }}
              role="presentation"
              onKeyDown={toggleDrawer(false)}
          >
              <List component="nav" aria-labelledby="nested-list-subheader">
                  {location && (
                      <>
                          <ListItemButton sx={{ marginTop:"20px"}}>
                              <ListItemText
                                  primary={t("Home")}
                                  onClick={() => handleRoute('/home')}
                              />
                          </ListItemButton>
                          <CollapsableMenu  value={collapsableMenu.cat}
                                            setOpenDrawer={setOpenDrawer}
                                            toggleDrawers={toggleDrawer}
                                            pathName="/categories" />
                          <CollapsableMenu value={collapsableMenu.res}
                                           setOpenDrawer={setOpenDrawer}
                                           toggleDrawers={toggleDrawer}
                                           pathName="/restaurant"/>
                          <CollapsableMenu
                              value={collapsableMenu.cuisine}
                              setOpenDrawer={setOpenDrawer}
                              toggleDrawers={toggleDrawer}
                              pathName="/cuisines"
                          />
                          <ListItemButton onClick={() => handleRoute('terms-and-conditions')}>
                              <ListItemText primary={t("Terms & Conditions")} />
                          </ListItemButton>
                          <ListItemButton>
                              <ListItemText
                                  primary={t("Privacy Policy")}
                                  onClick={() => handleRoute('privacy-policy')}
                              />
                          </ListItemButton>

                          <Stack
                              direction="row"
                              justifyContent="space-between"
                              pl="15px"
                              pr="20px"
                          >
                              <Stack  sx={{cursor:'pointer'}} textAlign="left">
                                  <CustomLanguage formMobileMenu="true"/>
                              </Stack>

                              <CustomSwitch
                                  checked={theme_mode === 'light'}
                                  onChange={changeThemeMode}
                              />
                          </Stack>
                      </>
                  )}
              </List>
              <ButtonContainer>
                  <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, mb: 1 }}
                      startIcon={<LockIcon />}
                      onClick={() => handleOpenAuthModal('signing')}
                      //  onClick={() => setLogin(true)}
                  >
                      {t('Sign In')}
                  </Button>
              </ButtonContainer>
              <Typography align="center" mt="1rem">
                  {t('Don’t have account?')}
              </Typography>
              <ButtonContainer>
                  <Button
                      onClick={() => handleOpenAuthModal('signUp')}
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1, mb: 1 }}
                  >
                      {t('Sign Up')}
                  </Button>
              </ButtonContainer>
              {/*<Grid*/}
              {/*    container*/}
              {/*    spacing={2}*/}
              {/*    justifyContent="space-between"*/}
              {/*    alignItems="center"*/}
              {/*    p="1rem"*/}
              {/*>*/}
              {/*    <Grid item xs={12}>*/}
              {/*       */}
              {/*    </Grid>*/}
              {/*    /!*<Grid item xs={3}>*!/*/}
              {/*    /!*    <CustomSwitch*!/*/}
              {/*    /!*        checked={theme_mode === 'light'}*!/*/}
              {/*    /!*        onChange={changeThemeMode}*!/*/}
              {/*    /!*    />*!/*/}
              {/*    /!*</Grid>*!/*/}
              {/*</Grid>*/}
          </Box>
              </RTL>
    )

    return (
        <Container maxWidth="lg" disableGutters={true}>
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    handleClose={handleCloseAuthModal}
                    forSignup={forSignup}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                />
            )}
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(!openDrawer)}
                sx={{ color: theme=>theme.palette.primary.main,paddingRight:"0px",paddingLeft:languageDirection==="rtl" && "0px" }}
            >
                <MenuIcon />
            </IconButton>
            <CustomDrawer
                anchor="top"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                {token ? menuList() : withOutLogin()}
            </CustomDrawer>
            {/* <AuthModal/> */}
        </Container>
    )
}

export default DrawerMenu
