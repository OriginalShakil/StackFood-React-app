import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import {
    Button,
    Grid,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material'

import Fade from '@mui/material/Fade'
import Link from 'next/link'
//import menu from '../../../public/static/Menu/image 18.png'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { NavMenuLink } from './Navbar.style'
import { useTranslation } from 'react-i18next'
import ResShimmer from './ResShimmer'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypographyGray } from '../error/Errors.style'

const NavCatagory = ({ openModal, setModal, setRestaurantModal }) => {
    const theme = useTheme()
    const [fakeData, setFakeData] = useState([])
    const { t } = useTranslation()
    // test mneu drop down start
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)

    const catImageUrl = `${global?.base_urls?.category_image_url}`

    // const [dropdown, setDropdown] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [enabled, setEnabled] = useState(false)

    const opendrop = Boolean(anchorEl)
    const searchKey = ''

    const {
        isLoading,
        data: categoryData,
        isError,
        error,
        // refetch: placeApiRefetch,
    } = useQuery(
        ['category'],
        () => CategoryApi.categories(searchKey),
        { enabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    // if (categoryData) {

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
        router.push('/categories')
        handledropClose()
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
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
                {t('Categories')} <KeyboardArrowDownIcon />
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
                    <Grid container p="1rem" spacing={5}>
                        {categoryData ? (
                            <>
                                <Grid item md={6}>
                                    {categoryData?.data
                                        ?.slice(0, 6)
                                        ?.map((category, index) => {
                                            return (
                                                <Link
                                                    href={{ pathname: `/category/${category.id}`, query: { name:category?.name } }}
                                                >
                                                    <MenuItem
                                                        key={index}
                                                        onClick={
                                                            handledropClose
                                                        }
                                                        sx={{
                                                            alignItems:
                                                                'center',
                                                            gap: '5px',
                                                            borderRadius: '5px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    (theme) =>
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .main,
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <CustomImageContainer
                                                                src={`${catImageUrl}/${category.image}`}
                                                                width="35px"
                                                                height="35px"
                                                                loading="lazy"
                                                            />
                                                        </ListItemIcon>
                                                        <Typography
                                                            variant="h5"
                                                            fontWeight="400"
                                                            color={
                                                                theme.palette
                                                                    .neutral[1000]
                                                            }
                                                        >
                                                            {category.name}
                                                        </Typography>
                                                        <CustomTypographyGray
                                                            variant="h5"
                                                            nodefaultfont="true"
                                                        >
                                                            (
                                                            {
                                                                category.products_count
                                                            }
                                                            )
                                                        </CustomTypographyGray>
                                                    </MenuItem>
                                                </Link>
                                            )
                                        })}
                                </Grid>
                            </>
                        ) : (
                            <ResShimmer />
                        )}

                        {categoryData ? (
                            <>
                                <Grid item md={6}>
                                    {categoryData?.data
                                        ?.slice(-6)
                                        ?.map((category, index) => {
                                            return (
                                                <Link
                                                    href={`/category/${category.id}`}
                                                >
                                                    <MenuItem
                                                        key={index}
                                                        onClick={
                                                            handledropClose
                                                        }
                                                        sx={{
                                                            alignItems:
                                                                'center',
                                                            gap: '5px',
                                                            borderRadius: '5px',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    (theme) =>
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .main,
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <CustomImageContainer
                                                                src={`${catImageUrl}/${category.image}`}
                                                                width="35px"
                                                                loading="lazy"
                                                            />
                                                        </ListItemIcon>
                                                        <Typography
                                                            variant="h5"
                                                            fontWeight="400"
                                                            color={
                                                                theme.palette
                                                                    .neutral[1000]
                                                            }
                                                        >
                                                            {category.name}
                                                        </Typography>
                                                        <CustomTypographyGray
                                                            variant="h5"
                                                            nodefaultfont="true"
                                                        >
                                                            (
                                                            {
                                                                category.products_count
                                                            }
                                                            )
                                                        </CustomTypographyGray>
                                                    </MenuItem>
                                                </Link>
                                            )
                                        })}
                                </Grid>
                            </>
                        ) : (
                            <ResShimmer />
                        )}
                        {/*{categoryData?.data.length === 0 && (*/}
                        {/*    <>*/}
                        {/*        <CustomEmptyBox />*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </Grid>
                    {categoryData?.data.length > 0 && (
                        <Grid
                            container
                            md={12}
                            justifyContent="center"
                            alignItems="center"
                            p=".8rem"
                        >
                            <Button
                                sx={{
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        theme.palette.neutral[100],
                                    padding: '9px 25px',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                }}
                                size="medium"
                                onClick={handleClick}
                            >
                                {t('View all')}
                            </Button>
                        </Grid>
                    )}
                </Stack>
            </Menu>
        </>
    )
}

export default NavCatagory
