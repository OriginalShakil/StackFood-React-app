import React from 'react'
import { HeadingBox } from './OrderDetail.style'
import { Typography } from '@mui/material'
import CustomFormatedDateTime from '../date/CustomFormatedDateTime'
import { useTranslation } from 'react-i18next'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'

const getCommonValue = (data, key) => {
    return data?.data?.[0]?.[key]
}
const TopDetails = ({ data, trackData }) => {

    const { t } = useTranslation()
    return (
        <HeadingBox>
            <CustomStackFullWidth alignItems="center" justifyContent="center">
                <Typography
                    sx={{
                        color: 'primary.main',
                        fontSize: '36px',
                        fontWeight: '600',
                    }}
                >
                    {t('Order')} # {getCommonValue(data, 'order_id')}
                </Typography>
                <CustomTypography sx={{color:(theme)=>theme.palette.neutral[400]}}>
                    {t('Order placed')} :{' '}
                    <CustomFormatedDateTime
                        date={data?.data?.[0]?.created_at}
                    />
                </CustomTypography>
                {trackData?.data?.scheduled === 1 && (
                    <CustomTypography>
                        {t('Order scheduled')} :
                        <CustomFormatedDateTime
                            date={trackData?.data?.schedule_at}
                        />
                    </CustomTypography>
                )}
            </CustomStackFullWidth>
        </HeadingBox>
    )
}

export default TopDetails
