import { Paper, styled } from '@mui/material'
import { Box } from '@mui/system'
import footerBg from './footerBg.svg'
export const StyledFooterBackground = styled(Box)(({ theme, router }) => ({
    //minHeight: '500px',
    marginTop: '.8rem',
    width: '100%',
    background: `url(${footerBg.src}) no-repeat center center / cover `,
    [theme.breakpoints.down('md')]: {
        marginBottom: router !== '/' && '4.5rem',
    },
}))
