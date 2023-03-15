import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import {
    Box,
    Button,
    Grid,
    IconButton,
    styled,
    Typography,
} from '@mui/material'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
    OrderSummaryGrid,
} from '../../components/checkout-page/CheckOut.style'
import { CustomTypographyBold } from '../../styled-components/CustomStyles.style'
import delivery from '../../../public/static/bannerslider/delivery.png'
import {
    getAmount,
    getSelectedAddOn,
    getTotalPrice,
    getVariation,
} from '../../utils/customFunctions'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    decrementProductQty,
    incrementProductQty,
    removeProduct,
} from '../../redux/slices/cart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import CustomImageContainer from "../CustomImageContainer";

const CustomDrawerCart = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setDrawerOpen] = useState(false)
    const { cartList } = useSelector((state) => state.cart)
    const { global, token } = useSelector((state) => state.globalSettings)

    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = () => setOpen(true)
    const handleCloseAuthModal = () => setOpen(false)


    const {
        isLoading,
        data: restaurantData,
        isError,
        error,
        refetch,
    } = useQuery([`restaurant-details`], () =>
        RestaurantsApi.restaurantDetails(cartList[0].restaurant_id)
    )


    const DrawerHeader = styled('div')(({ theme }) => ({
        marginTop: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }))

    const handleCheckout = () => {
        if (token) {
            router.push('/checkout')
            setDrawerOpen(false)
        } else {
            handleOpenAuthModal()
        }
    }
    useEffect(() => {
        refetch()
    }, [])
    return (
        <>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setDrawerOpen(false)}
            >
                <DrawerHeader />
                {cartList.length === 0 ? (
                    <Box>
                        <OrderSummaryGrid sx={{ width: 370 }} container item>
                            <Box sx={{ overflow: 'auto', width: '100%' }}>
                                <CustomTypographyBold align="center">
                                    Cart is Empty
                                </CustomTypographyBold>
                            </Box>
                        </OrderSummaryGrid>
                    </Box>
                ) : (
                    <>
                        <OrderSummaryGrid sx={{ width: 370 }} container item>
                            <Box sx={{ overflow: 'auto', width: '100%' }}>
                                <Grid
                                    item
                                    md={12}
                                    lg={12}
                                    xs={12}
                                    sx={{ padding: '0px 0px 24px 0px' }}
                                >
                                    <Typography
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: '#EF7822',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {cartList?.length} items
                                        </span>{' '}
                                        in your cart
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <img
                                            src={delivery.src}
                                            loading="lazy"
                                        />
                                        <span
                                            style={{
                                                color: '#9B9B9B',
                                                marginLeft: '10px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {
                                                restaurantData?.data
                                                    ?.delivery_time
                                            }
                                            min
                                        </span>
                                    </Typography>
                                </Grid>
                                <Grid
                                    container
                                    md={12}
                                    xs={12}
                                    spacing={{ xs: 1 }}
                                >
                                    {cartList?.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <Grid item md={4} xs={4}>
                                                <CustomImageContainer  height="90px"
                                                                       width="90px"
                                                                       src={`${item.image}`}/>
                                                {/*<img*/}
                                                {/*    height="90px"*/}
                                                {/*    width="90px"*/}
                                                {/*    src={`${item.image}`}*/}
                                                {/*    loading="lazy"*/}
                                                {/*/>*/}
                                            </Grid>
                                            <Grid item md={8} xs={8}>
                                                <Grid
                                                    container
                                                    md={12}
                                                    xs={12}
                                                    spacing={{ xs: 1 }}
                                                >
                                                    <Grid item md={12} xs={12}>
                                                        <OrderFoodName>
                                                            {item.name}
                                                        </OrderFoodName>
                                                        {item?.variation
                                                            ?.length > 0 && (
                                                            <OrderFoodSubtitle>
                                                                Variation :
                                                                {getVariation(
                                                                    item?.variation
                                                                )}
                                                            </OrderFoodSubtitle>
                                                        )}
                                                        {item?.add_ons?.length >
                                                            0 && (
                                                            <OrderFoodSubtitle>
                                                                Addon :
                                                                {getSelectedAddOn(
                                                                    item?.add_ons
                                                                )}
                                                            </OrderFoodSubtitle>
                                                        )}
                                                    </Grid>
                                                    <Grid item md={6} xs={6}>
                                                        <OrderFoodAmount>
                                                            {getAmount(
                                                                item.price -
                                                                    item.discount_amount
                                                            )}
                                                        </OrderFoodAmount>
                                                    </Grid>
                                                    <Grid md={6} xs={6}>
                                                        {item?.quantity ===
                                                        1 ? (
                                                            <IconButton
                                                                aria-label="delete"
                                                                size="small"
                                                                color="error"
                                                            >
                                                                <DeleteIcon
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            removeProduct(
                                                                                {
                                                                                    ...item,
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                    fontSize="inherit"
                                                                />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton
                                                                aria-label="delete"
                                                                size="small"
                                                            >
                                                                <RemoveIcon
                                                                    size="small"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            decrementProductQty(
                                                                                {
                                                                                    ...item,
                                                                                }
                                                                            )
                                                                        )
                                                                    }
                                                                    //onClick={decrementPrice}
                                                                />
                                                            </IconButton>
                                                        )}
                                                        {item?.quantity}
                                                        <IconButton
                                                            aria-label="delete"
                                                            size="small"
                                                        >
                                                            <AddIcon
                                                                size="small"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        incrementProductQty(
                                                                            {
                                                                                ...item,
                                                                            }
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Box>
                        </OrderSummaryGrid>
                        <Grid item container md={12} lg={12} xs={12}>
                            <Grid item md={12} lg={12} xs={12}>
                                <Button variant="text" fullWidth size="large">
                                    Total Price $ {getTotalPrice(cartList)}
                                </Button>
                                <div style={{ padding: '0 10px' }}>
                                    <Button
                                        onClick={handleCheckout}
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                    >
                                        Checkout
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Drawer>
        </>
    )
}
export default CustomDrawerCart
