import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
    Box,
    CircularProgress,
    Grid,
    styled,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import { Dropdown } from 'react-bootstrap'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import { useSelector } from 'react-redux'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useTranslation } from 'react-i18next'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'

const ResturantList = ({ restaurantType }) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const restaurantCoverUrl = global?.base_urls?.restaurant_cover_photo_url
    const [type, setType] = useState('all')
    const orangeColor = '#EF7822'
    const orangeColor2 = '#ff903f'
    const PrimaryButton = styled(Button)(({ theme }) => ({
        color: '#fff',
        backgroundColor: orangeColor,
        '&:hover': {
            backgroundColor: orangeColor2,
        },
    }))
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alignment, setAlignment] = React.useState('web')

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    const { isLoading, data, isError, error, refetch } = useQuery(
        [`restaurant-list`, restaurantType],
        () => RestaurantsApi.typeWiseRestaurantList({ restaurantType, type })
    )

    useEffect(async () => {
        await refetch()
    }, [type])

    return (
        <Box>
            {/* <Grid
                item
                container
                md={12}
                lg={12}
                xs={12}
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                <Grid
                    item
                    md={12}
                    lg={12}
                    xs={12}
                    sx={{ padding: '10px 0px', background: '#F3F5F9' }}
                >
                    <Typography sx={{ textAlign: 'center', color: ' #4B566B' }}>
                        Search result for{' '}
                        <span style={{ color: '#EF7822' }}>"Asian food"</span>{' '}
                        25 food found{' '}
                    </Typography>
                </Grid>
            </Grid> */}
            {/* <Grid
                item
                container
                md={12}
                lg={12}
                xs={12}
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                <Grid
                    item
                    md={12}
                    lg={12}
                    xs={12}
                    sx={{
                        padding: '20px 0px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                    }}
                >
                    <Button
                        sx={{
                            background: '#F3F5F9',
                            color: 'black',
                            width: '179px',
                        }}
                    >
                        {t('Food')}
                    </Button>
                    <PrimaryButton sx={{ color: 'white', width: '179px' }}>
                        {t('Resturant')}
                    </PrimaryButton>
                </Grid>
            </Grid> */}

            <Grid
                container
                item
                md={12}
                lg={12}
                xs={12}
                spacing={{ xs: 2, md: 3 }}
                sx={{ padding: '20px 0px' }}
            >
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                    >
                        <GroupButtons setType={setType} type={type} />
                    </CustomStackFullWidth>
                </Grid>
            </Grid>

            <Grid item container spacing={{ xs: 2, md: 2 }} rowGap="30px">
                {data ? (
                    <>
                        {data?.data?.map((resturant) => {
                            return (
                                <Grid item xs={4} sm={3} md={1.5}>
                                    <RestaurantBoxCard
                                        image={resturant?.logo}
                                        name={resturant?.name}
                                        rating={resturant?.avg_rating}
                                        restaurantImageUrl={
                                            global?.base_urls
                                                ?.restaurant_image_url
                                        }
                                        id={resturant?.id}
                                        active={resturant?.active}
                                        open={resturant?.open}
                                        restaurantDiscount={resturant?.discount}
                                        freeDelivery={resturant?.free_delivery}
                                    />
                                </Grid>
                            )
                        })}
                    </>
                ) : (
                    <CustomShimmerRestaurant />
                )}
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '30px 0px 70px 0px',
                }}
            ></Box>
        </Box>
    )
}

export default ResturantList
