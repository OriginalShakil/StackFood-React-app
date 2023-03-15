import { styled } from '@mui/material/styles'
import { Grid, Tab, Tabs, Typography } from '@mui/material'
import { FlexContainer } from '../../../../styled-components/CustomStyles.style'
import Zoom from '@mui/material/Zoom'

export const CustomTab = styled(Tab)(({ theme, value, currentTab }) => ({
    backgroundColor:
        currentTab === value ? theme.palette.primary.main : 'inherit',
    color: theme.palette.neutral[1000],
    borderRadius: '0.313rem',
    paddingLeft: '0.938rem',
    paddingRight: '0.938rem',
    textAlign: 'center',
}))

export const FlexContainerForInformationDetails = styled(FlexContainer)(
    ({ theme }) => ({
        justifyContent: 'space-between',
        marginTop: '1.875rem',
        marginBottom: '1.875rem',
    })
)

export const CustomGridForOverview = styled(Grid)(({ theme }) => ({
    minHeight: '14.375rem',
}))
export const CustomTabsForProviderDetails = styled(Tabs)(({ theme }) => ({
    marginTop: '0.188rem',
}))
export const CustomTypographyForProviderDetails = styled(Typography)(
    ({ theme, currentTab, tabValue }) => ({
        color: currentTab === tabValue ? theme.palette.neutral[100] : 'inherit',
    })
)
export const CustomZoomForProviderDetails = styled(Zoom)(
    ({ theme, checked, delayTime }) => ({
        transitionDelay: checked ? `200ms` : '0ms',
    })
)
