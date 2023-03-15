import React, { useEffect } from 'react'
import {
    alpha,
    Box,
    Button,
    Container,
    Grid,
    Pagination,
    Stack,
    Typography,
} from '@mui/material'
import PastImg from '../../../public/static/order/image 29.png'
import ActiveImg from '../../../public/static/order/image 29 (1).png'
import onData from '../../../public/static/nodata.png'

import {
    PastButtion,
    ActiveButtonGrid,
    ActiveButtion,
    ButtonGrid,
    OrderPegination,
    TopButtonTypography,
    Image,
} from './OrderHistory.style'
import OrderHist from './OrderHist'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { OrderApi } from '../../hooks/react-query/config/orderApi'
import Loading from '../custom-loading/Loading'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import CustomShimmerCard from '../customShimmerForProfile/CustomShimmerCard'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import { CustomTypography } from '../custom-tables/Tables.style'
import CustomePagination from '../pagination/Pagination'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTheme } from '@mui/material/styles'
import { setOrderType } from '../../redux/slices/orderType'
import useMediaQuery from '@mui/material/useMediaQuery'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'

const OrderHistoryPage = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { t } = useTranslation()
    const { orderType } = useSelector((state) => state.orderType)
    // const [orderType, setOrderType] = useState('running-orders')
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(1)

    const { isLoading, data, isError, error, refetch } = useQuery(
        [
            orderType === 'list' ? 'past-order' : 'active-orders',
            orderType,
            limit,
            offset,
        ],
        () => OrderApi.orderHistory(orderType, limit, offset),
        {
            onError: onSingleErrorResponse,
        }
    )
    const handleOrderType = (value) => {
        setOffset(1)
        dispatch(setOrderType(value))
    }
    useEffect(() => {
        dispatch(setOrderType(orderType ? orderType : 'running-orders'))
        orderType && refetch()
    }, [])
    const isXs = useMediaQuery('(max-width:700px)')
    return (
        <Container>
            <Box minHeight="90vh" mb="2rem">
                <ButtonGrid>
                    <Grid justifyContent="center" container xs={12} spacing={1}>
                        <ActiveButtonGrid>
                            <Grid item xs={6} md={6}>
                                {/* <ActiveButtonGrid> */}
                                <ActiveButtion
                                    onClick={() =>
                                        handleOrderType('running-orders')
                                    }
                                    background={
                                        orderType === 'running-orders'
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                              )
                                            : ''
                                    }
                                >
                                    {orderType === 'running-orders' && (
                                        <Stack
                                            sx={{
                                                position: 'absolute',
                                                top: '4px',
                                                right: '6px',
                                            }}
                                        >
                                            <CheckCircleIcon color="success" />
                                        </Stack>
                                    )}
                                    <Image
                                        src={ActiveImg.src}
                                        alt={t('active-order')}
                                    />{' '}
                                    <CustomTypography
                                        sx={{
                                            mt: '11px',
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                        }}
                                    >
                                        {t('Active Order')}
                                    </CustomTypography>
                                </ActiveButtion>
                                {/* </ActiveButtonGrid> */}
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <PastButtion
                                    onClick={() => handleOrderType('list')}
                                    background={
                                        orderType === 'list'
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.3
                                              )
                                            : ''
                                    }
                                >
                                    {orderType !== 'running-orders' && (
                                        <Stack
                                            sx={{
                                                position: 'absolute',
                                                top: '4px',
                                                right: '6px',
                                            }}
                                        >
                                            <CheckCircleIcon color="success" />
                                        </Stack>
                                    )}
                                    <Image
                                        src={PastImg.src}
                                        alt={t('past-order')}
                                    />{' '}
                                    <CustomTypography
                                        sx={{
                                            mt: '11px',
                                            color: (theme) =>
                                                theme.palette.neutral[400],
                                        }}
                                    >
                                        {t('Past Order')}
                                    </CustomTypography>
                                </PastButtion>
                            </Grid>
                        </ActiveButtonGrid>
                    </Grid>
                </ButtonGrid>
                <CustomPaperBigCard>
                    {isLoading ? (
                        <Box mb="1rem">
                            <CustomShimmerCard />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {data?.data?.orders?.map((order) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={isXs ? 12 : 6}
                                    md={6}
                                    lg={6}
                                    key={order.id}
                                >
                                    <OrderHist {...order} />
                                </Grid>
                            ))}
                            {data?.data?.orders?.length === 0 && (
                                <CustomEmptyResult
                                    image={onData}
                                    label="No Orders Found"
                                />
                            )}
                        </Grid>
                    )}
                    {data?.data?.total_size > 10 && (
                        <CustomePagination
                            total_size={data?.data?.total_size}
                            page_limit={limit}
                            offset={offset}
                            setOffset={setOffset}
                        />
                    )}
                </CustomPaperBigCard>
            </Box>
        </Container>
    )
}

export default OrderHistoryPage
