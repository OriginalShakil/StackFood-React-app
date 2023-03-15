import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Chip, Paper, Popover, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import { useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'
const CustomPaper = styled(Paper)(({ theme, display }) => ({
    position: 'absolute',
    top: 40,
    width: '100%',
    padding: '1rem',
    display: display ? display : 'inherit',
    [theme.breakpoints.down('md')]: {
        zIndex: 999,
    },
}))
const SearchSuggestionsBottom = (props) => {
    const { setOpenSearchSuggestions, setOnSearchdiv, setSelectedValue } = props
    const [suggestedKeywords, setSuggestedKeywords] = useState([])
    const { token } = useSelector((state) => state.globalSettings)
    const [list, setList] = useState([])

    const handleSearchSuccess = (res) => {
        setSuggestedKeywords(res.data)
    }
    const { refetch, isRefetching } = useQuery(
        [],
        () => ProductsApi.suggestedProducts(),
        {
            onSuccess: handleSearchSuccess,
            enabled: false,
        }
    )
    const { t } = useTranslation()
    const router = useRouter()
    useEffect(() => {
        let getItem = JSON.parse(localStorage.getItem('searchedValues'))
        if (getItem && getItem.length > 0) {
            setList(getItem)
        }
        if (token) {
            refetch()
        }
    }, [])
    const handleSearchHistoryOnClick = (value) => {
        setSelectedValue(value)
        setOpenSearchSuggestions(false)
        router.push(
            {
                pathname: '/search',
                query: {
                    searchValue: value,
                },
            },
            '/search'
        )
    }
    const handleSearhSuggestionsOnClick = (value) => {
        setSelectedValue(value)
        setOpenSearchSuggestions(false)
        router.push(
            {
                pathname: '/search',
                query: {
                    searchValue: value.substring(0, value.indexOf(' ')),
                },
            },
            '/search'
        )
    }

    const handleDeleteAble = (value) => {
        let getItem = JSON.parse(localStorage.getItem('searchedValues'))
        if (getItem && getItem.length > 0) {
            let newItems = getItem.filter((item) => item !== value)
            setList(newItems)
            localStorage.setItem('searchedValues', JSON.stringify(newItems))
        }
    }
    return (
        <CustomPaper
            elevation={8}
            onMouseEnter={() => setOnSearchdiv(true)}
            onMouseLeave={() => setOnSearchdiv(false)}
            display={token ? 'inherit' : list.length > 0 ? 'inherit' : 'none'}
        >
            <CustomStackFullWidth spacing={1}>
                {list.length > 0 && (
                    <Stack spacing={1}>
                        <CustomTypography>{t('History')}</CustomTypography>
                        <Stack
                            direction="row"
                            gap="10px"
                            flexWrap="wrap"
                            flexGrow={1}
                        >
                            {list
                                .slice(0, 5)
                                .reverse()
                                .map((item, index) => {
                                    return (
                                        <Chip
                                            key={index}
                                            label={item}
                                            onClick={() =>
                                                handleSearchHistoryOnClick(item)
                                            }
                                            onDelete={() =>
                                                handleDeleteAble(item)
                                            }
                                            sx={{ margin: '0px' }}
                                        />
                                    )
                                })}
                        </Stack>
                    </Stack>
                )}
                {suggestedKeywords.length > 0 && (
                    <Stack spacing={1}>
                        <CustomTypography>{t('Suggestions')}</CustomTypography>
                        <Stack
                            direction="row"
                            // spacing={1}
                            flexWrap="wrap"
                            flexGrow={1}
                            alignItems="center"
                            justifyContent="flex-start"
                            gap="10px"
                        >
                            {suggestedKeywords.map((item, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={item.name}
                                        onClick={() =>
                                            handleSearhSuggestionsOnClick(
                                                item.name
                                            )
                                        }
                                    />
                                )
                            })}
                        </Stack>
                    </Stack>
                )}
                {(isRefetching || suggestedKeywords.length === 0) && token &&(
                    <Stack spacing={1}>
                        <Skeleton variant="text" width="120px" />
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            flexGrow={1}
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Skeleton
                                variant="text"
                                width="120px"
                                height="40px"
                            />
                            <Skeleton
                                variant="text"
                                width="120px"
                                height="40px"
                            />
                            <Skeleton
                                variant="text"
                                width="120px"
                                height="40px"
                            />
                        </Stack>
                    </Stack>
                )}
            </CustomStackFullWidth>
        </CustomPaper>
    )
}

SearchSuggestionsBottom.propTypes = {}

export default SearchSuggestionsBottom
