import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Container, Stack } from '@mui/material'
import SuccessCard from '../../components/checkout-page/SuccessCard'
import { useRouter } from 'next/router'
import CheckoutFailed from '../../components/checkout-page/CheckoutFailed'
import { CustomPaperBigCard } from '../../styled-components/CustomStyles.style'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
const Index = (props) => {
    const router = useRouter()
    const { status, amnt } = router.query
    const { t } = useTranslation()

    return (
        <>
            <Meta
                title={
                    status === 'fail'
                        ? t('Order placement failed')
                        : t('Order placed successfully.')
                }
            />
            <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <Stack
                    width="100%"
                    height="60vh"
                    mt={{ xs: '5rem', md: '9rem' }}
                    mb="3rem"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CustomPaperBigCard>
                        {status === 'fail' ? (
                            <CheckoutFailed />
                        ) : (
                            <SuccessCard totalAmount={amnt} />
                        )}
                    </CustomPaperBigCard>
                </Stack>
            </Container>
        </>
    )
}

Index.propTypes = {}

export default Index
