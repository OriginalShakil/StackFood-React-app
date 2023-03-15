import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
} from '../CheckOut.style'
import { getAmount } from '../../../utils/customFunctions'
import { useSelector } from 'react-redux'
import { ImageSource } from '../../../utils/ImageSource'
import CustomImageContainer from "../../CustomImageContainer";
import {Box} from "@mui/system";

const CampaignOrders = ({ global }) => {
    const { campFoodList } = useSelector((state) => state.cart)
    const productBaseUrl = global?.base_urls?.campaign_image_url
    const languageDirection = localStorage.getItem('direction')
    return (
        <>
            {campFoodList.map((item) => (
                <Grid container md={12} xs={12} spacing={{ xs: 1 }}>
                    <Grid item md={4} xs={4}>

                            <CustomImageContainer
                                height="90px"
                                width="90px"
                                src={ImageSource(productBaseUrl, item.image)}
                                loading="lazy"
                                borderRadius="10px"
                            />
                        {/*<img*/}
                        {/*    height="90px"*/}
                        {/*    width="90px"*/}
                        {/*    src={ImageSource(productBaseUrl, item.image)}*/}
                        {/*    loading="lazy"*/}
                        {/*    className="img-border"*/}
                        {/*/>*/}
                    </Grid>
                    <Grid item md={8} xs={8} paddingRight={languageDirection==="rtl" && "10px"}>
                        <OrderFoodName>{item.name}</OrderFoodName>
                        <OrderFoodSubtitle>
                            Qty : {item.quantity}
                        </OrderFoodSubtitle>
                        <OrderFoodAmount>
                            {getAmount(item.price)}
                        </OrderFoodAmount>
                    </Grid>
                </Grid>
            ))}
        </>
    )
}

CampaignOrders.propTypes = {}

export default CampaignOrders
