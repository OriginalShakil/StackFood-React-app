import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'

const AddOrderToCart = (props) => {
    const { product, t, addToCard, orderNow } = props
    return (
        <>
            {!product?.available_date_starts ? (
                <Button
                    // disabled={quantity <= 0}
                    onClick={() => addToCard?.()}
                    variant="contained"
                    fullWidth
                >
                    <CustomTypography
                        sx={{
                            color: (theme) => theme.palette.whiteContainer.main,
                        }}
                    >
                        {t('Add to cart')}
                    </CustomTypography>
                </Button>
            ) : (
                <Button
                    // disabled={quantity <= 0}
                    onClick={() => orderNow?.()}
                    variant="contained"
                    fullWidth
                >
                    <CustomTypography
                        sx={{
                            color: (theme) => theme.palette.whiteContainer.main,
                        }}
                    >
                        {t('Order Now')}
                    </CustomTypography>
                </Button>
            )}
        </>
    )
}
export default AddOrderToCart
