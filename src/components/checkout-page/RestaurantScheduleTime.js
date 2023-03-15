import React from 'react'
import {
    PrefarableCaption,
    PreferableTimeInput,
    StyledPaper,
} from './CheckOut.style'
import { Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { getAllSchedule, getDayNumber } from './const'
import { useTranslation } from 'react-i18next'
import {
    CustomPaperBigCard,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'

const RestaurantScheduleTime = (props) => {
    const {
        restaurantData,
        handleChange,
        today,
        tomorrow,
        numberOfDay,
        global,
        setScheduleAt,
    } = props
    const { t } = useTranslation()

    return (
        <>
            {restaurantData?.data?.schedule_order && (
                <CustomPaperBigCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <CustomTypographyBold>
                                {t('Preferable Time')}
                            </CustomTypographyBold>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>{t('Time')}</InputLabel>
                                <Select
                                    label={t('Time')}
                                    onChange={handleChange}
                                    defaultValue={getDayNumber(today)}
                                >
                                    <MenuItem value={getDayNumber(today)} sx={{

                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                            }}}>
                                        {t('Today')}
                                    </MenuItem>
                                    <MenuItem value={getDayNumber(tomorrow)} sx={{

                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                        }}} >
                                        {t('Tomorrow')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {restaurantData?.data?.schedules &&
                                restaurantData?.data?.schedules?.length > 0 && (
                                    <PreferableTimeInput
                                        defaultValue={t("Now")}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={getAllSchedule(
                                            numberOfDay,
                                            restaurantData?.data?.schedules,
                                            global?.schedule_order_slot_duration
                                        )}
                                        onChange={(e, option) =>
                                            setScheduleAt(option?.value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t('Schedule')}

                                            />
                                        )}
                                    />
                                )}
                        </Grid>
                    </Grid>
                </CustomPaperBigCard>
            )}
        </>
    )
}

RestaurantScheduleTime.propTypes = {}

export default RestaurantScheduleTime
