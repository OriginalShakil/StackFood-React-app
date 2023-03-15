import React, { useState } from 'react'
// import { Helmet } from 'react-helmet'
import { Container, Stack, Step, StepLabel, Stepper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import AddressForm from './forms/AddressForm'
import PaymentForm from './forms/PaymentForm'
import ReviewOrder from './ReviewOrder'
import { CustomContentWrapper } from './MultistepFormsWithStepper.style'
import CheckoutSuccess from './CheckoutSuccess'
import { useTranslation } from 'react-i18next'

const steps = ['Shipping address', 'Payment details', 'Review your order']
const MultistepFormWithSteppers = (props) => {
    const { t } = useTranslation()
    const [activeStep, setActiveStep] = useState(0)

    const IncrementActiveStep = () => {
        setActiveStep((prevState) => prevState + 1)
    }
    const DecrementActiveStep = () => {
        if (activeStep > 0) {
            setActiveStep((prevState) => prevState - 1)
        }
    }

    const renderStepsContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm onNext={IncrementActiveStep} />
            case 1:
                return (
                    <PaymentForm
                        onNext={IncrementActiveStep}
                        onBack={DecrementActiveStep}
                    />
                )
            case 2:
                return (
                    <ReviewOrder
                        onNext={IncrementActiveStep}
                        onBack={DecrementActiveStep}
                    />
                )
            default:
                return <div>{t('Not Found')}</div>
        }
    }
    return (
        <>
            {/* <Helmet> */}
                <title>{t('Multistep Form With Steppers')}</title>
            {/* </Helmet> */}
            <CustomPaperBigCard>
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Typography component="h1" variant="h4" align="center">
                            {t('Checkout')}
                        </Typography>

                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{t(label)}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <CustomContentWrapper>
                            {activeStep === steps.length ? (
                                <CheckoutSuccess />
                            ) : (
                                <>{renderStepsContent(activeStep)}</>
                            )}
                        </CustomContentWrapper>
                    </Stack>
                </Container>
            </CustomPaperBigCard>
        </>
    )
}

MultistepFormWithSteppers.propTypes = {}

export default MultistepFormWithSteppers
