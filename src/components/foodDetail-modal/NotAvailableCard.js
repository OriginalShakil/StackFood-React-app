import React from 'react'
import { Typography, Box, Stack } from '@mui/material'
import { isAvailable } from '../../utils/customFunctions'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const NotAvailableCard = ({ endTime, startTime }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Box textAlign="center">
            <Box
                bgcolor={(theme) => theme.palette.error.info}
                borderRadius="10px"
                padding="1rem"
                mt={{ xs: '7px' }}
            >
                <Stack spacing={1} alignItems="center">
                    <Typography
                        color={(theme) => theme.palette.primary.main}
                        variant="h4"
                    >
                        {t('Not Available now')}
                    </Typography>
                    <Typography variant="h5">
                        {t('Available will be')}: {`${startTime} - ${endTime}`}
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}
export default NotAvailableCard
