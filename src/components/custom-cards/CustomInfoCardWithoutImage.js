import React from 'react'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import mobile from '../../assets/images/icons/mobile.png'
import {
    CustomColouredTypographyForCustomInfoCard,
    CustomIconContainerForCustomInfoCard,
    CustomTypographyForCustomInfoCard,
    NormalPaper,
} from './CustomCards.style'

const CustomInfoCardWithoutImage = (props) => {
    return (
        <NormalPaper>
            <Box>
                <CustomColouredTypographyForCustomInfoCard variant="h3">
                    Contact Person Information
                </CustomColouredTypographyForCustomInfoCard>
                <Stack spacing={2}>
                    <CustomTypographyForCustomInfoCard>
                        Ashek Elahe
                    </CustomTypographyForCustomInfoCard>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CustomIconContainerForCustomInfoCard>
                            <img src={mobile} alt="mobile" />
                        </CustomIconContainerForCustomInfoCard>
                        <Typography variant="h5">+880372786552</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CustomIconContainerForCustomInfoCard>
                            <img src={mobile} alt="mobile" />
                        </CustomIconContainerForCustomInfoCard>
                        <Typography variant="h5">example@email.com</Typography>
                    </Stack>
                </Stack>
            </Box>
        </NormalPaper>
    )
}

CustomInfoCardWithoutImage.propTypes = {}

export default CustomInfoCardWithoutImage
