import React from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomButtonForDownload } from './CustomDownloadButton.style'

const CustomDownloadButton = (props) => {
    const { text } = props
    return (
        <CustomButtonForDownload
            variant="contained"
            startIcon={<DownloadIcon />}
            endIcon={<KeyboardArrowDownIcon />}
        >
            {text}
        </CustomButtonForDownload>
    )
}
CustomDownloadButton.propTypes = {}
export default CustomDownloadButton
