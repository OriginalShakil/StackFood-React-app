import React from 'react'
import {
    alpha,
    Box,
    Card,
    CircularProgress,
    Grid, Paper,
    Skeleton,
    Stack,
} from '@mui/material'
import { useQuery } from 'react-query'

//import AddressPage from '../../../pages/customer/address/AddressPage'
import { AddressApi } from '../../../hooks/react-query/config/addressApi'
import AddNewAddress from './AddNewAddress'
import AddressPage from './AddressPage'
import CustomShimmerCard from '../../customShimmerForProfile/CustomShimmerCard'
import { CustomPaperBigCard } from '../../../styled-components/CustomStyles.style'
import CustomEmptyResult from "../../empty-view/CustomEmptyResult";
import noData from "../../../../public/static/nodata.png"
import {onSingleErrorResponse} from "../../ErrorResponse";
import {useTheme} from "@mui/material/styles";

const AddresList = () => {
    const theme=useTheme()
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['address-list'],
        AddressApi.addressList,{
            onError:onSingleErrorResponse
        }
    )

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CustomShimmerCard />
            </Box>
        )
    }
    const borderColor=alpha(theme.palette.primary.main ,0.5)
    return (
        <Box
            sx={{
                padding: '16px',
                borderRadius: '10px',
                marginTop: '1rem',
            }}
        >
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <AddNewAddress refetch={refetch} />
                </Grid>
                <>
                    {data ? (
                        data?.data?.addresses.map((address) => (
                        <Grid item md={6} xs={12} key={address.id}>
                            <Paper sx={{padding:"10px", border:`1px solid ${borderColor}`}} elevation={9}>
                                <AddressPage {...address} refetch={refetch} />
                            </Paper>
                        </Grid>
                    ))):(<Stack
                       width="100%"
                       alignItems="center"
                       justifyContent="center"
                    >
                        <CustomEmptyResult label="No Address Found" image={noData} />
                    </Stack>)}
                </>
            </Grid>
        </Box>
    )
}

export default AddresList
