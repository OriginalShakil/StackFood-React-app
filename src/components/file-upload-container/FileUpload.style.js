import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import {
    CustomBoxFullWidth,
    ImageContainer,
} from '../../styled-components/CustomStyles.style'

export const ImageContainerFileUpload = styled(ImageContainer)(({ theme }) => ({
    maxHeight: '1.75rem',
    maxWidth: '1.75rem',
}))
export const FileUploadTextContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    width: '8rem',
}))
export const FileUploadHeader = styled(CustomBoxFullWidth)(({ theme }) => ({
    display: 'flex',
}))
