import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'

const ClosedNowOverlay = (props) => {
    const { t, theme } = props
    return (
        <Stack
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                background: (theme) => theme.palette.primary.overLay,
                opacity: '0.5',
                color: (theme) => theme.palette.neutral[100],
                padding: '10px',
                height: '30%',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: '12px',
                borderBottomLeftRadius: '12px',
            }}
        >
            <Typography
                variant="h5"
                align="center"
                color={theme.palette.neutral[100]}
            >
                {t('Closed Now')}
            </Typography>
        </Stack>
    )
}

ClosedNowOverlay.propTypes = {}

export default ClosedNowOverlay
