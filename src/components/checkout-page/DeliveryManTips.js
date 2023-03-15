import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomTextField,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import { Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { getAllSchedule, getDayNumber } from './const'
import { PreferableTimeInput } from './CheckOut.style'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'

const DeliveryManTips = ({ deliveryTip, setDeliveryTip }) => {
    const [fieldValue, setFieldValue] = useState(deliveryTip)
    const deliveryTips = [0, 5, 10, 15, 20, 30, 50]
    const { t } = useTranslation()
    const handleOnChange = (e) => {
        setFieldValue(e.target.value)
    }
    const handleClickOnTips = (tip) => {
        setFieldValue(tip)
    }
    useEffect(() => {
        setDeliveryTip(fieldValue)
    }, [fieldValue])

    return (
        <CustomPaperBigCard>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <CustomTypographyBold>
                        {t('Delivery Man Tips')}
                    </CustomTypographyBold>
                </Grid>
                <Grid item md={12} xs={12}>
                    <CustomTextField
                        label={t("Amount")}
                        autoFocus={true}
                        value={fieldValue}
                        // placeholder={t('Amount')}
                        fullWidth
                        onChange={(e) => handleOnChange(e)}
                        // sx={{
                        //     border: '2px solid',
                        //     color: 'primary.main',
                        //     borderRadius: '10px',
                        // }}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        {deliveryTips.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    onClick={() => handleClickOnTips(item)}
                                    sx={{
                                        height: '40px',
                                        width: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        borderColor: (theme) =>
                                            fieldValue === item
                                                ? theme.palette.primary.main
                                                : theme.palette.neutral[200],
                                    }}
                                >
                                    {item}
                                </Box>
                            )
                        })}
                    </CustomStackFullWidth>
                </Grid>
            </Grid>
        </CustomPaperBigCard>
    )
}

DeliveryManTips.propTypes = {}

export default DeliveryManTips
