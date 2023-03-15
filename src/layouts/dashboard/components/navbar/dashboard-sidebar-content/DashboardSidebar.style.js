import {
    Box,
    Button,
    Collapse,
    ListItem,
    ListSubheader,
    Stack,
    styled,
} from '@mui/material'
import {
    FlexContainer,
    ImageContainer,
} from '../../../../../styled-components/CustomStyles.style'
import IconButton from '@mui/material/IconButton'
import { Scrollbar } from '../../../../../components/Scrollbar'
import { CustomIconButton } from '../../../../../styled-components/CustomButtons.style'

export const ImageContainerSidebar = styled(ImageContainer)(({ theme }) => ({
    height: '26px',
    width: '26px',
}))

export const CustomListSubheader = styled(ListSubheader)(({ theme, open }) => ({
    display: open ? 'inherit' : 'none',
    color: theme.palette.neutral[1000],
    fontSize: '0.75rem',
    letterSpacing: '0.01rem',
    fontWeight: 'bold',
    lineHeight: 2.5,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

export const ButtonTextWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}))

export const CustomButtonSidebar = styled(Button)(
    ({ theme, active, paddingLeft, noBackGroundColor }) => ({
        color: active ? theme.palette.primary.main : theme.palette.neutral[600],
        backgroundColor: noBackGroundColor
            ? active && theme.palette.background.buttonBackground
            : 'inherit',
        fontWeight: active && 'fontWeightBold',
        borderRadius: '0.313rem',
        justifyContent: 'flex-start',
        textAlign: 'left',
        textTransform: 'none',
        width: '100%',
        paddingLeft: `${paddingLeft}px`,
        '& .MuiButton-startIcon': {
            color: active
                ? theme.palette.primary.main
                : theme.palette.neutral[500],
        },
        '&:hover': {
            backgroundColor: 'background.buttonBackground',
        },
    })
)

export const CustomIconButtonSidebar = styled(IconButton)(
    ({ theme, active }) => ({
        backgroundColor: active && theme.palette.background.buttonBackground,
        color: active ? theme.palette.primary.main : theme.palette.neutral[500],
        borderRadius: 1,
        justifyContent: 'center',
        textTransform: 'none',
        width: '100%',
        fontWeight: active && 'fontWeightBold',
        '& .MuiButton-startIcon': {
            color: active
                ? theme.palette.primary.main
                : theme.palette.neutral[500],
        },
    })
)

export const CustomListItemSidebar = styled(ListItem)(
    ({ theme, paddingX, flex }) => ({
        display: flex ? 'flex' : 'block',
        marginBottom: '0.031rem',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: paddingX && '0.063rem',
        paddingRight: paddingX && '0.063rem',
        marginTop: '0.125rem',
    })
)

export const CustomScrollbarForDashboardSidebarContent = styled(Scrollbar)(
    ({ theme }) => ({
        height: '100%',
        width: '100%',
        '& .simplebar-content': {
            height: '100%',
        },
    })
)

export const CustomStackForDashboardSidebarContent = styled(Stack)(
    ({ theme }) => ({
        paddingLeft: '1rem',
        paddingRight: '1rem',
    })
)

export const CustomSectionWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    marginTop: '1rem',
}))

export const CustomIconButtonForDashboardSidebarContent = styled(
    CustomIconButton
)(({ theme, open }) => ({
    color: theme.palette.neutral[500],

    marginRight: '0.313rem',
    marginLeft: '0.006rem',
    ...(open && { display: 'none' }),
}))

export const CustomFlexContainer = styled(FlexContainer)(
    ({ theme, noPaddingY }) => ({
        justifyContent: 'space-between',
        paddingTop: noPaddingY ? 'none' : '1rem',
        paddingBottom: noPaddingY ? 'none' : '1rem',
        width: noPaddingY && '100%',
    })
)

export const CustomCollapseForDashboardSidebarItem = styled(Collapse)(
    ({ theme }) => ({
        marginTop: 0.5,
    })
)
