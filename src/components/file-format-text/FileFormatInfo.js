import React from 'react'
import { CustomBoxImageText } from '../../gurbage/admin/components/forms/FormWithFormik.style'
import Typography from '@mui/material/Typography'

const FileFormatInfo = (props) => {
    const { text } = props
    return (
        <CustomBoxImageText>
            <Typography>{text}</Typography>
        </CustomBoxImageText>
    )
}

FileFormatInfo.propTypes = {}

export default FileFormatInfo
