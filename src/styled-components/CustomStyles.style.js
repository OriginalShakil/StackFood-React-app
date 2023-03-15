import {
    Alert,
    Badge,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    styled,
    TextField,
    Typography,
    InputBase,
    OutlinedInput,
    Fab,
    Tabs,
    ListItem,
    Select,
} from '@mui/material'
import Link from '@mui/material/Link'
import imgB from '../../public/static/Privacy/RectangleP.png'
//import { Link } from 'react-router-dom'
import MuiList from '@mui/material/List'
export const FlexContainerCol = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})
export const FlexContainerSpaceBetween = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})
export const FlexContainerCenter = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '1400px',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
})
export const FlexContainer = styled(Box)({
    display: 'flex',
    gap: '.5rem',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    padding: '8px 0px 8px 5px',
    typography: 'body1',
    '& :not(style) + :not(style)': {
        ml: 1,
        // mr:2
    },
})
export const CustomTextField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {},
}))
export const CustomPaper = styled(Paper)(({ theme, width, height }) => ({
    //backgroundColor: '#D1D5DB',
    padding: '2rem',
    maxWidth: width ? width : '600px',
    width: '100%',
    minHeight: '300px',
    height: height ? height : '100%',
    borderRadius: '20px',
    justifyContent: 'center',
    textAlign: 'center',
}))

export const CustomPaperBigCard = styled(Paper)(
    ({
        theme,
        nopadding,
        minheight,
        height,
        backgroundColor,
        padding,
        width,
        noboxshadow,
    }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: nopadding === 'true' ? 'none' : padding ? padding : '1.875rem',
        width: width ? width : '100%',
        height: height ? height : '100%',
        minHeight: minheight && minheight,
        borderRadius: '10px',
        boxShadow:
            noboxshadow === 'true'
                ? 'none'
                : `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`,
        // marginBottom: '30px',
    })
)

export const CustomButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {},
}))
export const CustomFullDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
}))
export const LayoutCenter = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingTop: '7.5rem',
}))
export const CustomAlert = styled(Alert)(({ theme }) => ({}))
export const OutletWrapper = styled(Container)(({ theme, iconicSidebar }) => ({
    display: 'flex',
    flex: '1 1 auto',
    width: '100%',
    paddingTop: '6.25rem',
    paddingBottom: '10vh',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: iconicSidebar ? 180 : 310,
    },
}))

export const CustomImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',

    '& img': {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        objectFit: 'contained',
    },
}))
export const CustomImageContainerWithBorderRadius = styled(Box)(
    ({ theme }) => ({
        borderRadius: '0.125rem',
        position: 'relative',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contained',
        },
    })
)
export const ImageContainer = styled(Box)(({ theme }) => ({
    borderRadius: '0.125rem',
    position: 'relative',
    '& img': {
        width: '100%',
        height: '300px',
        objectFit: 'contain',
    },
}))
export const CustomColouredTypography = styled(Typography)(
    ({ theme, color }) => ({
        color: color ? color : theme.palette.primary.main,
    })
)
export const CustomColouredTypographySubtitle = styled(Typography)(
    ({ theme }) => ({
        marginTop: '0.563rem',
        textTransform: 'none',
        color: theme.palette.neutral[700],
    })
)

export const CenteringSingleComponentOnLayout = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
})

export const CustomStack = styled(Stack)({
    alignItems: 'start',
    width: '100%',
    paddingLeft: '1rem',
})
export const CustomBoxTab = styled(Box)({
    border: '1px solid #ff903f',
    padding: '5px',
    borderRadius: '15px',
})
export const CustomTabs = styled(Tabs)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    padding: '5px',
    borderRadius: '15px',
}))
export const CloseIconWrapper = styled('div')(
    ({ theme, right, languageDirection }) => ({
        top: 0,
        right: languageDirection !== 'rtl' ? (right ? right : 9) : null,
        left: languageDirection === 'rtl' ? (right ? right : 9) : null,
        height: '100%',
        position: 'absolute',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })
)

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    color: theme.palette.neutral[500],
}))

export const CustomBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        fontWeight: 'bold',
    },
}))
export const CustomTypographyBold = styled(Typography)(
    ({ theme, marginTop }) => ({
        fontWeight: 'bold',
    })
)
export const CustomTypographyAlign = styled(Typography)(({ theme, align }) => ({
    textAlign: align,
}))

export const CustomChip = styled(Chip)(({ theme }) => ({
    fontWeight: 'bold',
}))

export const CustomIconButton = styled(Box)(({ theme, marginTop }) => ({
    color: theme.palette.neutral[700],
    cursor: 'pointer',
}))

export const CustomBoxFullWidth = styled(Box)(({ theme }) => ({
    width: '100%',
}))
export const CustomStackFullWidth = styled(Stack)(
    ({ theme, marginBottom }) => ({
        width: '100%',
        marginBottom: marginBottom,
    })
)
export const CustomBoxWithSpacing = styled(Box)(
    ({ theme, marginTopBottom }) => ({
        width: '100%',
        marginTop: marginTopBottom && `${marginTopBottom}rem`,
        marginBottom: marginTopBottom && `${marginTopBottom}rem`,
    })
)
// export const CustomLink = styled(Link)(({ theme, width }) => ({
//     textDecoration: 'none',
//     width: width ? '100%' : 'auto',
// }))
export const CustomSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F3F2F2',
    color: 'black',
    //alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        //backgroundColor: alpha(theme.palette.common.white, 0.25),
        backgroundColor: '#F3F2F2',
    },
    marginLeft: 0,
    marginRight: '10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))
