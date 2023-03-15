import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import CustomSearch from '../../custom-search/CustomSearch'
import SearchSuggestionsBottom from '../../search/SearchSuggestionsBottom'
import Wishlist from './Wishlist'

const ManageSearch = ({ zoneid, token, router }) => {
    const [openSearchSuggestions, setOpenSearchSuggestions] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [onSearchdiv, setOnSearchdiv] = useState(false)
    const handleKeyPress = (value) => {
        // if (e.key === 'Enter') {
        setOpenSearchSuggestions(false)
        // Do code here
        // router.push('/search')
        let getItem = JSON.parse(localStorage.getItem('searchedValues'))
        if (getItem && getItem.length > 0) {
            if (value !== '') {
                getItem.push(value)
            }
            localStorage.setItem('searchedValues', JSON.stringify(getItem))
        } else {
            if (value !== '') {
                let newData = []
                newData.push(value)
                localStorage.setItem('searchedValues', JSON.stringify(newData))
            }
        }
        if (value !== '') {
            router.push({
                pathname: '/search',
                query: {
                    searchValue: value,
                },
            })
        }
    }
    const handleOnFocus = () => {
        setOpenSearchSuggestions(true)
        localStorage.setItem('bg', true)
    }
    const searchRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setOpenSearchSuggestions(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchRef])

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                    }}
                    onFocus={() => handleOnFocus()}
                    ref={searchRef}
                >
                    {zoneid && router.pathname !== '/' && (
                        <>
                            <CustomSearch
                                label="Search..."
                                handleSearchResult={handleKeyPress}
                                selectedValue={selectedValue}
                            />
                            {openSearchSuggestions && (
                                <SearchSuggestionsBottom
                                    setOnSearchdiv={setOnSearchdiv}
                                    setOpenSearchSuggestions={
                                        setOpenSearchSuggestions
                                    }
                                    setSelectedValue={setSelectedValue}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

ManageSearch.propTypes = {}

export default ManageSearch
