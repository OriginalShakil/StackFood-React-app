import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CircularProgress, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import markerIcon from '../../../../public/static/markerIcon.png'

const GoogleMapComponent = ({
    setDisablePickButton,
    setLocationEnabled,
    setLocation,
    setCurrentLocation,
    locationLoading,
    location,
    setPlaceDetailsEnabled,
    placeDetailsEnabled,
    locationEnabled,
    setPlaceDescription,
    height,
}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const containerStyle = {
        width: '100%',
        height: height ? height : isSmall ? '250px' : '400px',
    }
    const mapRef = useRef(GoogleMap)
    const center = useMemo(
        () => ({
            lat: parseFloat(location?.lat),
            lng: parseFloat(location?.lng),
        }),
        []
    )
    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })
    const [isMounted, setIsMounted] = useState(false)
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const [mapSetup, setMapSetup] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [centerPosition, setCenterPosition] = useState(center)

    const onLoad = useCallback(function callback(map) {
        setZoom(12)
        setMap(map)
    }, [])
    useEffect(() => {
        if (location && placeDetailsEnabled) {
            setCenterPosition(location)
        }
        if (map?.center && mapSetup) {
            setCenterPosition({
                lat: map.center.lat(),
                lng: map.center.lng(),
            })
        }

        setIsMounted(true)
    }, [map, mapSetup, placeDetailsEnabled, location])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
        // setMapSetup(false)
    }, [])

    return isLoaded ? (
        <Stack className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerPosition}
                onLoad={onLoad}
                // onZoomChanged={(e) =>

                // }
                zoom={zoom}
                onUnmount={onUnmount}
                onMouseDown={(e) => {
                    setMapSetup(true)
                    setDisablePickButton(true)

                    // setPlaceDetailsEnabled(false)
                }}
                onMouseUp={(e) => {
                    setMapSetup(false)
                    setDisablePickButton(false)
                    setLocationEnabled(true)
                    setLocation({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setCenterPosition({
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    })
                    setPlaceDetailsEnabled(false)
                    setPlaceDescription(undefined)
                }}
                //  yesIWantToUseGoogleMapApiInternals
                onZoomChanged={() => {
                    // setMapSetup(true)
                    if (map) {
                        setLocationEnabled(true)
                        setLocation({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                        setCenterPosition({
                            lat: map.center.lat(),
                            lng: map.center.lng(),
                        })
                        // setPlaceDetailsEnabled(false)
                    }
                }}
                options={options}
            >
                {!locationLoading ? (
                    <img
                        src={markerIcon.src}
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -63,
                            marginLeft: -32,
                            left: '50%',
                            top: '50%',
                            height: '70px',
                            width: '60px',
                        }}
                    />
                ) : (
                    <Stack
                        alignItems="center"
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            marginTop: -37,
                            marginLeft: -11,
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <CircularProgress />
                    </Stack>
                )}
                {/*{isMounted && !locationLoading ? (*/}
                {/*    <Marker*/}
                {/*        position={centerPosition}*/}
                {/*        // icon={*/}
                {/*        //     'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'*/}
                {/*        // }*/}
                {/*        // icon={<LocationOnIcon fontSize="large" />}*/}
                {/*        onClick={() => setOpenInfoWindow(true)}*/}
                {/*    >*/}
                {/*        /!* {openInfoWindow && (*/}
                {/*            <InfoWindow*/}
                {/*                show={openInfoWindow}*/}
                {/*                onCloseClick={() => setOpenInfoWindow(false)}*/}
                {/*            >*/}
                {/*                <span>Something</span>*/}
                {/*            </InfoWindow>*/}
                {/*        )} *!/*/}
                {/*    </Marker>*/}
                {/*) : (*/}
                {/*    // <div style={{ display: 'flex', justifyContent: 'center' }}>*/}
                {/*    <Stack*/}
                {/*        alignItems="center"*/}
                {/*        style={{*/}
                {/*            zIndex: 3,*/}
                {/*            position: 'absolute',*/}
                {/*            marginTop: -37,*/}
                {/*            marginLeft: -11,*/}
                {/*            left: '50%',*/}
                {/*            top: '50%',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <CircularProgress />*/}
                {/*    </Stack>*/}
                {/*    // </div>*/}
                {/*)}*/}
            </GoogleMap>
        </Stack>
    ) : (
        <></>
    )
}

export default GoogleMapComponent
