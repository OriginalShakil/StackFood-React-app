import {Box, Container, CssBaseline, Grid, Stack} from '@mui/material'
import React, {useEffect} from 'react'

import {CustomPaperBigCard} from "../../styled-components/CustomStyles.style";
import {useGetCuisines} from "../../hooks/react-query/cuisines/useGetCuisines";
import CustomPageTitle from "../CustomPageTitle";

import CuisinesCard from "../home/cuisines/CuisinesCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomShimmerCategories from "../CustomShimmer/CustomShimmerCategories";

const AllCuisines = () => {
    const matches = useMediaQuery('(max-width:1180px)')
    const {data,isLoading,refetch,isRefetching}=useGetCuisines()
    useEffect(()=>{
        refetch()
    },[])
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '30px' },mt:{xs: "0px", md: "150px"}}} >
                <CustomPaperBigCard>
                    <Box minHeight="40vh">
                        <Grid
                            container

                            spacing={{ xs: 1, md: 4, lg: 4 }}
                            mb="30px"

                        >
                            <Grid item xs={12} sm={12}  md={12} justify="center">
                                <CustomPageTitle title="Cuisines" />
                            </Grid>
                            {data?.Cuisines?.map((item,index) => (
                                <Grid item md={matches ? 2 : 1.5} sm={3} xs={3} mt=".5rem">
                                    <CuisinesCard item={item} key={index}/>
                                </Grid>
                            ))}
                            {isLoading &&  (
                               <Stack justifyContent="center" alignItems="flex-start" paddingX="20px">
                                   <CustomShimmerCategories   noSearchShimmer="true"
                                                              itemCount="14"
                                                              smItemCount="5"/>
                               </Stack>
                            )}
                            {/*{isRefetching &&(<Stack justifyContent="center" alignItems="center">*/}
                            {/*    <CustomShimmerCategories   noSearchShimmer="true"*/}
                            {/*                               itemCount="9"*/}
                            {/*                               smItemCount="5"/>*/}
                            {/*</Stack>)}*/}
                        </Grid>
                    </Box>
                </CustomPaperBigCard>
            </Container>
        </>
    )
}

export default AllCuisines