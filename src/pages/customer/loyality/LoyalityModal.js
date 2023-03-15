import React from 'react'
import { Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import { LoyalityApi } from '../../../hooks/react-query/config/LoyalityApi'
import * as Yup from 'yup'
import { BoxStyle } from '../../../components/customer-page/loyality/Loyality.style'
import { CustomColouredTypography } from '../../../styled-components/CustomStyles.style'
import { getAmount } from '../../../utils/customFunctions'
import {
    onErrorResponse,
    onSingleErrorResponse,
} from '../../../components/ErrorResponse'
import { useTheme } from '@mui/material/styles'

const LoyalityModal = ({
    setLoyalityModal,
    loyalitydata,
    refetch,
    profileRefatch,
    loyalityModal,
}) => {
    const theme = useTheme()
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (global) {
        currencySymbol = global?.currency_symbol
        currencySymbolDirection = global?.currency_symbol_direction
        digitAfterDecimalPoint = global?.digit_after_decimal_point
    }
    const { t } = useTranslation()
    const notify = (i) => toast(i)
    const loyalityFormik = useFormik({
        initialValues: { point: loyalitydata ? loyalitydata : 0 },
        validationSchema: Yup.object({
            point: Yup.number().required('Please give an amount'),
        }),
        onSubmit: async (values, helpers) => {
            if (
                values.point <= loyalitydata &&
                values.point >= global?.loyalty_point_exchange_rate
            ) {
                if (values.point < global?.minimum_point_to_transfer) {
                    toast.error(
                        `Please exchange more than ${global?.minimum_point_to_transfer} points`
                    )
                } else {
                    try {
                        formSubmitHandler(values)
                    } catch (err) {}
                }
            } else {
                toast.error('insufficient amount')
            }
        },
    })
    const formSubmitHandler = (values) => {
        const onSuccessHandler = async (response) => {
            if (response.status === 203) {
                response?.data?.errors?.forEach((item) =>
                    toast.error(item.message)
                )
            } else {
                toast.success(response?.data?.message)
                setLoyalityModal(false)
                await refetch()
                await profileRefatch()
            }
        }
        loyalityToWalletMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onErrorResponse,
        })
    }
    const {
        mutate: loyalityToWalletMutate,
        isLoading,
        error,
    } = useMutation('loyalityToWallet', LoyalityApi.loyalityToWallet)

    // const formSubmitOnSuccess = (values) => {
    //     formSubmitHandler(values)
    // }

    const handleClose = () => {
        setLoyalityModal(false)
    }
    const point = t('points')
    return (
        <>
            <Modal
                open={loyalityModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxStyle>
                    <Typography
                        variant="h5"
                        align="center"
                        mb=".5rem"
                        color={theme.palette.neutral[1000]}
                    >
                        {t(
                            'Your loyalty point will convert to currency and transfer to wallet'
                        )}
                    </Typography>
                    <CustomColouredTypography
                        align="center"
                        variant="h5"
                        color="primary.main"
                    >
                        {`${
                            global?.loyalty_point_exchange_rate
                        } ${point} = ${getAmount(
                            1,
                            currencySymbolDirection,
                            currencySymbol,
                            digitAfterDecimalPoint
                        )}`}
                    </CustomColouredTypography>
                    <Stack mt="1rem">
                        <form noValidate onSubmit={loyalityFormik.handleSubmit}>
                            <TextField
                                required={true}
                                type="number"
                                sx={{
                                    width: '100%',
                                    color: (theme) =>
                                        theme.palette.neutral[1000],
                                }}
                                id="outlined-basic"
                                label={t('Amount')}
                                variant="outlined"
                                name="point"
                                value={loyalityFormik.values.point}
                                onChange={loyalityFormik.handleChange}
                                defaultValue={loyalityFormik.values.point}
                                error={
                                    loyalityFormik.touched.point &&
                                    Boolean(loyalityFormik.errors.point)
                                }
                                helperText={
                                    loyalityFormik.touched.point &&
                                    loyalityFormik.errors.point
                                }
                            />
                            <Stack justifyContent="center" mt="1rem">
                                <Button variant="contained" type="submit">
                                    {t('Submit')}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </BoxStyle>
            </Modal>
        </>
    )
}
export default LoyalityModal
