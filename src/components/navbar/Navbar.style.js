import Drawer from '@mui/material/Drawer'
import {
    AppBar,
    Link,
    Paper,
    styled,
    Link as MenuLink,
    Button,
    Card,
    Switch,
    Stack,
} from '@mui/material'
import { hover } from '@testing-library/user-event/dist/hover'

export const NavbarRoot = styled(AppBar)(
    ({ theme, notFound, iconicSidebar }) => ({
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
        [theme.breakpoints.up('lg')]: {
            left: notFound ? 'none' : iconicSidebar ? '5rem' : '17.5rem',
            width: `calc(100% - ${
                notFound ? 'none' : iconicSidebar ? '5rem' : '17.5rem'
            })`,
        },
        backgroundColor: theme.palette.neutral[100],
        ...(theme.palette.mode === 'light'
            ? {
                  boxShadow: theme.shadows[3],
              }
            : {
                  backgroundColor: theme.palette.background.paper,
                  borderBottomColor: theme.palette.divider,
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '0.063rem',
                  boxShadow: 'none',
              }),
    })
)
export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        top: '40px',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
}))

export const ButtonContainer = styled('div')(({ theme }) => ({
    marginLeft: '15px',
    marginRight: '15px',
}))

export const SearchProduct = styled(Paper)(({ theme, borderColor }) => ({
    width: '95%',
    margin: 'auto',
    border: 'none',
    background: '#F3F2F2',
    borderRadius: '30px',
    marginTop: '15px',
    borderColor: '#EF7822',
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
}))
export const AppBarStyle = styled(AppBar)(({ theme }) => ({
    background: `${theme.palette.mode === 'light' && '#fff !important'}`,
}))
export const NavLinkStyle = styled(Stack)(({ theme, languageDirection }) => ({
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    marginLeft: `${languageDirection === 'rtl' && '20px'}`,
    marginRight: languageDirection === 'rtl' ? '16px' : '0px',
    underLine: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))
export const NavMenuLink = styled(MenuLink)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    display: 'flex',
    cursor: 'pointer',
    '&:hover': {
        color:theme.palette.primary.main,
    },
}))
export const TopBarButton = styled(Button)(({ theme,formMobileMenu }) => ({
    padding:formMobileMenu==="true"? '7px 5px':'7px 12px',
    color: theme.palette.neutral[100],
}))
export const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 30,
    padding: 8,
    margin: '4px',
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff'
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? theme.palette.primary.main
                        : theme.palette.primary.main,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.primary.main
                : theme.palette.primary.main,
        width: 28,
        height: 28,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === '#EF7822',
        borderRadius: 20 / 2,
    },
}))
