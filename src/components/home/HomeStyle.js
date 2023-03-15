import { styled } from '@mui/material/styles'

import { Box, Card, Typography } from '@mui/material'

export const LeftArrowStyle = styled(Box)(
    ({ theme, languageDirection, left, isdisabled }) => ({
        zIndex: '1',
        top: '37%',
        position: 'absolute',
        display: isdisabled && 'none',
        left: `${languageDirection === 'rtl' ? '2%' : left}`,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)
export const RightArrowStyle = styled(Box)(
    ({ theme, languageDirection, right, isdisabled }) => ({
        zIndex: '1',
        position: 'absolute',
        top: '37%',
        right: `${languageDirection === 'rtl' ? '2%' : right}`,
        display: isdisabled && 'none',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)

export const HomeTitleTypography = styled(Typography)(({ theme }) => ({
    // fontSize: '26px',
    fontWeight: '800',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
}))
export const HomeTextTypography = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '22px',
    marginTop: '10px',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
}))
export const PopularRestaurantCard = styled(Card)(({ theme }) => ({
    margin: '20px 0',
    padding: '30px',
    // border: '.5px solid #ef7822',
    boxShadow: `${
        theme.palette.mode === 'light' &&
        '0px 0px 2px rgba(239, 120, 34, 0.1),0px 6px 12px rgba(239, 120, 34, 0.08)'
    }`,
    borderRadius: '10px',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        padding: '7px',
        margin: '0px 0',
    },
}))
export const FoodDetailModalStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '100%',
    padding: '1.7%',
    borderRadius: '10px',
    boxShadow: 24,
    border: 'none',

    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('md')]: {
        width: '85%',
    },
    // [theme.breakpoints.down('sm')]: {
    //     width: '70%',
    // },
    [theme.breakpoints.down('xs')]: {
        width: '85%',
    },
}))
