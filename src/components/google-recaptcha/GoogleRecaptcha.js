import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const GoogleRecaptcha = (props) => {
    function onChange(value) {

    }
    return (
        <>
            <ReCAPTCHA sitekey="Your client site key" onChange={onChange} />,
        </>
    )
}

GoogleRecaptcha.propTypes = {}

export default GoogleRecaptcha
