import { styled } from '@mui/material/styles'
import { Box, Divider, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';


export const OrderDetailGrid = styled(Grid)(() => ({
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.1)',
    borderRadius: '10px',
    padding: '10px 20px'

}))
export const OrderDetailBox = styled(Box)(() => ({
    paddingTop: '10px',
    paddingBottom: '70px'

}))
export const HeadingBox = styled(Box)(() => ({
    padding: '10px 0px 20px 0px',
    textAlign: 'center'
}))
export const StepBox = styled(Box)(() => ({
    padding: '40px 0px 40px 0px',
    width: '100%'

}))