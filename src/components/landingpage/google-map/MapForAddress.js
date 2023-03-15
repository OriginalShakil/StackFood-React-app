// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import {
//     GoogleMap,
//     useJsApiLoader,
//     Marker,
//     OverlayView,
//     InfoWindow,
// } from '@react-google-maps/api'

// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import { CircularProgress } from '@mui/material'
// import { Stack } from '@mui/material'
// const containerStyle = {
//     width: '100%',
//     height: '410px',
// }

// const MapForAddress = ({
//     // setDisablePickButton,
//     // setLocationEnabled,
//     // setLocation,
//     // setCurrentLocation,
//     // locationLoading,
//     location,
//     // setPlaceDetailsEnabled,
//     // placeDetailsEnabled,
//     // locationEnabled,
//     // setPlaceDescription,
// }) => {

//     const mapRef = useRef(GoogleMap)
//     const center = useMemo(
//         () => ({
//             lat: parseFloat(location?.lat),
//             lng: parseFloat(location?.lng),
//         }),
//         []
//     )
//     const options = useMemo(
//         () => ({
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//         }),
//         []
//     )
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
//     })
//     const [isMounted, setIsMounted] = useState(false)
//     const [openInfoWindow, setOpenInfoWindow] = useState(false)
//     const [mapSetup, setMapSetup] = useState(false)

//     useEffect(() => setIsMounted(true), [])

//     const [map, setMap] = useState(null)
//     const [zoom, setZoom] = useState(10)
//     const [centerPosition, setCenterPosition] = useState(center)

//     const onLoad = useCallback(function callback(map) {
//         setZoom(12)
//         setMap(map)
//     }, [])
//     useEffect(() => {
//
//         //if (location && placeDetailsEnabled) {
//         if (location) {
//
//             setCenterPosition(location)
//         }
//         if (map?.center && mapSetup) {

//             setCenterPosition({
//                 lat: map.center.lat(),
//                 lng: map.center.lng(),
//             })
//         }

//         setIsMounted(true)
//     }, [map, mapSetup, location])

//     const onUnmount = useCallback(function callback(map) {

//         setMap(null)
//         // setMapSetup(false)
//     }, [])


//
//     return isLoaded ? (
//         <Stack className="map">
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={centerPosition}
//                 onLoad={onLoad}
//                 // onZoomChanged={(e) =>
//
//                 // }
//                 zoom={zoom}
//                 onUnmount={onUnmount}
//                 // onMouseDown={(e) => {
//
//                 //     setMapSetup(true)
//                 //     setDisablePickButton(true)

//                 //     // setPlaceDetailsEnabled(false)
//                 // }}
//                 // onMouseUp={(e) => {
//
//                 //     setMapSetup(false)
//                 //     setDisablePickButton(false)
//                 //     setLocationEnabled(true)
//                 //     setLocation({
//                 //         lat: map.center.lat(),
//                 //         lng: map.center.lng(),
//                 //     })
//                 //     setCenterPosition({
//                 //         lat: map.center.lat(),
//                 //         lng: map.center.lng(),
//                 //     })
//                 //     setPlaceDetailsEnabled(false)
//                 //     setPlaceDescription(undefined)
//                 // }}
//                 //  yesIWantToUseGoogleMapApiInternals
//                 // onZoomChanged={() => {
//                 //
//                 //     // setMapSetup(true)
//                 //     if (map) {
//                 //
//                 //         setLocationEnabled(true)
//                 //         setLocation({
//                 //             lat: map.center.lat(),
//                 //             lng: map.center.lng(),
//                 //         })
//                 //         setCenterPosition({
//                 //             lat: map.center.lat(),
//                 //             lng: map.center.lng(),
//                 //         })
//                 //         // setPlaceDetailsEnabled(false)
//                 //     }
//                 // }}
//                 options={options}
//
//             >
//                 {/* {!locationLoading && (
//                     <LocationOnIcon
//                         style={{
//                             zIndex: 3,
//                             position: 'absolute',
//                             marginTop: -37,
//                             marginLeft: -11,
//                             left: '50%',
//                             top: '50%',
//                         }}
//                         fontSize="large"
//                     /> */}
//                 <img
//                     src="http://maps.google.com/mapfiles/kml/paddle/blu-blank.png"
//                     style={{
//                         zIndex: 3,
//                         position: 'absolute',
//                         marginTop: -63,
//                         marginLeft: -32,
//                         left: '50%',
//                         top: '50%',
//                     }}
//                 />
//                 {/* )} */}
//                 {/* {isMounted && !locationLoading ? ( */}
//                 {isMounted ? (
//                     <Marker
//                         position={centerPosition}
//                         icon={
//                             'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'
//                         }
//                         // icon={<LocationOnIcon fontSize="large" />}
//                         //onClick={() => setOpenInfoWindow(true)}
//                     >
//                         {/* {openInfoWindow && (
//                             <InfoWindow
//                                 show={openInfoWindow}
//                                 onCloseClick={() => setOpenInfoWindow(false)}
//                             >
//                                 <span>Something</span>
//                             </InfoWindow>
//                         )} */}
//                     </Marker>
//                 ) : (
//                     // <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <Stack
//                         alignItems="center"
//                         style={{
//                             zIndex: 3,
//                             position: 'absolute',
//                             marginTop: -37,
//                             marginLeft: -11,
//                             left: '50%',
//                             top: '50%',
//                         }}
//                     >
//                         <CircularProgress />
//                     </Stack>
//                     // </div>
//                 )}
//             </GoogleMap>
//         </Stack>
//     ) : (
//         <></>
//     )
// }

