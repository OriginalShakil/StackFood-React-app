import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { alpha, Grid, Stack, styled } from '@mui/material'
import buttonImg from '../../../public/static/buttonImg/image 30.png'
import buttonImg2 from '../../../public/static/buttonImg/image 29.png'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
export const PrimaryButton = styled(Button)(
    ({ backgroundColor, hoverBackgroundColor, borderRadius, theme }) => ({
        backgroundColor: backgroundColor,
        borderRadius: borderRadius ? borderRadius : '8px',
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
            color: hoverBackgroundColor,
        },
    })
)
export default function FoodOrRestaurant({
    foodOrRestaurant,
    setFoodOrRestaurant,
}) {
    const { t } = useTranslation()
    const theme = useTheme()
    const orangeColor = theme.palette.primary.main
    const isProduct = foodOrRestaurant === 'products'
    const isRestaurant = foodOrRestaurant === 'restaurants'
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    React.useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    return (
        <>
            {languageDirection && (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    direction="row"
                    spacing={2}
                    gap={languageDirection === 'rtl' && '10px'}
                >
                    <PrimaryButton
                        onClick={() => setFoodOrRestaurant('products')}
                        backgroundColor={
                            isProduct
                                ? orangeColor
                                : theme.palette.whiteContainer.main
                        }
                        hoverBackgroundColor={isProduct ? 'white' : 'black'}
                        sx={{
                            color: isProduct ? 'white' : 'black',
                            width: '179px',
                        }}
                    >
                        {t('Food')}
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={() => setFoodOrRestaurant('restaurants')}
                        backgroundColor={
                            isRestaurant
                                ? orangeColor
                                : theme.palette.whiteContainer.main
                        }
                        hoverBackgroundColor={isRestaurant ? 'white' : 'black'}
                        sx={{
                            color: isRestaurant ? 'white' : 'black',
                            width: '179px',
                        }}
                    >
                        {t('Restaurant')}
                    </PrimaryButton>
                </Stack>
            )}
        </>
    )
}
