import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const ProtectRefund = props => {
    const {children} = props
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const handleRedirect = ()=>{
        router.push('/')
    }
    return (
        <div>
            {
                global && Number.parseInt(global?.refund_policy_status)===0 ? handleRedirect() : children
            }

        </div>
    );
};



export default ProtectRefund;
