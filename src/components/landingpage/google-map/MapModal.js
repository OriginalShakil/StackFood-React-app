import React, { useEffect, useState } from 'react'
import {
    Box,
    IconButton,
    InputBase,
    Modal,
    Paper,
    Typography,
    styled,
    Button,
    Autocomplete,
    TextField,
    Grid,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import GoogleMapComponent from './GoogleMapComponent'
import { useQuery } from 'react-query'
import { GoogleApi } from '../../../hooks/react-query/config/googleApi'
import { useDispatch, useSelector } from 'react-redux'
import { LocationView } from './Map.style'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useGeolocated } from 'react-geolocated'
import { PrimaryButton } from '../link-section/Linksection.style'
import { toast } from 'react-hot-toast'
import Skeleton from '@mui/material/Skeleton'
import { onErrorResponse, onSingleErrorResponse } from '../../ErrorResponse'
import { setZoneData } from '../../../redux/slices/global'
import LocationEnableCheck from '../LocationEnableCheck'
import { FacebookCircularProgress } from '../HeroLocationForm'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import { CustomTypographyGray } from '../../error/Errors.style'

const CustomBoxWrapper = styled(Box)(({ theme }) => ({
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgColor: 'background.paper',
    boxShadow: 24,
    padding: '25px',
    maxWidth: '800px',
    minWidth: '100px',
    width: '100%',
    minHeight: '550px',
    background: theme.palette.background.paper,
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
        maxWidth: '500px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '300px',
        minHeight: '350px',
    },
}))
const CssTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
        background: theme.palette.whiteContainer.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
        background: theme.palette.whiteContainer.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        padding: '7px',
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}))

