import React from 'react'
import {
    FilePreviewerWrapper,
    CustomBoxForFilePreviewer,
    IconButtonImagePreviewer,
} from '../file-previewer/FilePreviewer.style'
import { InputLabel } from '@mui/material'
import ImageUploaderThumbnail from './ImageUploaderThumbnail'
import DeleteIcon from '@mui/icons-material/Delete'

const ImagePreviewer = ({
    anchor,
    file,
    label,
    width,
    imageUrl,
    borderRadius,
    error,
}) => {


    let previewImage
    if (typeof file !== 'string') {
        previewImage = {
            url: URL.createObjectURL(file), // type: file.name.split('.').pop(),
        }
    } else previewImage = file

    return (
        <>
            <CustomBoxForFilePreviewer>
                {previewImage ? (
                    <FilePreviewerWrapper
                        onClick={() => anchor.current.click()}
                        width={width}
                        height="100px"
                        objectFit
                        borderRadius={borderRadius}
                    >
                        {typeof file !== 'string' ? (
                            <img src={previewImage.url} alt="preview" />
                        ) : (
                            <img
                                src={`${imageUrl}/${previewImage}`}
                                alt="pruueview"
                            />
                        )}
                    </FilePreviewerWrapper>
                ) : (
                    <FilePreviewerWrapper
                        onClick={() => anchor.current.click()}
                        width={width}
                        height="100px"
                        objectFit
                        borderRadius={borderRadius}
                    >
                        <ImageUploaderThumbnail
                            label={label}
                            width={width}
                            error={error}
                            borderRadius={borderRadius}
                        />
                    </FilePreviewerWrapper>
                )}
            </CustomBoxForFilePreviewer>
        </>
    )
}

export default ImagePreviewer
