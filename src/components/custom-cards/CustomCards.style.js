import { styled } from '@mui/material/styles'
import { Button, Paper, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
    CustomColouredTypography,
    ImageContainer,
} from '../../styled-components/CustomStyles.style'

export const CustomPaperCard = styled(Paper)(
    ({ theme, minHeight, minHeightForCustomCard }) => ({
        // eslint-disable-next-line no-mixed-operators
        minHeight: (minHeight && '16vh') || (minHeightForCustomCard && '30vh'),
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '1.875rem',
        boxSizing: 'border-box',
        boxShadow:
            '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
        border: '1px solid rgba(65, 83, 179, 0.3)',
        [theme.breakpoints.up('sm')]: {
            // eslint-disable-next-line no-mixed-operators
            minHeight:
                (minHeight && '14vh') || (minHeightForCustomCard && '20vh'),
        },
    })
)

export const CustomInnerPaper = styled(Paper)(({ theme, background }) => ({
    position: 'absolute',
    height: '100%',
    width: '70%',
    top: 0,
    left: 0,
    borderRadius: '10px 600px 10px 10px',
    opacity: 0.1,
    background: background
        ? background
        : `linear-gradient(0deg,${theme.palette.neutral[100]}  0%, ${theme.palette.primary.main} 100%)`,
}))
export const CustomInnerStack = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    background: 'transparent',
    zIndex: 999,
    textAlign: 'center',
    padding: '0.938rem',
}))
export const CustomTypographyCard = styled(Typography)(
    ({ theme, marginBottom, fontSize, color }) => ({
        fontSize: fontSize ? `${fontSize}rem` : 'inherit',
        color: color ? theme.palette.primary.main : 'inherit',
        fontWeight: 'bold',
        marginBottom: marginBottom && '1.563rem',
    })
)

export const NormalPaper = styled(Paper)(({ theme }) => ({
    padding: '1.875rem',
    background: theme.palette.background.paper,
    border: '1px solid rgba(65, 83, 179, 0.05)',
    boxSizing: 'border-box',
    boxShadow:
        '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
    borderRadius: '10px',
}))

export const CustomColouredTypographyForCustomInfoCard = styled(
    CustomColouredTypography
)(({ theme }) => ({
    marginBottom: '1.563rem',
}))
export const CustomTypographyForCustomInfoCard = styled(Typography)(
    ({ theme }) => ({
        fontSize: '1.125rem',
        fontWeight: 'bold',
    })
)
export const CustomIconContainerForCustomInfoCard = styled(ImageContainer)(
    ({ theme }) => ({
        width: 'auto',
        height: '1.25rem',
    })
)
export const CustomImageContainerForCustomInfoCard = styled(ImageContainer)(
    ({ theme }) => ({
        width: 'auto',
        height: '9rem',
    })
)

export const CustomButtonForCustomCard = styled(Button)(({ theme }) => ({
    width: '71%',
}))
export const CustomButton = styled(Button)(({ theme }) => ({
    width: '100%',
}))
