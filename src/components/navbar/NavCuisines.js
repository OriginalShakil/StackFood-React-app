import React, {useEffect, useState} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {
    Button, Grid, ListItemIcon, Menu, MenuItem, Stack, Typography,
} from '@mui/material'

import Fade from '@mui/material/Fade'
import Link from 'next/link'
//import menu from '../../../public/static/Menu/image 18.png'
import {CategoryApi} from '../../hooks/react-query/config/categoryApi'
import {useQuery} from 'react-query'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import {NavMenuLink} from './Navbar.style'
import {useTranslation} from 'react-i18next'
import ResShimmer from './ResShimmer'
import {useTheme} from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import {CustomTypographyGray} from '../error/Errors.style'
import {useGetCuisines} from "../../hooks/react-query/cuisines/useGetCuisines";
import NavCuisinesList from "../cuisines-page/NavCuisinesList";

const NavCuisines = ({openModal, setModal, setRestaurantModal}) => {
    const theme = useTheme()
    const [fakeData, setFakeData] = useState([])
    const {t} = useTranslation()
    // test mneu drop down start
    const router = useRouter()
    const {global} = useSelector((state) => state.globalSettings)

    const cuisinesImageUrl = `${global?.base_urls?.cuisine_image_url}`

    // const [dropdown, setDropdown] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [enabled, setEnabled] = useState(false)

    const opendrop = Boolean(anchorEl)
    const searchKey = ''

    const {data, isLoading, refetch, isRefetching} = useGetCuisines()
    useEffect(() => {
        refetch()
    }, [])
    // }
    const handledropClick = (event) => {
        setAnchorEl(event.currentTarget)
        setEnabled(true)
        setRestaurantModal(false)
    }
    const handledropClose = () => {
        setAnchorEl(null)
        setEnabled(false)
    }
    const handleClick = () => {
        router.push('/cuisines')
        handledropClose()
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (<>
            <NavMenuLink
                id="fade-button"
                aria-controls={opendrop ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={opendrop ? 'true' : undefined}
                onMouseEnter={(e) => handledropClick(e)}
                onClick={handledropClick}
                // sx={{ color: 'black',  }}
                // href="#"
                underline="none"
            >
                {t('Cuisines')} <KeyboardArrowDownIcon/>
            </NavMenuLink>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={opendrop}
                onClose={handledropClose}
                TransitionComponent={Fade}
                sx={{
                    top: '14px',
                }}
            >
                <Stack width="420px">
                    <Grid container p="1rem" spacing={1}>
                        {data?.Cuisines?.length > 12 ? <>
                            {
                                data?.Cuisines?.slice(0,12)?.map((item,index)=>{
                                    return <>
                                        {
                                            index%2===0 ? <Grid item md={6} key={item?.id}>
                                                <NavCuisinesList item={item} handledropClose={handledropClose} cuisinesImageUrl={cuisinesImageUrl}/>
                                            </Grid> : <Grid item md={6} key={item?.id}><NavCuisinesList item={item} handledropClose={handledropClose} cuisinesImageUrl={cuisinesImageUrl}/> </Grid>
                                        }
                                    </>
                                })
                            }
                        </> : <>
                            {
                                data?.Cuisines?.map((item,index)=>{
                                    return <>
                                        {
                                            index%2===0 ? <Grid item md={6} key={item?.id}>
                                                <NavCuisinesList item={item} handledropClose={handledropClose} cuisinesImageUrl={cuisinesImageUrl}/>
                                            </Grid> : <Grid item md={6} key={item?.id}><NavCuisinesList item={item} handledropClose={handledropClose} cuisinesImageUrl={cuisinesImageUrl}/> </Grid>
                                        }
                                    </>
                                })
                            }

                        </>}
                    </Grid>
                    {data?.Cuisines?.length > 0 && (<Grid
                        container
                        md={12}
                        justifyContent="center"
                        alignItems="center"
                        p=".8rem"
                    >
                        <Button
                            sx={{
                                background: (theme) => theme.palette.primary.main,
                                color: (theme) => theme.palette.neutral[100],
                                padding: '9px 25px',
                                borderRadius: '5px',
                                '&:hover': {
                                    background: (theme) => theme.palette.primary.dark,
                                },
                            }}
                            size="medium"
                            onClick={handleClick}
                        >
                            {t('View all')}
                        </Button>
                    </Grid>)}
                </Stack>
            </Menu>
        </>
    )}

export default NavCuisines
