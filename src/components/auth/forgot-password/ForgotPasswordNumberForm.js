import React from "react"
import {Box,Stack,Typography} from "@mui/material"
import { useFormik } from 'formik'
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {useTranslation} from "react-i18next";
import CustomPhoneInput from "../../CustomPhoneInput";
import {useSelector} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import {useForgotPassword} from "../../../hooks/react-query/config/forgot-password/useForgotPassword";
import * as Yup from 'yup'
import toast from "react-hot-toast";
import {onErrorResponse} from "../../ErrorResponse";
const  ForgotPasswordNumberForm=({data, goNext, handleFirstForm})=>{
    const{t}=useTranslation()
    const { global, token } = useSelector((state) => state.globalSettings)
    const phoneFormik=useFormik({
        initialValues:{
            phone:data ? data.phone : ""
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('Please give a phone number'))
                .min(10, 'number must be 10 digits'),

        })
        ,
        onSubmit: async (values, helpers) => {

            try {
                formSubmitHandler(values)

            } catch (err) {

            }
        },    })


    const onSuccessHandler=(res)=>{

           if(res){
               goNext()
               toast.success(res.message)
           }

    }

    const {mutate,isLoading} =useForgotPassword(
        {
            onSuccessHandler,
            onError: (errors) => {

                onErrorResponse(errors)
            }
        }
    )
    const formSubmitHandler = (values) => {
        handleFirstForm(values)
        mutate(values,
            {onSuccess: onSuccessHandler,onError:onErrorResponse}
    )
    }
    const handleOnChange = (value) => {
        phoneFormik.setFieldValue('phone', `+${value}`)
    }
    return(

        <Box>
            <CustomStackFullWidth>
                <Stack>
                    <Typography>
                        {t("Please enter your register Mobile Number")}
                    </Typography>
                </Stack>
                <Stack mt="2rem" padding="0 20px">
                    <form noValidate onSubmit={phoneFormik.handleSubmit}>
                        <CustomPhoneInput  value={phoneFormik.values.phone}
                                           onHandleChange={handleOnChange}
                                           initCountry={global?.country}
                                           touched={phoneFormik.touched.phone}
                                           errors={phoneFormik.errors.phone}/>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            {t ("Next")}
                        </LoadingButton>

                    </form>

                </Stack>

            </CustomStackFullWidth>

        </Box>
    )
 }
export default ForgotPasswordNumberForm