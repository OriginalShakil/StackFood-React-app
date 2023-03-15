import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/material'
import markerIcon from '../../../../public/static/markerIcon.png'
const containerStyle = {
    width: '100%',
    height: '450px',
}

const MapComponent = ({ latitude, longitude }) => {
    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    }

    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )
    const [isMounted, setIsMounted] = useState(false)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    useEffect(() => {
        if (map) {
            setIsMounted(true)
        }
    }, [map])

    return isLoaded ? (
        <Stack className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onLoad={onLoad}
                zoom={10}
                onUnmount={onUnmount}
                options={options}
            >
                {isMounted ? (
                    <Marker
                        position={center}
                        icon={{
                            url: require('../../../../public/static/markerIcon.png'),
                            scale: 7,
                        }}
                    ></Marker>
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
            </GoogleMap>
        </Stack>
    ) : (
        <></>
    )
}

export default MapComponent
