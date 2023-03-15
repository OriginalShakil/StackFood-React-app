import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { PrimaryButton } from '../products-page/FoodOrRestaurant'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import MenuBar from './customer-layout/MenuBar'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'

const SideDrawerForProfile = ({ tabData }) => {
    const theme = useTheme()
    const router = useRouter()
    const { title } = router.query
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    React.useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    return (
        <>
            {languageDirection && (
                <>
                    <Grid item xs={2}>
                        <PrimaryButton
                            variant="outlined"
                            onClick={() => setSideDrawerOpen(true)}
                        >
                            <MenuIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            />
                        </PrimaryButton>
                        <CustomSideDrawer
                            open={sideDrawerOpen}
                            onClose={() => setSideDrawerOpen(false)}
                            anchor={
                                languageDirection === 'rtl' ? 'right' : 'left'
                            }
                        >
                            <MenuBar tabData={tabData} />
                        </CustomSideDrawer>
                    </Grid>
                    <Grid justifySelf="flex-end" item xs={10}>
                        <Typography
                            variant="h3"
                            color={theme.palette.primary.main}
                            align="center"
                        >
                            {title && title.replaceAll('-', ' ')}
                        </Typography>
                    </Grid>
                </>
            )}
        </>
    )
}
export default SideDrawerForProfile
