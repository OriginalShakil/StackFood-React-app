import React from 'react'
import { CustomBoxFullWidth } from "../../../styled-components/CustomStyles.style"
import {Grid, Paper, Stack} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
const WalletShimmer= () => {
    return (
        <CustomBoxFullWidth>
            <Grid container spacing={3} marginTop="20px">
                <Grid item  xs={12} justifyContent="center" alignItems="center">
                  <Stack alignItems="center" >
                      <Skeleton variant="text"
                                width={341}
                                height={170}

                      />
                  </Stack>
                </Grid>
                {[...Array(4)].map((item, index) => {
                    return (
                        <Grid item xs={12}  key={index} sx={{ padding: '10px' }}>

                              <Stack  direction="row" justifyContent="space-between">
                                  <Skeleton
                                      variant='text'
                                      width="30%"
                                      height={20}
                                  />
                                  <Skeleton
                                      variant='text'
                                      width="10%"
                                      height={20}
                                  />
                              </Stack>
                               <Stack   direction="row" justifyContent="space-between">
                                   <Skeleton
                                       variant='text'
                                       width="30%"
                                       height={20}
                                   />
                                   <Skeleton
                                       variant='text'
                                       width="10%"
                                       height={20}
                                   />
                               </Stack>


                        </Grid>
                    )
                })}
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default WalletShimmer


