import React, { useEffect, useState } from 'react'
import {Grid, Box, Typography, Stack} from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { WallateBox, WalletBoxSection } from './Wallets.style'
import WalletsPage from './WalletsPage'
import { useQuery } from 'react-query'
import { WalletApi } from '../../../hooks/react-query/config/walletApi'
import { getAmount, getTotalWalletAmount } from '../../../utils/customFunctions'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import WalletShimmer from './WalletShimmer'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CustomePagination from '../../pagination/Pagination'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import {CustomPaperBigCard, CustomStackFullWidth} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from "../../CustomImageContainer";
import walletImage from "../../../../public/static/wallet.png"
import {useTheme} from "@mui/material/styles";
import noData from "../../../../public/static/nodata.png"
import {onSingleErrorResponse} from "../../ErrorResponse";
const Wallet = () => {
    const theme=useTheme()
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { t } = useTranslation()
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['wallet-list', offset],
        () => WalletApi.walletList(offset),
        {
            enabled: false,
        }
    )
    useEffect(async () => {
        await refetch()
    }, [])
    useEffect(async () => {
        await refetch()
    }, [offset])

    const { isLoading: profileDataLoading, data: profileData } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,{
            onError:onSingleErrorResponse
        }
    )

    if (isLoading) {
        return (
            <>
                <WalletShimmer />
            </>
        )
    }
    return (
        <>
        <CustomStackFullWidth
            my="2rem"
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: '100%' }}
        >
            <CustomPaperBigCard>
                <Grid container md={12} xs={12} spacing={2}>
                    <Grid
                        item
                        md={12}
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <WallateBox>
                            <Grid
                                container
                                md={12}
                                xs={12}
                                spacing={1}
                               padding="2rem"
                            >
                                <Grid
                                    item
                                    md={5}
                                    xs={6}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems:"center",

                                    }}
                                >
                                    <CustomImageContainer
                                    src={walletImage.src}
                                    width="60px"
                                    height="60px"
                                    />
                                    {/*<AccountBalanceWalletIcon*/}
                                    {/*    sx={{*/}
                                    {/*        fontSize: '48px',*/}
                                    {/*        color: 'white',*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </Grid>
                                <Grid item md={7} xs={6} alignItems="center" >
                                   <Stack flexWrap="wrap">
                                       <Typography
                                           fontSize= '14px'
                                           color={theme.palette.neutral[100]}
                                       >
                                           {t('Wallet Amount')}
                                       </Typography>
                                       <Typography
                                           fontSize= '20px'
                                           color={theme.palette.neutral[100]}
                                       >
                                           {getAmount(
                                               profileData?.data?.wallet_balance,
                                               currencySymbolDirection,
                                               currencySymbol,
                                               digitAfterDecimalPoint
                                           )}
                                       </Typography>
                                   </Stack>
                                </Grid>
                            </Grid>
                        </WallateBox>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Box sx={{ padding: '10px' }}>
                            <Typography
                                fontSize='18px'
                                fontWeight= '700'

                            >
                                {t('Transaction History')}
                            </Typography>
                        </Box>
                        {/* {data?.data} */}

                        <>
                            {data?.data?.data?.length > 0 ? (
                                data?.data?.data?.map((wallet) => (
                                    <WalletsPage
                                        key={wallet.id}
                                        data={wallet}
                                        currencySymbolDirection={
                                            currencySymbolDirection
                                        }
                                        currencySymbol={currencySymbol}
                                        digitAfterDecimalPoint={
                                            digitAfterDecimalPoint
                                        }
                                    />
                                ))
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                    }}
                                >
                                    <CustomEmptyResult label="No Data Found" image={noData} />
                                </div>
                            )}
                        </>
                    </Grid>
                </Grid>
            </CustomPaperBigCard>
            {data && data?.data?.total_size >= page_limit && (
                <CustomePagination
                    offset={offset}
                    page_limit={page_limit}
                    setOffset={setOffset}
                    total_size={data?.data?.total_size}
                />
            )}
        </CustomStackFullWidth>
        </>
    )
}

export default Wallet
