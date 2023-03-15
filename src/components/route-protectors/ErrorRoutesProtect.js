import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from "react-query";
import {ConfigApi} from "../../hooks/react-query/config/useConfig";
import Router from 'next/router'
const ErrorRoutesProtect = ({children}) => {
    const { data } = useQuery(
        ['config'],
        ConfigApi.config
    )
    const handleRedirect =()=>{
        Router.push('/')
    }
    return (
        <>
            {data ? handleRedirect() : children}
        </>
    );
};

ErrorRoutesProtect.propTypes = {

};

export default ErrorRoutesProtect;