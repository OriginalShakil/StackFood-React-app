import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Autocomplete, Paper, styled, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CssTextField = styled(TextField)(({ theme, border }) => ({
    '& label.Mui-focused': {
        color: '#EF7822',
        background: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#EF7822',
        background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        border: border ? border : '',
        '& fieldset': {
            borderColor: '#EF7822',
        },
        '&:hover fieldset': {
            borderColor: '#EF7822',
            border: `1px solid ${border}`,
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EF7822',
        },
    },
}))
// const CssTextField = styled(TextField)({
//     '& label.Mui-focused': {
//         color: '#EF7822',
//         background: '#fff',
//     },
//     '& .MuiInput-underline:after': {
//         borderBottomColor: '#EF7822',
//         background: '#fff',
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//         border: 'none',
//     },
//     '& .MuiOutlinedInput-root': {
//         border: '2px solid #EF7822 ',
//         '& fieldset': {
//             borderColor: '#EF7822',
//         },
//         '&:hover fieldset': {
//             borderColor: '#EF7822',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#EF7822',
//         },
//     },
// })
const CustomMapSearch = ({
    border,
    setSearchKey,
    setEnabled,
    predictions,
    setPlaceId,
    setPlaceDescription,
    setPlaceDetailsEnabled,
    searchKey,
    placeDescription,
    isLoadingPlacesApi,
}) => {
    const { t } = useTranslation()

    return (
        <>
            <CustomStackFullWidth mb="1rem">
                <Paper
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                >
                    <Autocomplete
                        fullWidth
                        freeSolo
                        id="combo-box-demo"
                        getOptionLabel={(option) => option.description}
                        options={predictions}
                        value={searchKey}
                        loading={isLoadingPlacesApi}
                        loadingText={t('Loading...')}
                        // noOptionsText={t('No location found.')}
                        //defaultValue={predictions[0]}
                        onChange={(event, value) => {
                            if (value) {
                                if (value.place_id) {
                                    setPlaceId(value?.place_id)
                                    setPlaceDescription(value?.description)
                                }
                            }
                            setPlaceDetailsEnabled(true)
                        }}
                        // onSelect={(event) => handleTag(event, 'tags')}
                        clearOnBlur={true}
                        //value={searchKey}
                        // sx={{ width: 300 }}
                        // inputValue={searchKey}
                        // onInputChange={(event, newInputValue) => {
                        //     setSearchKey(newInputValue)
                        // }}
                        renderInput={(params) => (
                            <CssTextField
                                border={border}
                                label={t('Search location')}
                                {...params}
                                placeholder={t('Search location here...')}
                                onChange={(event) => {
                                    setSearchKey({
                                        description: event.target.value,
                                    })
                                    if (event.target.value) {
                                        setEnabled(true)
                                    } else {
                                        setEnabled(false)
                                    }
                                }}
                                // onSubmit={() => {
                                //     if (predictions.length > 0) {
                                //         setSearchKey({
                                //             description:
                                //                 predictions[0].description,
                                //         })
                                //     }
                                // }}
                            />
                        )}
                    />
                </Paper>
            </CustomStackFullWidth>
        </>
    )
}
export default CustomMapSearch
