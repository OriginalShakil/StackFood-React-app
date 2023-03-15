import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { AppBar } from '@mui/material'
import Box from '@mui/material/Box'

export const CustomIconButtonForIconicSidebar = styled(IconButton)(
    ({ theme, open }) => ({
        color: theme.palette.neutral[500],
        borderRight: theme.palette.neutral[100],
        marginRight: 5,
        ...(open && { display: 'none' }),
    })
)

export const CustomAppbarForIconicSidebar = styled(AppBar)(
    ({ theme, open }) => ({
        backgroundColor: theme.palette.neutral[100],
    })
)

export const CustomWrapperForIconicSidebar = styled(Box)(({ theme }) => ({
    display: 'flex',
}))
