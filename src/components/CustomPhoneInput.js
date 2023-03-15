import TextField from '@material-ui/core/TextField'
import PhoneInput from 'react-phone-input-2'
import React, { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import { CustomTypography } from './custom-tables/Tables.style'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../styled-components/CustomStyles.style'

const useStyles = makeStyles((theme) => ({
    borderClass: ({ theme, focus, languageDirection, rtlChange }) => ({
        '&.react-tel-input .special-label': {
            color: focus
                ? theme.palette.primary.main
                : theme.palette.neutral[1000],
            left: '10px',
            background: theme.palette.neutral[100],
        },
        '&.react-tel-input .form-control': {
            background: theme.palette.neutral[100],
            color: theme.palette.neutral[1000],
            padding:
                languageDirection === 'rtl'
                    ? '18.5px 58px 18.5px 10px'
                    : '18.5px 14px 18.5px 52px',
        },
        '&.react-tel-input .form-control:focus': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
            zIndex: 999,
            boxShadow: 'none',
        },
        '&.react-tel-input .country-list .country-name': {
            color: '#000000',
        },
        '&.react-tel-input .selected-flag': {
            padding:
                languageDirection === 'rtl' ? '0 25px 0 11px' : ' 0 0px 0 11px',
        },
        '&.react-tel-input .selected-flag .arrow': {
            left: languageDirection === 'rtl' ? '13px' : '29px',
        },
    }),
}))
const CustomPhoneInput = ({
    value,
    onHandleChange,
    initCountry,
    touched,
    errors,
    rtlChange,
}) => {
    const changeHandler = (e) => {
        onHandleChange(e)
    }
    const { t } = useTranslation()
    const theme = useTheme()
    const [languageDirection, setLanguageDirection] = useState('ltr')
    const [focus, setFocus] = useState(false)
    // const themeVariable = theme.palette.primary.main
    const classes = useStyles({ theme, focus, languageDirection, rtlChange })
    const defaultCountry = initCountry?.toLowerCase()
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    return (
        <CustomStackFullWidth alignItems="flex-start" spacing={0.8}>
            <PhoneInput
                autoFormat={false}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder={t('Enter phone number')}
                value={value}
                enableSearchField
                enableSearch
                onChange={changeHandler}
                inputProps={{
                    required: true,
                    autoFocus: false,
                }}
                specialLabel={t('Phone')}
                country={defaultCountry}
                searchStyle={{ margin: '0', width: '95%', height: '50px' }}
                inputStyle={{
                    width: '100%',
                    height: '56px',

                    // borderRadius: '8px',
                }}
                containerClass={classes.borderClass}
                dropdownStyle={{ height: '300px', width: '267px' }}
                onlyCountries={[]}
                //  disableDropdown="false"
            />
            {touched && errors && (
                <CustomTypography
                    variant="caption"
                    sx={{
                        ml: '10px',
                        fontWeight: 'inherit',
                        color: (theme) => theme.palette.error.main,
                    }}
                >
                    {errors}
                </CustomTypography>
            )}
        </CustomStackFullWidth>
    )
}
export default CustomPhoneInput
