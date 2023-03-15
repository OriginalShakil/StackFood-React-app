import React, { useEffect, useState } from 'react'
import { Grid, Box, Button, Typography } from '@mui/material'

import Tropy from '../../../../public/static/profile/tropy.png'
import { WallateBox, WallateBoxSection } from './Loyality.style'
import { useTranslation } from 'react-i18next'
import LoyalityPage from './LoyalityPage'
import { useQuery } from 'react-query'
import { LoyalityApi } from '../../../hooks/react-query/config/LoyalityApi'
import { getTotalLoyalityAmount } from '../../../utils/customFunctions'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import WalletShimmer from '../wallets/WalletShimmer'
import CartClearModal from '../../foodDetail-modal/CartClearModal'
import LoyalityModal from '../../../pages/customer/loyality/LoyalityModal'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { WalletBoxSection } from '../wallets/Wallets.style'
import CustomePagination from '../../pagination/Pagination'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { PrimaryButton } from '../../products-page/FoodOrRestaurant'
import nodata from '../../../../public/static/nodata.png'
import { onSingleErrorResponse } from '../../ErrorResponse'
import {useSelector} from "react-redux";

const LoyalityList = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const [page_limit, setPageLimit] = useState(10)
    const [offset, setOffset] = useState(1)
    const [loyalityModal, setLoyalityModal] = useState(false)
    const { t } = useTranslation()

    const handleLoyalityModal = () => setLoyalityModal(true)
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['loyality-list'],
        () => LoyalityApi.loayalityList(offset),
        {
            enabled: false,
            onError: onSingleErrorResponse,
        }
    )
    useEffect(async () => {
        await refetch()
    }, [])
    useEffect(async () => {
        await refetch()
    }, [offset])

    const {
        isLoading: profileDataLoading,
        data: profileData,
        refetch: profileRefatch,
    } = useQuery(['profile-info'], ProfileApi.profileInfo)

    const convertLoyality = () => {
        handleLoyalityModal()
    }
    if (isLoading) {
        return (
            <>
                <WalletShimmer />
            </>
        )
    }
    return (
        <CustomStackFullWidth
            my="2rem"
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: '100%' }}
        >
            <CustomPaperBigCard>
                <Grid container spacing={2}>
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
                                spacing={2}
                                justifyContent="center"
                            >
                                <Grid item md={12} xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={Tropy.src} alt="" />
                                        <Box ml="1rem">
                                            <Typography
                                                sx={{
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                }}
                                            >
                                                {
                                                    profileData?.data
                                                        ?.loyalty_point
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: '12px' }}
                                            >
                                                {t('Loyalty Points !')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item md={12} xs={12} textAlign="center">
                                {global?.customer_wallet_status !== 0 &&

                                    <PrimaryButton
                                    variant="contained"
                                    onClick={convertLoyality}
                                    >
                                {t('Convert to currency now')}
                                    </PrimaryButton>
                                }
                                </Grid>

                            </Grid>
                        </WallateBox>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Box sx={{ padding: '10px' }}>
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: '700' }}
                            >
                                {t('Transaction History')}
                            </Typography>
                        </Box>

                        <>
                            {data?.data?.data?.length > 0 ? (
                                data?.data?.data?.map((loyality) => (
                                    <LoyalityPage
                                        key={loyality.id}
                                        data={{ loyality }}
                                    />
                                ))
                            ) : (
                                <div>
                                    <CustomEmptyResult
                                        label="No Data Found"
                                        image={nodata}
                                    />
                                </div>
                            )}
                        </>
                    </Grid>
                </Grid>
                {loyalityModal && (
                    <LoyalityModal
                        setLoyalityModal={setLoyalityModal}
                        loyalitydata={profileData?.data?.loyalty_point}
                        refetch={refetch}
                        profileRefatch={profileRefatch}
                        loyalityModal={loyalityModal}
                    />
                )}
            </CustomPaperBigCard>
            {data?.data?.total_size >= page_limit && (
                <CustomePagination
                    offset={offset}
                    page_limit={page_limit}
                    setOffset={setOffset}
                    total_size={data?.data?.total_size}
                />
            )}
        </CustomStackFullWidth>
    )
}

export default LoyalityList