export const SearchIconWrapper = styled('div')(
    ({ theme, languageDirection }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: languageDirection === 'rtl' ? '0px' : '',
    })
)
export const StyledInputBase = styled(InputBase)(({ theme, width }) => ({
    color: 'inherit',
    width: '120px',
    border: '2px solid #EF7822',
    padding: '5px 0',
    marginLeft: '5px',
    borderRadius: '5px',
    '& .MuiInputBase-input': {
        fontSize: '1.3rem',
        textAlign: 'center',
    },
}))
export const SearchInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}))
export const Logo = styled('div')(({ theme, height, width }) => ({
    width: width,
    height: height,
    justifyContent: 'center',

    position: 'relative',
    cursor: 'pointer',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contained',
    },
}))
export const CustomBoxNav = styled(Box)(({ theme, isSmall }) => ({
    // display: isSmall ? 'none' : 'inline',
    flexGrow: 1,
}))
export const CustomLink = styled(Link)(({ theme, color }) => ({
    color: color ? color : 'primary.main',
    cursor: 'pointer',
    fontWeight: '700',
    '&:hover': {
        //backgroundColor: alpha(theme.palette.common.white, 0.25),
        color: theme.palette.primary.dark,
        textDecoration: 'none',
    },
}))
export const CustomOtp = styled(OutlinedInput)(({ theme }) => ({
    width: '60px',
}))
export const CustomTextFieldContainer = styled(Box)(
    ({ theme, background, noheight }) => ({
        width: '100%',
        height: !noheight && '5.5rem',
        color: theme.palette.neutral[1000],
    })
)
export const CustomStackForLoaction = styled(Stack)(({ theme }) => ({
    justifyContent: 'center',
    cursor: 'pointer',
    alignItems: 'center',
}))
export const CustomOverlayBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    color: 'white',
    // padding: '10px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
export const EmptyMessageContainer = styled(CustomStackFullWidth)(
    ({ theme }) => ({
        height: '20vh',
        width: '25vw',
    })
)
export const CustomViewAll = styled(Stack)(({ theme }) => ({
    justifyContent: 'end',
    color: theme.palette.primary.main,
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '14px',
    cursor: 'pointer',
}))
export const CustomFab = styled(Fab)(({ theme }) => ({
    width: '33px',
    height: '33px',
    [theme.breakpoints.down('sm')]: {
        width: '33px',
        height: '35px',
    },
}))
export const CustomImageContainerStyled = styled(Box)(
    ({
        theme,
        smWidth,
        maxWidth,
        marginBottom,
        width,
        smHeight,
        height,
        objectFit,
        minwidth,
        borderRadu,
        smMb,
        smMaxWidth,
        mdHeight,
        cursor,
    }) => ({
        //maxWidth:'20rem',
        display: 'inline-flex',
        background: 'transparent',
        width: width ? width : '100%',
        height: height ? height : '100%',
        minWidth: minwidth,
        maxWidth: maxWidth,
        marginBottom: marginBottom,
        position: 'relative',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            height: mdHeight ? mdHeight : '',
        },

        [theme.breakpoints.down('sm')]: {
            marginBottom: smMb ? smMb : '',
            height: smHeight ? smHeight : '',
            maxWidth: smMaxWidth ? smMaxWidth : '',
            width: smWidth ? smWidth : '',
        },
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: objectFit ? objectFit : 'cover',
            borderRadius: borderRadu,
        },
    })
)
export const CustomListItem = styled(ListItem)(
    ({ theme, display, cursor }) => ({
        display: display,
        cursor: cursor && 'pointer',
    })
)
export const CustomBoxRelative = styled(Box)(({ theme, maxWidth, height }) => ({
    position: 'relative',
    textAlign: 'center',
    maxWidth: maxWidth,
    width: '100%',
    height: height,
}))
export const CustomBoxAbsoluteCenter = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}))
export const ccsSelect = styled(Select)(({ theme }) => ({
    select: {
        '&:before': {
            borderColor: (theme) => theme.palette.primary.main,
        },
        '&:after': {
            borderColor: (theme) => theme.palette.primary.main,
        },
    },
    icon: {
        fill: (theme) => theme.palette.primary.main,
    },
}))

export const BackImage = styled(Stack)(({ theme }) => ({
    backgroundImage:
        "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
}))
export const List = styled(MuiList)(({ theme ,}) => ({}))
export const SliderCustom = styled(Stack)(({ theme, languageDirection,gap }) => ({
    paddingY: '1rem',

    '& .slick-slider': {

        '& .slick-list': {
            '& .slick-track': {
                float: languageDirection === 'rtl' ? 'right' : 'left',
                gap: gap ? gap:"5px",
            },
        },
    },
}))
