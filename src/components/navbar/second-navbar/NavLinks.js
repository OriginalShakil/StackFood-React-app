import React, { useState } from 'react'
import { Stack } from '@mui/material'
import Link from 'next/link'
import { NavLinkStyle } from '../Navbar.style'
import NavCatagory from '../NavCatagory'
import NavResturant from '../NavResturant'
import NavCuisines from "../NavCuisines";



const NavLinks = ({ zoneid, t, languageDirection }) => {
    const [openCategoryModal, setCategoryModal] = useState(false)
    const [openRestaurantModal, setRestaurantModal] = useState(false)
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {zoneid && (
                <>
                    <Link href="/home">
                        <NavLinkStyle
                            underline="none"
                            languageDirection={languageDirection}
                            sx={{ cursor: 'pointer' }}
                        >
                            {t('Home')}
                        </NavLinkStyle>
                    </Link>
                    <NavCatagory
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                    />
                    <NavCuisines
                        openModal={openCategoryModal}
                        setModal={setCategoryModal}
                        setRestaurantModal={setRestaurantModal}
                    />

                    <NavResturant
                        openModal={openRestaurantModal}
                        setModal={setRestaurantModal}
                        zoneid={zoneid}
                    />
                </>
            )}
        </Stack>
    )
}

NavLinks.propTypes = {}

export default NavLinks
