import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomTypographyGray } from '../error/Errors.style'
import { useGetCategory } from '../../hooks/react-query/interest/useGetCategory'
import { Grid } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import { useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { usePostSelectedCategory } from '../../hooks/react-query/interest/usePostSelectedCategory'
import Router from 'next/router'
import { onErrorResponse } from '../ErrorResponse'
import { toast } from 'react-hot-toast'
import InterestShimmer from './InterestShimmer'

const InterestOptions = (props) => {
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    const [selectedId, setSelectedId] = useState([])
    const [categoryList, setCategoryList] = useState([])


    const onSuccessHandler = (response) => {
        setCategoryList(response)
    }
    const { refetch } = useGetCategory(onSuccessHandler)
    useEffect(async () => {
        await refetch()
    }, [])
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const handleItemClick = (item) => {
        //state manipulation with select deselect
        const isItemAlreadyExist = selectedId.find((id) => id === item.id)
        if (isItemAlreadyExist) {
            const newArray = selectedId.filter((id) => id !== item.id)
            setSelectedId(newArray)
        } else {
             setSelectedId((prevState) => [...prevState, item.id])
        }
    }
    const handleBorder = (itemId) => {
        const isExist = selectedId.find((item) => item === itemId)
        return !!isExist
    }
    //post handle
    const { mutate, isLoading } = usePostSelectedCategory()
    const handleSubmit = () => {
        mutate(
            { interest: selectedId },
            {
                onSuccess: (response) => {
                    toast.success(response?.message)
                    Router.push('/home')
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.message)
                },
            }
        )
    }
    return (
        <CustomStackFullWidth
            spacing={1}
            alignItems="center"
            justifyContent="center"
        >
            <CustomTypographyBold
                variant="h3"
                sx={{ color: (theme) => theme.palette.neutral[1000] }}
            >
                {t('Choose Your Interests')}
            </CustomTypographyBold>
            <CustomTypographyGray variant="h4" nodefaultfont="true">
                {t('Get personalized food recommendations.')}
            </CustomTypographyGray>
            <Grid container spacing={2}>
                {categoryList.length > 0 ? (
                    categoryList.map((item, index) => {
                        return (
                            <Grid
                                key={index}
                                onClick={() => handleItemClick(item)}
                                item
                                xs={6}
                                sm={3}
                                md={2}
                                lg={2}
                                align="center"
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <CustomPaperBigCard
                                    padding=".5rem"
                                    sx={{
                                        border:
                                            handleBorder(item.id) &&
                                            '2px solid',
                                        borderColor:
                                            handleBorder(item.id) &&
                                            'primary.main',
                                    }}
                                >
                                    <CustomStackFullWidth spacing={1}>
                                        <CustomImageContainer
                                            height={isSmall ? '100px' : '150px'}
                                            width="100%"
                                            src={`${global?.base_urls?.category_image_url}/${item.image}`}
                                        />
                                        <CustomTypography>
                                            {item.name}
                                        </CustomTypography>
                                    </CustomStackFullWidth>
                                </CustomPaperBigCard>
                            </Grid>
                        )
                    })
                ) : (
                    <InterestShimmer />
                )}
                <Grid item xs={12} md={12} align="center">
                    <LoadingButton
                        disabled={selectedId.length === 0}
                        loading={isLoading}
                        variant="contained"
                        sx={{
                            marginTop: '1rem',
                            width: { xs: 'auto', sm: '200px' },
                        }}
                        onClick={() => handleSubmit()}
                    >
                        {t('Save')}
                    </LoadingButton>
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    )
}

InterestOptions.propTypes = {}

export default InterestOptions
