import React from 'react'
import { Box } from '@mui/material'
import { Logo } from '../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'

const CustomLogo = ({ logoImg, atlText, height, width }) => {
    const router = useRouter()
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    const handleClick = () => {
        if (router.pathname === '/') {
            if (zoneid) {
                router.push('/home').then()
            } else {
                router.push('/').then()
            }
        } else {
            router.push('/home').then()
        }
    }
    return (
        <Logo height={height} width={width} onClick={handleClick}>
            <img src={logoImg} alt={atlText} />
        </Logo>
    )
}
export default CustomLogo
