import { styled } from '@mui/material/styles'
import { Button, Card, Stack, Table, TableHead } from '@mui/material'
import Typography from '@mui/material/Typography'
import { CheckBox } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import {
    FlexContainer,
    FlexContainerSpaceBetween,
} from '../../styled-components/CustomStyles.style'

export const CustomDownloadButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.neutral[300],
    color: theme.palette.neutral[900],
}))

export const CustomTypography = styled(Typography)(({ theme, fontWeight ,align}) => ({
    color: theme.palette.neutral[1000],
    fontWeight: fontWeight ? fontWeight : 'inherit',
    textAlign:align? align:""
}))

export const CustomCheckbox = styled(CheckBox)(({ theme }) => ({}))

export const CustomIconButtonTable = styled(IconButton)(
    ({ theme, gray, marginLeft }) => ({
        color: gray
            ? theme.palette.neutral[500]
            : theme.palette.customColor.three,
        // marginLeft: marginLeft ? ' ' : 'none',
    })
)
export const CustomBoxForBulkActions = styled(Box)(
    ({ theme, enableBulkActions }) => ({
        backgroundColor: theme.palette.neutral[200],
        display: !enableBulkActions && 'none',
        paddingLeft: '0.938rem',
        paddingRight: 2,
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
    })
)

export const CustomCardForTables = styled(Card)(({ theme }) => ({
    padding: '0.75rem',
    width: '100%',
}))
export const FlexContainerForTablesTop = styled(FlexContainerSpaceBetween)(
    ({ theme }) => ({
        padding: '0.75rem',
        width: '100%',
        paddingLeft: '0.625rem',
        paddingRight: '0.625rem',
        paddingTop: '0.625rem',
        paddingBottom: '1rem',
        flexWrap: 'wrap',
    })
)
export const TablesSearchWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: '0.625rem',
}))
export const CustomStackForTablesTop = styled(Stack)(({ theme }) => ({
    flexWrap: 'wrap',
    paddingBottom: '0.625rem',
    alignItems: 'center',
}))
export const CustomTypographyFilterForTablesTop = styled(Typography)(
    ({ theme }) => ({
        color: theme.palette.neutral[700],
    })
)
export const CustomTable = styled(Table)(({ theme }) => ({
    minWidth: '43.75rem',
}))
export const CustomTableHead = styled(TableHead)(
    ({ theme, enableBulkActions }) => ({
        visibility: enableBulkActions ? 'collapse' : 'visible',
    })
)
export const CustomEditIconButton = styled(IconButton)(
    ({ theme, enableBulkActions }) => ({
        color: theme.palette.customColor.two,
    })
)
export const CustomTableWrapper = styled(Box)(({ theme }) => ({
    marginTop: '5rem',
}))

export const FlexContainerFilterWrapperTable = styled(FlexContainer)(
    ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
            marginTop: '0.375rem',
        },
    })
)