const MapModal = ({ open, handleClose }) => {
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const [isEnableLocation, setIsEnableLocation] = useState(false)

    const [searchKey, setSearchKey] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [placeDetailsEnabled, setPlaceDetailsEnabled] = useState(false)
    const [locationEnabled, setLocationEnabled] = useState(false)
    const [placeId, setPlaceId] = useState('')
    const [placeDescription, setPlaceDescription] = useState(undefined)
    const [location, setLocation] = useState(global?.default_location)
    const [zoneId, setZoneId] = useState(undefined)
    const [isLoadingCurrentLocation, setLoadingCurrentLocation] =
        useState(false)
    const [currentLocation, setCurrentLocation] = useState({})
    const [rerenderMap, setRerenderMap] = useState(false)
    const [currentLocationValue, setCurrentLactionValue] = useState({
        description: '',
    })
    const [loadingAuto, setLoadingAuto] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {
        isLoading: placesIsLoading,
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
    if (error) {
        setPredictions([])
        setEnabled(false)
    }

    const {
        isLoading: isLoading2,
        data: placeDetails,
        isError: isErrorTwo,
        error: errorTwo,
        refetch: placeApiRefetchOne,
    } = useQuery(
        ['placeDetails', placeId],
        async () => GoogleApi.placeApiDetails(placeId),
        {
            enabled: placeDetailsEnabled,
            onSuccess: () => setLoadingAuto(false),
            onError: onSingleErrorResponse,
        },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )

    const {
        isLoading: locationLoading,
        data: zoneData,
        isError: isErrorLocation,
        error: errorLocation,
        refetch: locationRefetch,
    } = useQuery(
        ['zoneId', location],
        async () => GoogleApi.getZoneId(location),
        { enabled: locationEnabled, onError: onErrorResponse },
        {
            retry: 1,
            // cacheTime: 0,
        }
    )
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 1000,
            isGeolocationEnabled: true,
        })

    useEffect(() => {
        if (coords) {
            setCurrentLocation({
                lat: coords.latitude,
                lng: coords.longitude,
            })
        }
    }, [])

    if (isErrorLocation) {
    }
    const { data: geoCodeResults, refetch: refetchCurrentLocation } = useQuery(
        ['geocode-api', location],
        async () => GoogleApi.geoCodeApi(location)
    )
    // if (geoCodeResults) {
    //     localStorage.setItem('location', geoCodeResults)
    // }
    // if (zoneData) {

    // }
    useEffect(() => {
        if (geoCodeResults) {
            setCurrentLactionValue({
                description:
                    geoCodeResults?.data?.results[0]?.formatted_address,
            })
        } else {
            setCurrentLactionValue({
                description: '',
            })
        }
    }, [geoCodeResults])
    useEffect(() => {
        if (zoneData) {
            setZoneId(zoneData?.data?.zone_id)
            dispatch(setZoneData(zoneData?.data?.zone_data))
            //  setLocation(undefined)
            setLocationEnabled(false)
        }
        if (!zoneData) {
            setZoneId(undefined)
        }
    }, [zoneData])
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
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         if (geoCodeResults) {
    //             localStorage.setItem(
    //                 'location',
    //                 geoCodeResults?.data?.results[0]?.formatted_address
    //             )
    //         }
    //     }
    // }, [geoCodeResults])
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         if (zoneId) {
    //             localStorage.setItem('zoneid', zoneId)
    //         }
    //     }
    // }, [zoneId])

    const [isDisablePickButton, setDisablePickButton] = useState(false)

    // const timerid = setTimeout(() => {
    //     setLocationEnabled(true)
    //     localStorage.setItem('zoneid', zoneId)
    // }, 2000)
    const handleLocationSet = (values) => {
        setLocation(values)
        //localStorage.setItem('currentLatLng', JSON.stringify(values))
    }
    const handlePickLocationOnClick = () => {
        if (zoneId && geoCodeResults && location) {
            localStorage.setItem('zoneid', zoneId)
            localStorage.setItem(
                'location',
                geoCodeResults?.data?.results[0]?.formatted_address
            )
            localStorage.setItem('currentLatLng', JSON.stringify(location))
            toast.success(t('New location has been set.'))
            router.push('/home')
        }
        handleClose()
    }
    const handleLocationSelection = (value) => {
        setPlaceId(value?.place_id)
        setPlaceDescription(value?.description)
        // setLoadingAuto(false)
    }
    const handleAgreeLocation = async () => {
        if (coords) {
            setLocation({ lat: coords?.latitude, lng: coords?.longitude })
            setLoadingCurrentLocation(true)
            setLocationEnabled(true)
            setLoadingCurrentLocation(false)
            if (zoneId) {
                localStorage.setItem('zoneid', zoneId)
            }
            await refetchCurrentLocation()
            setRerenderMap((prevState) => !prevState)
        } else {
            setIsEnableLocation(true)
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomBoxWrapper>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Paper
                            sx={{ outline: 'none' }}
                            // variant="outlined"
                            // sx={{
                            //     width: '100%',
                            // }}
                        >
                            {loadingAuto ? (
                                <Skeleton
                                    width="100%"
                                    height="55px"
                                    variant="rectangular"
                                />
                            ) : (
                                <Autocomplete
                                    fullWidth
                                    freeSolo
                                    id="combo-box-demo"
                                    getOptionLabel={(option) =>
                                        option.description
                                    }
                                    options={predictions}
                                    onChange={(event, value) => {
                                        if (value) {
                                            if (
                                                value !== '' &&
                                                typeof value === 'string'
                                            ) {
                                                setLoadingAuto(true)
                                                const value =
                                                    places?.data
                                                        ?.predictions?.[0]
                                                handleLocationSelection(value)
                                            } else {
                                                handleLocationSelection(value)
                                            }
                                        }
                                        setPlaceDetailsEnabled(true)
                                    }}
                                    clearOnBlur={false}
                                    value={currentLocationValue}
                                    loading={placesIsLoading}
                                    loadingText={t(
                                        'Search suggestions are loading...'
                                    )}
                                    renderInput={(params) => (
                                        <CssTextField
                                            label={null}
                                            {...params}
                                            placeholder={t(
                                                'Search location here...'
                                            )}
                                            onChange={(event) => {
                                                setSearchKey(event.target.value)
                                                if (event.target.value) {
                                                    setEnabled(true)
                                                } else {
                                                    setEnabled(false)
                                                }
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    setSearchKey(e.target.value)
                                                }
                                            }}
                                        />
                                    )}
                                />
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <LoadingButton
                            // className="currentlocbtn1"
                            sx={{
                                width: '100%',
                                padding: '16px 16px',
                                color: (theme) =>
                                    theme.palette.whiteContainer.main,
                            }}
                            // aria-label="pickcurrentlocation"
                            // variant="contained"
                            onClick={() => handleAgreeLocation()}
                            startIcon={<GpsFixedIcon />}
                            //endIcon={<GpsFixedIcon />}
                            loadingPosition="end"
                            variant="contained"
                            loading={isLoadingCurrentLocation}
                        >
                            {t('Use Current Location')}
                        </LoadingButton>
                    </Grid>
                </Grid>
                <Box
                    // direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    className="mapsearch"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: '10px',
                    }}
                >
                    <button onClick={handleClose} className="closebtn">
                        <CloseIcon sx={{ fontSize: '16px' }} />
                    </button>
                </Box>

                <Box
                    id="modal-modal-description"
                    sx={{ mt: 2, color: 'black' }}
                >
                    {!!location ? (
                        <GoogleMapComponent
                            key={rerenderMap}
                            setDisablePickButton={setDisablePickButton}
                            setLocationEnabled={setLocationEnabled}
                            setLocation={handleLocationSet}
                            setCurrentLocation={setCurrentLocation}
                            locationLoading={locationLoading}
                            location={location}
                            setPlaceDetailsEnabled={setPlaceDetailsEnabled}
                            placeDetailsEnabled={placeDetailsEnabled}
                            locationEnabled={locationEnabled}
                            setPlaceDescription={setPlaceDescription}
                        />
                    ) : (
                        <CustomStackFullWidth
                            alignItems="center"
                            justifyContent="center"
                        >
                            <FacebookCircularProgress />
                            <CustomTypographyGray nodefaultfont="true">
                                {t('Please wait sometimes')}
                            </CustomTypographyGray>
                        </CustomStackFullWidth>
                    )}

                    {geoCodeResults?.data?.results?.length > 0 && (
                        <LocationView>
                            {
                                geoCodeResults?.data?.results[0]
                                    ?.formatted_address
                            }
                        </LocationView>
                    )}
                    {placeDescription && (
                        <LocationView>{placeDescription}</LocationView>
                    )}

                    {errorLocation?.response?.data ? (
                        <Button
                            //className="picklocation"
                            aria-label="picklocation"
                            sx={{
                                flex: '1 0',
                                width: '100%',
                                top: '-3rem',
                            }}
                            disabled={locationLoading}
                            variant="contained"
                            color="error"
                            onClick={() => {
                                if (zoneId) {
                                    localStorage.setItem('zoneid', zoneId)
                                }
                                handleClose()
                            }}
                        >
                            {/*{errorLocation?.response?.data?.errors[0]?.message}*/}
                        </Button>
                    ) : (
                        <>
                            {!!location && (
                                <PrimaryButton
                                    align="center"
                                    //className="picklocation"
                                    aria-label="picklocation"
                                    sx={{
                                        flex: '1 0',
                                        width: '100%',
                                        top: '.7rem',
                                    }}
                                    disabled={locationLoading}
                                    variant="contained"
                                    onClick={() => handlePickLocationOnClick()}
                                >
                                    {t('Pick Locations')}
                                </PrimaryButton>
                            )}
                        </>
                    )}
                    {/* <PrimaryButton
                        className="currentlocbtn2"
                        sx={{ width: '40%' }}
                        aria-label="pickcurrentlocation"
                    >
                        <GpsFixedIcon /> {t('Use Current Location')}
                    </PrimaryButton> */}
                </Box>
                <LocationEnableCheck
                    openLocation={isEnableLocation}
                    handleCloseLocation={() => setIsEnableLocation(false)}
                    isGeolocationEnabled={isGeolocationEnabled}
                    t={t}
                    coords={coords}
                    handleAgreeLocation={handleAgreeLocation}
                />
            </CustomBoxWrapper>
        </Modal>
    )
}

export default MapModal
