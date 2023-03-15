import { AppBar, styled } from '@mui/material'

export const HomeLayoutNavbarStyle = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    ...(theme.palette.mode === 'light'
        ? {
              boxShadow: theme.shadows[3],
          }
        : {
              backgroundColor: theme.palette.background.paper,
              borderBottomColor: theme.palette.divider,
              borderBottomStyle: 'solid',
              borderBottomWidth: 1,
              boxShadow: 'none',
          }),
}))
