import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomStackFullWidth,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import { Stack, Typography } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import CustomRatings from '../custom-ratings/CustomRatings'
import CustomAvatar from '../custom-avatar/CustomAvatar'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import ChatIcon from '@mui/icons-material/Chat'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomTypographyGray } from '../error/Errors.style'
import { useQuery } from 'react-query'
import { GoogleApi } from '../../hooks/react-query/config/googleApi'
import { onErrorResponse } from '../ErrorResponse'
import routePNG from '../../../public/static/route.png'
import directionPNG from '../../../public/static/delivery-truck.png'
const DeliverymanInfo = ({ data }) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const productImage = global?.base_urls?.delivery_man_image_url
    const origin = {
        latitude: data?.delivery_man?.lat,
        longitude: data?.delivery_man?.lng,
    }
    const destination = {
        latitude: data?.delivery_address?.latitude,
        longitude: data?.delivery_address?.longitude,
    }
    const { data: distanceData, refetch: refetchDistance } = useQuery(
        ['get-distance', origin, destination],
        () => GoogleApi.distanceApi(origin, destination),
        {
            onError: onErrorResponse,
        }
    )
    const away=t("away")
    return (
        <CustomStackFullWidth alignItems="center" spacing={1.5}>
            <CustomTypographyBold>{t('Trip Route')}</CustomTypographyBold>
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={0.5}
            >
                <CustomTypography>
                    {data?.delivery_man?.location}
                </CustomTypography>
                <CustomImageContainer
                    src={directionPNG.src}
                    height="30px"
                    width="60px"
                />
                <CustomTypography>
                    {data?.delivery_address?.address}
                </CustomTypography>
            </CustomStackFullWidth>
            <CustomStackFullWidth alignItems="center">
                <CustomImageContainer
                    src={routePNG.src}
                    height="30px"
                    width="30px"
                />
                <CustomTypographyGray sx={{ fontSize: '18px' }}>
                    {t(
                        `${distanceData?.data?.rows?.[0]?.elements?.[0]?.distance?.text} ${away}`
                    )}
                </CustomTypographyGray>
            </CustomStackFullWidth>

            <CustomStackFullWidth
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <CustomTypographyBold variant="h3">
                    {t('Delivery man')}
                </CustomTypographyBold>
            </CustomStackFullWidth>

            <CustomStackFullWidth
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                >
                    <CustomAvatar
                        avatarImage={`${productImage}/${data?.delivery_man?.image}`}
                        alt={data?.delivery_man?.f_name.concat(
                            ' ',
                            data?.delivery_man?.l_name
                        )}
                    />
                    <Stack alignItems="flex-start">
                        <CustomTypographyBold>
                            {data?.delivery_man?.f_name.concat(
                                ' ',
                                data?.delivery_man?.l_name
                            )}
                        </CustomTypographyBold>
                        <CustomRatings
                            readOnly={true}
                            ratingValue={data?.delivery_man?.rating_count}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                    {/*<Typography>call</Typography>*/}
                    <Stack sx={{ cursor: 'pointer' }}>
                        <Link
                            href={{
                                pathname: '/chat',
                                query: {
                                    type: 'delivery_man',
                                    id: data?.delivery_man?.id,
                                    routeName: 'delivery_man_id',
                                    chatFrom:"true"
                                },
                            }}
                        >
                            <ChatIcon
                                sx={{
                                    height: 25,
                                    width: 25,
                                    color: (theme) =>
                                        theme.palette.neutral[500],
                                }}
                            ></ChatIcon>
                        </Link>
                    </Stack>
                </Stack>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

DeliverymanInfo.propTypes = {}

export default DeliverymanInfo
