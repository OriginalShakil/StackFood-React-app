import React, { useState } from 'react'
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { Button, Container, Grid, InputBase, Paper } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomTypographyGray } from '../error/Errors.style'
import { StyledButton } from '../food-card/FoodCard.style'
import { usePostNewsletterEmail } from '../../hooks/react-query/newsletter/usePostNewsletterEmail'
import { toast } from 'react-hot-toast'
import { onSingleErrorResponse } from '../ErrorResponse'
import LoadingButton from '@mui/lab/LoadingButton'

const FooterTop = () => {
    const [emailAddress, setEmailAddress] = useState(null)
    const { t } = useTranslation()
    const languageDirection = localStorage.getItem('direction')
    const { mutate, isLoading } = usePostNewsletterEmail()
    const handleSubmit = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: () =>
                        toast.success(t('Subscribed Successfully')),
                    onError: onSingleErrorResponse,
                }
            )
        } else {
            toast.error(t('Please insert a valid email.'))
        }
    }
    return (
        <CustomStackFullWidth
            alignItems="center"
            py="2rem"
            sx={{ backgroundColor: (theme) => theme.palette.footerTopBgColor }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3.5}>
                        <CustomStackFullWidth>
                            <CustomColouredTypography
                                variant="h3"
                                color="whiteContainer.main"
                            >
                                {t('Lets Connect !')}
                            </CustomColouredTypography>
                            <CustomTypographyGray
                                nodefaultfont="true"
                                variant="h6"
                            >
                                {t(
                                    'Stay upto date with restaurants and foods around you'
                                )}
                            </CustomTypographyGray>
                        </CustomStackFullWidth>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            // variant="outlined"
                            elevation={0}
                            sx={{
                                mt: 1,
                                p: '0',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                maxWidth: '350px',
                                backgroundColor: '#484F5E',
                                // ml: web ? 'none' : 'auto',
                                mr: 'auto',
                            }}
                        >
                            <InputBase
                                sx={{
                                    ml: 1.5,
                                    mr: 1.5,
                                    flex: 1,
                                    backgroundColor: '#484F5E',
                                    color: '#DDE3EA',
                                    align: 'center',
                                }}
                                type="email"
                                placeholder={t('Your Email Address')}
                                onChange={(e) =>
                                    setEmailAddress(e.target.value)
                                }
                            />
                            <LoadingButton
                                loading={isLoading}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'primary.secondary',
                                    },
                                    width: '100px',
                                    borderTopLeftRadius:
                                        languageDirection !== 'rtl' && '0px',
                                    borderBottomLeftRadius:
                                        languageDirection !== 'rtl' && '0px',
                                    borderTopRightRadius:
                                        languageDirection === 'rtl' && '0px',
                                    borderBottomRightRadius:
                                        languageDirection === 'rtl' && '0px',
                                    backgroundColor: 'primary.main',
                                }}
                                variant="contained"
                                type="submit"
                                aria-label="search"
                                onClick={handleSubmit}
                            >
                                {t('Join')}
                            </LoadingButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </CustomStackFullWidth>
    )
}

export default FooterTop
