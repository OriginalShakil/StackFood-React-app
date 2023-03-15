import React, { useRef } from 'react'
import FilePreviewer from '../file-previewer/FilePreviewer'

const SingleFileUploader = (props) => {
    const { hintText, deleteImage, file, onChange, labelText, titleText } =
        props
    const imageContainerRef = useRef()

    return (
        <>
            <FilePreviewer
                title={titleText}
                label={labelText}
                hintText={hintText}
                deleteImage={deleteImage}
                anchor={imageContainerRef}
                file={file}
            />
            <input
                ref={imageContainerRef}
                id="file"
                name="file"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    onChange(e)
                }}
            />
        </>
    )
}

SingleFileUploader.propTypes = {}

export default SingleFileUploader
