import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import { CustomColouredTypography } from '../../../styled-components/CustomStyles.style'
import { useTranslation } from 'react-i18next'
import { CustomSwitch } from '../Navbar.style'
import { useTheme } from '@mui/material/styles'

const ThemeSwitches = ({ checked, handleThemeChangeMode,themeMode }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.8}
        >
            {/*<CustomColouredTypography color={theme.palette.neutral[600]}>*/}
            {/*    {t('Dark Mode')}*/}
            {/*</CustomColouredTypography>*/}
            <CustomSwitch checked={checked} onChange={handleThemeChangeMode} />
            <CustomColouredTypography color={theme.palette.neutral[600]}>
                {themeMode === "light"? t('Light Mode'):t('Dark Mode')}
                {/*{t('Light Mode')}*/}
            </CustomColouredTypography>
        </Stack>
    )
}

ThemeSwitches.propTypes = {}

export default ThemeSwitches
