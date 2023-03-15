import React, { useEffect, useState } from 'react'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import MapComponent from '../restaurant-details/google-address/MapComponent'
import MapModal from '../restaurant-details/google-address/map-modal'
import CustomMapSearch from './CustomMapSearch'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { GoogleApi } from '../../hooks/react-query/config/googleApi'
import GoogleMapComponent from '../landingpage/google-map/GoogleMapComponent'
import CustomTextFieldWithFormik from '../form-fields/CustomTextFieldWithFormik'
import { useTranslation } from 'react-i18next'
import CustomSelectWithFormik from '../custom-select/CustomSelectWithFormik'
import { Grid } from '@mui/material'
const MapForRestaurantJoin = ({
    RestaurantJoinFormik,
    latHandler,
    lngHandler,
    handleLocation,
    zoneData,
    zoneHandler,
}) => {
    const { global } = useSelector((state) => state.globalSettings)
    const [location, setLocation] = useState(global?.default_location)
    const [predictions, setPredictions] = useState([])
    const [placeDescription, setPlaceDescription] = useState(undefined)
    const [searchKey, setSearchKey] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false)
    const [placeId, setPlaceId] = useState('')
    const [locationEnabled, setLocationEnabled] = useState(false)
    const [isDisablePickButton, setDisablePickButton] = useState(false)
    const { t } = useTranslation()
    const {
        isLoading,
        data: places,
        isError,
        error,
        // refetch: placeApiRefetch,
    } = useQuery(
        ['places', searchKey],
        async () => GoogleApi.placeApiAutocomplete(searchKey),
        { enabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    const {
        isLoading: isLoading2,
        data: placeDetails,
        isError: isErrorTwo,
        error: errorTwo,
        refetch: placeApiRefetchOne,
    } = useQuery(
        ['placeDetails', placeId],
        async () => GoogleApi.placeApiDetails(placeId),
        { enabled: placeDetailsEnabled },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    const {
        data: geoCodeResults,
        // refetch: placeApiRefetch,
    } = useQuery(['geocode-api', location], async () =>
        GoogleApi.geoCodeApi(location)
    )
    useEffect(() => {
        if (placeDetails) {
            setLocation(placeDetails?.data?.result?.geometry?.location)
            setLocationEnabled(true)
        }
    }, [placeDetails])
    useEffect(() => {
        if (places) {
            setPredictions(places?.data?.predictions)
        }
    }, [places])

    useEffect(() => {
        handleLocation(location)
    }, [location])

    let zoneOption = []
    zoneData?.forEach((zone) => {
        let obj = {
            label: zone.name,
            value: zone.id,
        }
        zoneOption.push(obj)
    })

    return (
        <CustomBoxFullWidth>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <CustomMapSearch
                        setSearchKey={setSearchKey}
                        setEnabled={setEnabled}
                        predictions={predictions}
                        setPlaceId={setPlaceId}
                        setPlaceDetailsEnabled={setPlaceDetailsEnabled}
                        setPlaceDescription={setPlaceDescription}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <GoogleMapComponent
                        setLocation={setLocation}
                        location={location}
                        setPlaceDetailsEnabled={setPlaceDetailsEnabled}
                        placeDetailsEnabled={placeDetailsEnabled}
                        locationEnabled={locationEnabled}
                        setPlaceDescription={setPlaceDescription}
                        setLocationEnabled={setLocationEnabled}
                        setDisablePickButton={setDisablePickButton}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Latitude')}
                        touched={RestaurantJoinFormik.touched.lat}
                        errors={RestaurantJoinFormik.errors.lat}
                        fieldProps={RestaurantJoinFormik.getFieldProps('lat')}
                        onChangeHandler={latHandler}
                        value={RestaurantJoinFormik.values.lat}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomTextFieldWithFormik
                        required="true"
                        type="text"
                        label={t('Longitude')}
                        touched={RestaurantJoinFormik.touched.lng}
                        errors={RestaurantJoinFormik.errors.lng}
                        fieldProps={RestaurantJoinFormik.getFieldProps('lng')}
                        onChangeHandler={lngHandler}
                        value={RestaurantJoinFormik.values.lng}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <CustomSelectWithFormik
                        selectFieldData={zoneOption}
                        inputLabel={t('Zone')}
                        passSelectedValue={zoneHandler}
                        touched={RestaurantJoinFormik.touched.zoneId}
                        errors={RestaurantJoinFormik.errors.zoneId}
                        fieldProps={RestaurantJoinFormik.getFieldProps(
                            'zoneId'
                        )}
                    />
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}
export default MapForRestaurantJoin
