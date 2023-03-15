import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    &:hover {
        z-index: 1;
    }
`

//const Marker = ({ text, onClick }) => <Wrapper alt={text} onClick={onClick} />
const Marker = ({ text, onClick }) => (
    <LocationOnIcon
        // style={{
        //     zIndex: 3,
        //     position: 'absolute',
        //     marginTop: -37,
        //     marginLeft: -11,
        //     left: '50%',
        //     top: '50%',
        // }}
        onClick={onClick}
        fontSize="large"
    />
)

Marker.defaultProps = {
    onClick: null,
}

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
}

export default Marker