// export default MapForAddress
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/material'

const containerStyle = {
    width: '100%',
    height: '200px',
}

const MapForAddress = ({
    location,
    setLocation,
    setLocationEnabled,
    locationLoading,
    locationEnabled,
    mounted,
    setMounted,
}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    })
    const center = useMemo(
        () => ({
            lat: parseFloat(location?.lat),
            lng: parseFloat(location?.lng),
        }),
        []
    )
    const [isMounted, setIsMounted] = useState(false)
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(10)
    const [centerPosition, setCenterPosition] = useState(center)
    const [mapSetup, setMapSetup] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const options = useMemo(
        () => ({
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }),
        []
    )

    const onLoad = useCallback(function callback(map) {
        setZoom(12)
        setMap(map)
    }, [])
    useEffect(() => {

        if (location) {

            setCenterPosition(location)
            setIsMounted(true)
        }
        if (map?.center && mapSetup) {

            setCenterPosition({
                lat: map.center.lat(),
                lng: map.center.lng(),
            })
            setIsMounted(true)
        }
    }, [map, mapSetup, location])
    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center)
    //     map.fitBounds(bounds)
    //     setMap(map)
    // }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
            onMouseDown={(e) => {

                setMapSetup(true)
                setIsMounted(false)
                //    setDisablePickButton(true)

                // setPlaceDetailsEnabled(false)
            }}
            onMouseUp={(e) => {

                setMapSetup(false)
                // setDisablePickButton(false)
                setLocationEnabled(true)
                setLocation({
                    lat: map.center.lat(),
                    lng: map.center.lng(),
                })
                setCenterPosition({
                    lat: map.center.lat(),
                    lng: map.center.lng(),
                })

                //   setIsMounted(false)

                // setPlaceDetailsEnabled(false)
                // setPlaceDescription(undefined)
            }}
            // onZoomChanged={() => {


            //     if (map) {

            //         setLocationEnabled(true)
            //         setLocation({
            //             lat: map.center.lat(),
            //             lng: map.center.lng(),
            //         })
            //         setCenterPosition({
            //             lat: map.center.lat(),
            //             lng: map.center.lng(),
            //         })
            //         // setPlaceDetailsEnabled(false)
            //     }
            // }}
        >
            {!locationLoading && (
                <img
                    src="http://maps.google.com/mapfiles/kml/paddle/blu-blank.png"
                    style={{
                        zIndex: 3,
                        position: 'absolute',
                        marginTop: -63,
                        marginLeft: -32,
                        left: '50%',
                        top: '50%',
                    }}
                />
            )}
            {mounted && !locationLoading ? (
                <Marker
                    position={center}
                    icon={
                        'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'
                    }
                    // icon={<LocationOnIcon fontSize="large" />}
                    onClick={() => setOpenInfoWindow(true)}
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
                    {/* <CircularProgress /> */}
                </Stack>
            )}
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(MapForAddress)
