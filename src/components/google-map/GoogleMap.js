import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

const GoogleMap = ({ children, ...props }) => (
    <GoogleMapReact
        bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
            // key: 'AIzaSyDiDGVR1GnClPIXcsOOvAniamtAmS-MHjY',
        }}
        {...props}
    >
        {children}
    </GoogleMapReact>
)

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
}

GoogleMap.defaultProps = {
    children: null,
}

export default GoogleMap
