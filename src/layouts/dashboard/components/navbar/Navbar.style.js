import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
export const CustomNavbarPopoverHeader = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.neutral[100],
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
}))
export const CustomBoxForAccountPopover = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    padding: '0.5rem',
}))
export const CustomContainerForAccountPopover = styled(Box)(({ theme }) => ({
    width: '19rem',
}))
export const CustomAccountDetailsWrapperForAccountPopover = styled(Box)(
    ({ theme, marginTop }) => ({
        marginLeft: '0.5rem',
        marginTop: marginTop && '0.5rem',
        marginBottom: marginTop && '0.5rem',
    })
)
export const CustomIconButtonForNotificationWithBadge = styled(Box)(
    ({ theme, marginTop }) => ({
        color: theme.palette.neutral[500],
        cursor: 'pointer',
    })
)
export const CustomWrapperForNavbarPopover = styled(Box)(
    ({ theme, marginTop }) => ({
        width: '23.75rem',
    })
)
export const CustomContentWrapperForNavbarPopover = styled(Box)(
    ({ theme, marginTop }) => ({
        padding: '1rem',
    })
)
