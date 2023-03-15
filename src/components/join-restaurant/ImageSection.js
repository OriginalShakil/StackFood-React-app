import React from 'react'
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import { InputLabel } from '@mui/material'
import ImageUploaderWithPreview from '../single-file-uploader-with-preview/ImageUploaderWithPreview'
import { useTranslation } from 'react-i18next'
import { CustomTypography } from '../custom-tables/Tables.style'

const ImageSection = ({
    RestaurantJoinFormik,
    singleFileUploadHandlerForImage,
    imageOnchangeHandlerForImage,
    singleFileUploadHandlerForCoverPhoto,
    imageOnchangeHandlerForCoverPhoto,
}) => {
    const { t } = useTranslation()
    return (
        <CustomBoxFullWidth>
            <CustomStackFullWidth alignItems="center" spacing={2} mb="1.5rem">
                <InputLabel>{t('Logo')}</InputLabel>
                <ImageUploaderWithPreview
                    type="file"
                    labelText={t("file Upload")}
                    hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                    file={RestaurantJoinFormik.values.logo}
                    onChange={singleFileUploadHandlerForImage}
                    imageOnChange={imageOnchangeHandlerForImage}
                    width="200px"
                    error={
                        RestaurantJoinFormik.touched.logo &&
                        RestaurantJoinFormik.errors.logo
                    }
                />
                {RestaurantJoinFormik.touched.logo &&
                    RestaurantJoinFormik.errors.logo && (
                        <CustomTypography
                            variant="subtitle2"
                            sx={{
                                ml: '10px',
                                fontWeight: 'inherit',
                                color: (theme) => theme.palette.error.main,
                            }}
                        >
                            {t('Logo is required')}
                        </CustomTypography>
                    )}
            </CustomStackFullWidth>
            <CustomStackFullWidth alignItems="center" spacing={2} mb=".8rem">
                <InputLabel>{t('Cover Photo')}</InputLabel>
                <ImageUploaderWithPreview
                    type="file"
                    labelText={t("file Upload")}
                    hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                    file={RestaurantJoinFormik.values.cover_photo}
                    onChange={singleFileUploadHandlerForCoverPhoto}
                    imageOnChange={imageOnchangeHandlerForCoverPhoto}
                    width="1000px"
                    error={
                        RestaurantJoinFormik.touched.cover_photo &&
                        RestaurantJoinFormik.errors.cover_photo
                    }
                />
                {RestaurantJoinFormik.touched.cover_photo &&
                    RestaurantJoinFormik.errors.cover_photo && (
                        <CustomTypography
                            variant="subtitle2"
                            sx={{
                                ml: '10px',
                                fontWeight: 'inherit',
                                color: (theme) => theme.palette.error.main,
                            }}
                        >
                            {t('Cover photo is required')}
                        </CustomTypography>
                    )}
            </CustomStackFullWidth>
        </CustomBoxFullWidth>
    )
}
export default ImageSection
