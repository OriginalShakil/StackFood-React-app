import React from "react"
import {Grid,Skeleton,Stack} from "@mui/material"
import CustomShimmerRestaurant from "../../CustomShimmer/CustomShimmerRestaurant";
import {RatingStarIcon, RatingWrapTypography} from "../../food-card/FoodCard.style";
import CustomShimmerCard from "../../CustomShimmer/CustomShimmerForCard";
import CustomShimmerForCard from "../../CustomShimmer/CustomShimmerForCard";

   const TopSection=()=>{
       return  (
           <>
               <Grid container
                     className="margin-top-bottom-20"
                     rowSpacing={1}
                     columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                   <Grid item xs={12} md={6}>
                       <Skeleton variant="rectangular"
                                 width="100%"
                                 height={300}
                           />
                   </Grid>
                   <Grid item xs={12} md={6}>
                     <Grid container gap='10px'>
                         <Grid item md={3}>
                             <Skeleton variant="rectangular"
                                       width="100%"
                                       height={150}
                             />
                         </Grid>
                         <Grid item md={6} >
                              <Skeleton  variant="text"
                              width="100%"
                              height={20}
                              />
                             <Skeleton
                                 variant="text"
                                 width={300}
                                 height={20}
                             />
                             <Grid container justifyContent="space-between">
                                 <Grid item md={10} spacing={1}>
                                     <Skeleton
                                         variant="text"
                                         width={100}
                                         height={20}/>
                                 </Grid>
                                 <Grid item md={2} spacing={1}>
                                     <Skeleton
                                         variant="text"
                                         width={60}
                                         height={60}/>
                                 </Grid>
                             </Grid>
                         </Grid>
                     </Grid>
                       <Grid className="margin-top-bottom-20 detail-top-section" container gap='20px' justifyContent="center">
                           <Grid item md={2} xs={6} sm={6} >
                               <Skeleton
                               variant="rounded"
                               width="100%"
                               height={70}
                               />
                           </Grid>
                           <Grid item md={2} xs={6} sm={6} justifyItems="center">
                               <Skeleton
                                   variant="rounded"
                                   width="100%"
                                   height={70}
                               />
                           </Grid>
                           <Grid item md={2} xs={6} sm={6} justifyItems="center">
                               <Skeleton
                                   variant="rounded"
                                   width="100%"
                                   height={70}
                               />
                           </Grid> <Grid item md={2} xs={6} sm={6} justifyItems="center">
                           <Skeleton
                               variant="rounded"
                               width="100%"
                               height={70}
                           />
                       </Grid>

                       </Grid>

                   </Grid>
                   <Grid container  justifyContet='center'>
                       <Grid item xs={12} md={6} padding="20px">
                               <Skeleton
                                   variant="rectangular"
                                   width="80%"
                                   height={30}
                               />

                       </Grid>
                       <Grid item xs={12} md={6} padding="20px">
                           <Skeleton
                               variant="rectangular"
                               width="40%"
                               height={30}
                           />
                       </Grid>
                   </Grid>
                   <Grid
                       spacing={{ xs: 2, md: 3 }}
                       container
                       margin="dense"
                       sx={{
                           paddingBottom: '30px',
                           paddingTop: '30px',
                           alignItems: 'center',
                           justifyContent: 'center',
                       }}
                   >
                       {[...Array(4)].map((item) => {
                           return (
                               <Grid item>
                                   <CustomShimmerForCard />
                               </Grid>
                           )
                       })}
                   </Grid>


               </Grid>
           </>
       )
   }
   export default  TopSection
