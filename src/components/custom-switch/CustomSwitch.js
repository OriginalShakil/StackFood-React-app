import React from 'react'
import { CustomSwitchIos } from './CustomSwitch.style'

const label = { inputProps: { 'aria-label': 'Switch demo' } }
const CustomSwitch = (props) => {
    return (
        <>
            <CustomSwitchIos {...label} defaultChecked />
        </>
    )
}

CustomSwitch.propTypes = {}

export default CustomSwitch
