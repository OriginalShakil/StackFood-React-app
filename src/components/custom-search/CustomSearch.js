import React, { useEffect, useState } from 'react'
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from './CustomSearch.style'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
    CloseIconWrapper,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import {IconButton, NoSsr, useTheme} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
const CustomSearch = ({
    handleSearchResult,
    label,
    isLoading,
    selectedValue,
}) => {
    const theme=useTheme()
    const { t } = useTranslation()
    const [value, setValue] = useState('')
    const router = useRouter()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    useEffect(() => {
        setValue(selectedValue)
    }, [selectedValue])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchResult(e.target.value)
            e.preventDefault()
        }
    }
    const handleReset = () => {
        setValue('')
        handleSearchResult('')
    }
    const handleChange = (value) => {
        if (value === '') {
            handleSearchResult('')
        }
        setValue(value)
    }

    return (
        <CustomStackFullWidth>
            <form onSubmit={handleKeyPress}>
                <Search>
                    <SearchIconWrapper languageDirection={languageDirection}>
                        <SearchIcon fontSize="medium" color="primary" />
                    </SearchIconWrapper>
                    <NoSsr>
                        <StyledInputBase
                            placeholder={t(label)}
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(e) => handleKeyPress(e)}
                            languageDirection={languageDirection}

                        />
                    </NoSsr>
                    {value !=='' && (
                        <>
                            {isLoading ? (
                                <CloseIconWrapper right={-1} languageDirection={languageDirection}>
                                    <LoadingButton
                                        loading
                                        variant="text"
                                        sx={{ width: '10px' }}
                                    />
                                </CloseIconWrapper>
                            ) : (
                                <CloseIconWrapper onClick={() => handleReset()} languageDirection={languageDirection}>
                                    <IconButton>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </CloseIconWrapper>
                            )}
                        </>
                    )}
                </Search>
            </form>
        </CustomStackFullWidth>
    )
}

CustomSearch.propTypes = {}

export default CustomSearch
