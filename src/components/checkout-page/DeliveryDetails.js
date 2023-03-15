import React from 'react'
import { DeliveryCaption, DeliveryTitle, StyledPaper } from './CheckOut.style'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import DeliveryAddress from './DeliveryAddress'
import { Paper } from '@mui/material'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'

const DeliveryDetails = (props) => {
    const { restaurantData, setOrderType, orderType, setAddress, address } =
        props
    const { t } = useTranslation()
    return (
        <CustomPaperBigCard>
            <DeliveryTitle>{t('DELIVERY DETAILS')}</DeliveryTitle>
            <FormControl>
                <DeliveryCaption const id="demo-row-radio-buttons-group-label">
                    {t('Delivery Options')}
                </DeliveryCaption>
                {restaurantData?.data && (
                    <RadioGroup
                        defaultValue="delivery"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => setOrderType(e.target.value)}
                    >
                        {restaurantData?.data?.delivery && (
                            <FormControlLabel
                                value="delivery"
                                control={<Radio />}
                                label={t('Home Delivery')}
                            />
                        )}
                        {restaurantData?.data?.take_away && (
                            <FormControlLabel
                                value="take_away"
                                control={<Radio />}
                                label={t('Take Away')}
                            />
                        )}
                    </RadioGroup>
                )}
            </FormControl>

            {orderType === 'delivery' && (
                <DeliveryAddress setAddress={setAddress} address={address} />
            )}
        </CustomPaperBigCard>
    )
}

DeliveryDetails.propTypes = {}

export default DeliveryDetails
