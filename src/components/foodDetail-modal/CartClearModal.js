import { Button, Grid, Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import { CatMessageStyle } from '../food-card/FoodCard.style'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { CustomTypography } from '../custom-tables/Tables.style'
import { CustomColouredTypography } from '../../styled-components/CustomStyles.style'
import Image from 'next/image'
import warningImage from '../../assets/images/warning.png'

const CustomStyledBox = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    boxShadow: 24,
    padding: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        width: 280,
    },
}))

const CartClearModal = ({
    clearCartModal,
    setClearCartModal,
    clearCartAlert,
    addToCard,
}) => {
    const handleClose = () => setClearCartModal(false)
    const { t } = useTranslation()
    const handleClearCartButton = () => {
        clearCartAlert()
        // addToCard()
        // handleClose()
    }
    const theme = useTheme()

    return (
        <Modal
            open={clearCartModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomStyledBox>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} align="center" mt=".5rem">
                        <Image
                            width={60}
                            height={60}
                            src={warningImage}
                            alt={t('warning')}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <CustomColouredTypography
                            variant="h4"
                            color={theme.palette.error.main}
                        >
                            {t('Are you sure, you want to reset?')}
                        </CustomColouredTypography>
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                        <Typography>
                            {t(
                                'You have food from another restaurant in cart. If you continue, your all previous food from cart will be removed'
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} align="center">
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleClose}
                           sx={{color:(theme)=> theme.palette.primary.main}}
                        >
                            {t('Cancel')}
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={6} align="center">
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClearCartButton}
                        >
                            {t('Clear Cart')}
                        </Button>
                    </Grid>
                </Grid>
            </CustomStyledBox>
        </Modal>
    )
}

export default CartClearModal
