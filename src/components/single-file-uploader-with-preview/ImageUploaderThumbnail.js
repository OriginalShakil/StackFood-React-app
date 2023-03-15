import React from 'react'
import { CustomDotBox } from '../file-previewer/FilePreviewer.style'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Stack } from '@mui/material'

const ImageUploaderThumbnail = ({ label, maxWidth, width, error,borderRadius }) => {

    return (
        <CustomDotBox width={width} error={error} borderRadius={borderRadius}>
            <CloudUploadIcon />
            <Stack>{label}</Stack>
        </CustomDotBox>
    )
}
export default ImageUploaderThumbnail
