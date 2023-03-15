import React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import {Button, Stack} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
// import {
//     CustomButtonCancel,
//     CustomButtonSuccess,
// } from '../styled-components/CustomButtons.style'
// import { WrapperForCustomDialogConfirm } from '../components/custom-dialog/confirm/CustomDialogConfirm.style'
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {WrapperForCustomDialogConfirm} from "../custom-dialog/confirm/CustomDialogConfirm.style";
import CustomSelectWithFormik from "../custom-select/CustomSelectWithFormik";
import DialogContent from "@mui/material/DialogContent";
import {useFormik} from "formik";
import ValidationSchemaForRestaurant from "../join-restaurant/ValidationSchemaForRestaurant";
import MultiFileUploader from "../multi-file-uploader/MultiFileUploader";
import CustomTextFieldWithFormik from "../form-fields/CustomTextFieldWithFormik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
// import CustomImageContainer from "./CustomImageContainer";
// import StarIcon from "@mui/icons-material/Star";
// import {CustomTypographyGray} from "../styled-components/CustomTypographies.style";


const acceptedFileInputFormat =
    'application/pdf,image/*,text/plain,.doc, .docx,.txt'
const supportedFormatMultiImages = [
    'jpg',
    'jpeg',
    'gif',
    'png',
    'pdf',
    'doc',
    'docx',
    'deb',
]
const RefundModal= (props) => {
    const { open, onClick, onClose, onSuccess, dialogTexts, reasons,formSubmit ,refundIsLoading } = props

    const { t } = useTranslation()
    const RefundRequestFormik = useFormik({
        initialValues: {
            customer_reason:"",
            customer_note:"",
            identity_image: '',
        },
        validationSchema: Yup.object({
            customer_reason: Yup.string()
                .required(t('Please select a reason'))


        }),
        // validationSchema: ValidationSchemaForRestaurant(),
        onSubmit: async (values, helpers) => {

            try {
                formSubmitOnSuccess(values)
            } catch (err) {}
        },
    })

    let reasonsOption = []
    reasons?.forEach((reason) => {
        let obj = {
            label: reason.reason,
            value: reason.reason,
        }
        reasonsOption.push(obj)
    })
    const noteHandler = (value) => {
        RefundRequestFormik.setFieldValue('customer_note', value)
    }
    const reasonsHandler = (value) => {
        RefundRequestFormik.setFieldValue('customer_reason', value)
    }
    const fileImagesHandler = (files) => {


        RefundRequestFormik.setFieldValue('identity_image', files)
    }
    const formSubmitOnSuccess = (values) => {
        formSubmit(values)
    }
    // const imageUrl = `${productImageUrl}/${review.food_image}`
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <WrapperForCustomDialogConfirm>
                <CustomStackFullWidth  spacing={1}>
                <Stack alignItems="start" justifyContent="center">
                    <DialogTitle id="alert-dialog-title" sx={{padding:"10px 24px"}}>
                        <Typography>{t("What’s Wrong With This Order? ")}</Typography>
                    </DialogTitle>
                </Stack>
                    <DialogContent sx={{padding:"10px 24px"}}>
                        <CustomStackFullWidth>
                            <form noValidate onSubmit={RefundRequestFormik.handleSubmit}>
                               <Stack spacing={2}>
                                   <CustomStackFullWidth>
                                       <CustomSelectWithFormik
                                           selectFieldData={reasonsOption}
                                           inputLabel={t('Select an option')}
                                           passSelectedValue={reasonsHandler}
                                           touched={RefundRequestFormik.touched.customer_reason}
                                           errors={RefundRequestFormik.errors.customer_reason}
                                           fieldProps={RefundRequestFormik.getFieldProps(
                                               'customer_reason' )}/>
                                   </CustomStackFullWidth>
                                   <CustomStackFullWidth>
                                       <CustomTextFieldWithFormik
                                           type="text"
                                           label={t('Note')}
                                           touched={RefundRequestFormik.touched.customer_note}
                                           errors={RefundRequestFormik.errors.customer_note}
                                           fieldProps={RefundRequestFormik.getFieldProps(
                                               'customer_note'
                                           )}
                                           onChangeHandler={noteHandler}
                                           value={RefundRequestFormik.values.customer_note}
                                           multiline="true"
                                           rows="2"
                                       />
                                   </CustomStackFullWidth>
                                   <CustomStackFullWidth paddingTop="20px">
                                       <MultiFileUploader
                                           fileImagesHandler={fileImagesHandler}
                                           totalFiles={
                                               RefundRequestFormik.values.identity_image
                                           }
                                           maxFileSize={20000000}
                                           supportedFileFormats={
                                               supportedFormatMultiImages
                                           }
                                           acceptedFileInputFormat={
                                               acceptedFileInputFormat
                                           }
                                           labelText={t("file Upload")}
                                           width="8rem"
                                           gridControl="true"
                                       />
                                   </CustomStackFullWidth>
                                   <CustomStackFullWidth>
                                       <DialogActions sx={{padding:"0px"}}>
                                           <Stack
                                               alignItems="center"
                                               justifyContent="center"
                                               width="100%">

                                               <LoadingButton type="submit" variant="contained" sx={{width:"100%"}}
                                                              loading={refundIsLoading}>
                                                   {t("Submit Refund Request")}
                                               </LoadingButton>
                                           </Stack>
                                       </DialogActions>
                                   </CustomStackFullWidth>
                               </Stack>

                            </form>
                        </CustomStackFullWidth>
                    </DialogContent>


                </CustomStackFullWidth>
            </WrapperForCustomDialogConfirm>
        </Dialog>
    )
}

RefundModal.propTypes = {}

export default RefundModal
