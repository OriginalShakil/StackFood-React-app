import React from 'react'
import Link from 'next/link'
import { Badge, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'

const Wishlist = () => {
    const { wishLists } = useSelector((state) => state.wishList)
    return (
        <>
            {/*<Notifications />*/}
            <Link href="/wishlist">
                <IconButton>
                    <Badge
                        color="primary"
                        variant="dot"
                        overlap="circular"
                        invisible={
                            wishLists === undefined ||
                            (wishLists?.food?.length === 0 &&
                                wishLists.restaurant.length === 0)
                        }
                    >
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
            </Link>
        </>
    )
}

export default Wishlist
