import React from 'react'
import { CircularProgress, Stack } from '@mui/material'
export default function Loading() {
    return (
        <Stack
            alignItems="center"
            style={{
                left: '50%',
            }}
        >
            <CircularProgress />
        </Stack>
    )
}
