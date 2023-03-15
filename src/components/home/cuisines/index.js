import React, {useEffect, useRef} from 'react';
import {CustomStackFullWidth, CustomViewAll, SliderCustom} from "../../../styled-components/CustomStyles.style";
import CustomShimmerCategories from "../../CustomShimmer/CustomShimmerCategories";
import {Grid, Stack, Typography} from "@mui/material";
import {CustomTypography} from "../../custom-tables/Tables.style";
import {t} from "i18next";
import {useRouter} from "next/router";
import {useGetCuisines} from "../../../hooks/react-query/cuisines/useGetCuisines";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-multi-carousel/lib/styles.css'
import CuisinesCard from "./CuisinesCard";
import {settings} from "./SliderSettings";


const Cuisines = () => {
    const router=useRouter()
    const sliderRef = useRef(null);
    const {data,isLoading,refetch,isRefetching}=useGetCuisines()
    useEffect(()=>{
        refetch()
    },[])


    return (
        <>
            {isLoading? (<CustomShimmerCategories   noSearchShimmer="true"
                                                    itemCount="10"
                                                    smItemCount="5"/>):(
                data?.Cuisines?.length >0 && (
                    <Grid container>
                        <Grid item xs={12} md={12}>

                            <CustomStackFullWidth direction="row"
                                                  alignItems="center"
                                                  justifyContent="space-between"
                                                  padding="0px 10px"
                            >
                                <CustomTypography variant="h3" fontWeight="700">
                                    {t('Cuisines')}
                                </CustomTypography>
                                <CustomViewAll
                                    variant="text"
                                    onClick={() => router.push('/cuisines')}
                                >
                                    {t('View all')}
                                </CustomViewAll>

                            </CustomStackFullWidth>
                        </Grid>
                        {data && data?.Cuisines?.length > 0 && (
                            <Grid item xs={12} md={12}>
                                <Slider {...settings} ref={sliderRef} className="slick__slider">
                                    {data?.Cuisines?.map((item,index)=>{
                                        return(
                                            <CuisinesCard item={item} key={index}/>
                                        )
                                    })}
                                </Slider>
                            </Grid>
                        )}

                    </Grid>
                )
            )}
        </>
    );
};

export default Cuisines;
