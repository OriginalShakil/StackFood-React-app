import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@mui/material'
import { ConditionTypography } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../../error/Errors.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from '@mui/lab/LoadingButton'

const PlaceOrder = (props) => {
    const { placeOrder, orderLoading } = props
    const { t } = useTranslation()
    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth alignItems="center" spacing={2}>
                <CustomTypography>
                    {t(
                        'I agree that placing the order places me under Terms and Conditions & Privacy Policies'
                    )}
                </CustomTypography>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={placeOrder}
                    loading={orderLoading}
                >
                    {t('Place Order')}
                </LoadingButton>
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}

PlaceOrder.propTypes = {}

export default PlaceOrder
