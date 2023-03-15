import {Stack, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import Link from 'next/link'
import CustomImageContainer from "../CustomImageContainer";
import {useSelector} from "react-redux";
import {restaurantDiscountTag} from "../../utils/customFunctions";
import {NewTypography} from "../food-card/FoodCard.style";
import {useTheme} from "@mui/material/styles";
import {t} from "i18next";

const RestaurantCard = (props) => {
    const theme=useTheme()
    const { global } = useSelector((state) => state.globalSettings)

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const restaurantLogo = `${props?.restaurantImageUrl}/${props?.image}`
    const id = props?.id

    const languageDirection = localStorage.getItem('direction')

    const restaurantCloseHandler = () => {
        if (props.active) {
            if (props.open === 0) {
                return (
                    <Stack
                        sx={{

                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: (theme) =>
                                theme.palette.primary.overLay,
                            opacity: '0.5',
                            color: theme=>theme.palette.neutral[100],
                            padding: '10px',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius:".5rem"
                        }}
                    >
                        <Typography variant="h4" align="center" color={theme.palette.neutral[100]}>
                            {t('Closed Now')}
                        </Typography>
                    </Stack>
                )
            }
        } else {
            return (
                <Stack
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: (theme) => theme.palette.primary.overLay,
                        opacity: '0.5',
                        color: theme=>theme.palette.neutral[100],
                        padding: '10px',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius:"8px"
                    }}
                >
                    <Typography variant="h4" align="center" color={theme.palette.neutral[100]}>
                        {t('Closed Now')}
                    </Typography>
                </Stack>
            )
        }
    }
    return (
        <Link href={`/restaurant/${id}`} passHref>
            <Box className="cardpopular" sx={{ cursor: 'pointer' }}>

                {restaurantDiscountTag (props.restaurantDiscount,props.freeDelivery) && <NewTypography languageDirection={languageDirection}>{restaurantDiscountTag(props.restaurantDiscount,props.freeDelivery, currencySymbolDirection,
                    currencySymbol,
                    digitAfterDecimalPoint)}</NewTypography>}
               <Stack sx={{position:"relative"}}>

                 <CustomImageContainer src={restaurantLogo} alt={props?.name} maxWidth="120px" smWidth="80px" height= "120px" smHeight="80px" objectFit="contained" borderRadius=".7rem"/>
                   {restaurantCloseHandler()}
               </Stack>

                {/*<img className="PopularRes_img" src={restaurantLogo} alt={props?.name} />*/}
                <Typography>
                    {props.discount ? props.discount.discount :''}
                </Typography>
                <Box>
                    <Typography variant="h5">{props?.name}</Typography>
                    <Typography sx={{ fontSize: '14px', color:theme=>theme.palette.neutral[400], overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical", }}  >
                        {props?.address}
                    </Typography>
                    <Typography >
                        {props?.rating.toFixed(1)} {" "}
                        <StarIcon sx={{ width: '16px', color:theme=>theme.palette.primary.main }} />
                    </Typography>
                    <br />

                </Box>
            </Box>
        </Link>
    )
}

export default RestaurantCard
