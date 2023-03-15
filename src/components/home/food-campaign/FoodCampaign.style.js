import {alpha, Box, IconButton, styled} from '@mui/material'

export const CustomIconButton = styled(IconButton)(({ theme, nextbutton,color }) => ({
    borderRadius: '50%',
    color: nextbutton === 'true'?theme.palette.neutral[100]:  theme.palette.neutral[1000],
    background:
        nextbutton === 'true'
            ? alpha(theme.palette.primary.main,0.5)
            : theme.palette.neutral[1400],
    width: '45px',
    height: '45px',
    '&:hover': {
        background:
            nextbutton === 'true'
                ? theme.palette.primary.main
                : theme.palette.neutral[300],
    },
}))
