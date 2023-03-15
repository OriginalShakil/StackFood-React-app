import React, { useState } from 'react'
import {
    DirectionsRenderer,
    GoogleMap,
    LoadScript,
    DirectionsService,
    Marker,
} from '@react-google-maps/api'
import { Stack } from '@mui/material'
import GMap from './GMap'
//import GoogleMap from '../google-map/GoogleMap'
//import Marker from '../google-map/Marker'
//import isEmpty from 'lodash.isempty'

const location = {
    lat: 23.791599,
    lng: 90.389099,
}
// Return map bounds based on list of places
// const getMapBounds = (map, maps, places) => {
//     const bounds = new maps.LatLngBounds()

//     places.forEach((place) => {
//         bounds.extend(
//             new maps.LatLng(
//                 place.geometry.location.lat,
//                 place.geometry.location.lng
//             )
//         )
//     })
//     return bounds
// }

// Re-center map when resizing the window
// const bindResizeListener = (map, maps, bounds) => {
//     maps.event.addDomListenerOnce(map, 'idle', () => {
//         maps.event.addDomListener(window, 'resize', () => {
//             map.fitBounds(bounds)
//         })
//     })
// }
// Fit map to its bounds after the api is loaded
// const apiIsLoaded = (map, maps, places) => {
//     // Get bounds by our places
//     const bounds = getMapBounds(map, maps, places)
//     // Fit map to bounds
//     map.fitBounds(bounds)
//     // Bind the resize listener
//     bindResizeListener(map, maps, bounds)
// }
const MapDirections = () => {
    const [response, setResponse] = useState(null)

    const directionsCallback = (res) => {
        if (res != null) {
            setResponse(res)
        }
    }
    //const [places, setPlaces] = useState([])
    return (
        <Stack className="map">
            {/* {!isEmpty(places) && ( */}
            {/* <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                    apiIsLoaded(map, maps, places)
                }
            >
                {places.map((place) => (
                        <Marker
                            key={place.id}
                            text={place.name}
                            lat={place.geometry.location.lat}
                            lng={place.geometry.location.lng}
                            // lat={-34.397}
                            // lng={150.644}
                        />
                    ))}
            </GoogleMap> */}
            {/* )} */}
            <GMap />
            {/* <LoadScript googleMapsApiKey="">
                <GoogleMap
                    id="direction-example"
                    mapContainerStyle={{
                        height: '410px',
                        width: '100%',
                    }}
                    zoom={2}
                    defaultCenter={{ lat: 23.8103, lng: 90.4125 }}
                >
                    <Marker position={{ lat: 23.8103, lng: 90.4125 }} />
                    <DirectionsService
                        options={{
                            destination: 'Mirpur-1,Dhaka',
                            origin: 'Mirpur-10, Dhaka',
                            travelMode: 'DRIVING',
                        }}
                        callback={directionsCallback}
                    />
                    {response !== null && (
                        <DirectionsRenderer
                            options={{
                                directions: response,
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript> */}
        </Stack>
    )
}

export default MapDirections
