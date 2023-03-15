import React, { useEffect } from 'react'
import { Grid, Box, TextField, Card, Stack } from '@mui/material'
import profileImg from '../../../../public/static/profile/pro.png'
import { SaveButton, ButtonBox } from './Profile.style'
import { useFormik } from 'formik'
import { ProfileApi } from '../../../hooks/react-query/config/profileApi'
import { useMutation } from 'react-query'
import ValidationSechemaProfile from './Validation'
import { toast } from 'react-hot-toast'
import AccountInformation from './AccountInformation'
import BasieInformationForm from './BasicInformationForm'
import BasicInformationForm from './BasicInformationForm'
import { InfoSetByApi } from '../../InfoSetByApi'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import LoadingButton from '@mui/lab/LoadingButton'
import { t } from 'i18next'
import { setUser } from '../../../redux/slices/customer'
import { useDispatch, useSelector } from 'react-redux'
import CustomAlert from '../../alert/CustomAlert'
import { useTranslation } from 'react-i18next'
const BasicInformation = ({ data, refetch, deleteUserHandler }) => {
    const dispatch = useDispatch()
    const {
        mutate: profileUpdateByMutate,
        isLoading,
        error,
    } = useMutation('profileUpdate', ProfileApi.profileUpdate)
    const { t } = useTranslation()
    const formSubmitHandler = (values) => {
        const { f_name, l_name, phone, email, image } = values
        let formData = new FormData()
        formData.append('f_name', f_name)
        formData.append('l_name', l_name)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('image', image)

        const onSuccessHandler = (response) => {
            if (response) {
                toast.success(response.data.message)
                //InfoSetByApi()
                refetch().then()
            }
        }
        profileUpdateByMutate(formData, {
            onSuccess: onSuccessHandler,
        })
    }

    return (
        <Card>
            <Grid
                sx={{
                    borderRadius: '10px',
                    background: (theme) =>
                        theme.palette.background.profileBackground,
                }}
            >
                <BasicInformationForm
                    data={data}
                    formSubmit={formSubmitHandler}
                    deleteUserHandler={deleteUserHandler}
                />
                {data?.social_id ? (
                    <Stack ml="20px" mr="30px" mb="20px">
                        <CustomAlert
                            type="info"
                            text={t(
                                'Password can not be updated while you are logged in by using social logins.'
                            )}
                        />
                    </Stack>
                ) : (
                    <AccountInformation
                        data={data}
                        formSubmit={formSubmitHandler}
                    />
                )}
            </Grid>
        </Card>
    )
}

export default BasicInformation
