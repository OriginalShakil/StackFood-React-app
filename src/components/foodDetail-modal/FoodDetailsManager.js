import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Stack } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import {
    CustomFavButton,
    FoodSubTitleTypography,
    FoodTitleTypographyDetails,
    RatingStarIcon,
    RatingWrapTypography,
} from '../food-card/FoodCard.style'
import { CustomTypographyTag } from '../../styled-components/CustomTypographies.style'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const FoodDetailsManager = (props) => {
    const {
        handleDiscountChip,
        image,
        modalData,
        product,
        t,
        router,
        isInList,
        deleteWishlistItem,
        addToFavorite,
        theme,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
    } = props
    return (
        <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 2 }}
            direction="row"
            paddingRight={{ xs: '10px', md: '0px' }}
        >
            <Grid item xs={12} sm={5} md={5}>
                {handleDiscountChip(
                    product,
                    t,
                    currencySymbolDirection,
                    currencySymbol,
                    digitAfterDecimalPoint
                )}
                <CustomImageContainer
                    src={image}
                    borderRadius=".3rem"
                    width="100%"
                    height="200px"
                    alt="The house from the offer."
                />
            </Grid>
            <Grid item md={5} sm={5} xs={12}>
                <Stack paddingLeft={{ xs: '10px', md: '0px' }} width="100%">
                    <CustomStackFullWidth>
                        <CustomStackFullWidth
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            flexWrap="wrap"
                            spacing={0.5}
                        >
                            <FoodTitleTypographyDetails
                                gutterBottom
                                variant="h6"
                                component="h6"
                                sx={{
                                    margin: '0',
                                    justifyContent: 'left',
                                }}
                            >
                                {modalData.length > 0 && modalData[0].name}
                            </FoodTitleTypographyDetails>
                            <CustomTypographyTag
                                color="primary.main"
                                sx={{ fontSize: '14px' }}
                            >
                                {Number(product?.veg) === 0
                                    ? t('(Non-Veg)')
                                    : t('(Veg)')}
                            </CustomTypographyTag>
                        </CustomStackFullWidth>
                        {router?.pathname !== `/restaurant/[id]` ? (
                            <Link
                                href={`/restaurant/${product?.restaurant_id}`}
                            >
                                <FoodSubTitleTypography
                                    variant="subtitle1"
                                    sx={{
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                    }}
                                >
                                    {modalData.length > 0 &&
                                        modalData[0].restaurant_name}
                                </FoodSubTitleTypography>
                            </Link>
                        ) : (
                            <FoodSubTitleTypography
                                variant="subtitle1"
                                sx={{
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                {modalData.length > 0 &&
                                    modalData[0].restaurant_name}
                            </FoodSubTitleTypography>
                        )}
                    </CustomStackFullWidth>
                    <CustomStackFullWidth direction="row">
                        <RatingWrapTypography
                            variant="subtitle2"
                            sx={{
                                textAlign: 'left',
                            }}
                        >
                            {modalData.length > 0 &&
                                modalData[0]?.avg_rating?.toFixed(1)}
                            <RatingStarIcon
                                fontSize="small"
                                sx={{
                                    ml: '3px',
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            />
                        </RatingWrapTypography>
                    </CustomStackFullWidth>

                    <FoodTitleTypographyDetails
                        sx={{
                            fontSize: '1rem',
                            marginTop: '.8rem',
                            marginBottom: '.4rem',
                            textAlign: 'left',
                        }}
                    >
                        {t('Description')}
                    </FoodTitleTypographyDetails>
                    <FoodSubTitleTypography
                        variant="subtitle1"
                        color={theme.palette.neutral[400]}
                        sx={{
                            textAlign: 'left',
                        }}
                    >
                        {modalData.length > 0 && modalData[0].description}
                    </FoodSubTitleTypography>
                </Stack>
            </Grid>
            {!product?.available_date_ends && (
                <Grid
                    item
                    sm={2}
                    xs={12}
                    md={2}
                    paddingLeft={{ xs: '10px', md: '0px' }}
                >
                    {isInList(product.id) ? (
                        <Stack
                            paddingLeft={{
                                xs: '10px',
                                md: '0px',
                            }}
                            width="44px"
                        >
                            <CustomFavButton
                                onClick={() => deleteWishlistItem(product.id)}
                            >
                                <IconButton>
                                    <FavoriteIcon
                                        fontSize="medium"
                                        color="primary"
                                    />
                                </IconButton>
                            </CustomFavButton>
                        </Stack>
                    ) : (
                        <Stack
                            paddingLeft={{
                                xs: '10px',
                                md: '0px',
                            }}
                            width="44px"
                        >
                            <CustomFavButton onClick={() => addToFavorite()}>
                                <IconButton>
                                    <FavoriteBorderIcon
                                        fontSize="medium"
                                        color="primary"
                                    />
                                </IconButton>
                            </CustomFavButton>
                        </Stack>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

FoodDetailsManager.propTypes = {}

export default FoodDetailsManager
