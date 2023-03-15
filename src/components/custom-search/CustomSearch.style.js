import { alpha, InputBase, styled } from '@mui/material'

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.neutral[200],
    color: theme.palette.neutral[600],

    width: '100%',
    //margin: 'auto',
    [theme.breakpoints.up('sm')]: {

    },
}))
export const SearchIconWrapper = styled('div')(({ theme ,languageDirection}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme,languageDirection }) => ({
    color: 'inherit',
    width: '100%',

    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingRight: languageDirection==="rtl" && `calc(1em + ${theme.spacing(4)}) `,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    },
}))
