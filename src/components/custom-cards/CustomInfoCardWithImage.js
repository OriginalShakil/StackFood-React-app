import React from 'react'
import {
    CustomIconContainerForCustomInfoCard,
    CustomImageContainerForCustomInfoCard,
    CustomTypographyCard,
    NormalPaper,
} from './CustomCards.style'
import { Stack } from '@mui/material'
import six from '../../assets/images/six.png'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import mobile from '../../assets/images/icons/mobile.png'

const CustomInfoCardWithImage = (props) => {
    return (
        <NormalPaper>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={2}
            >
                <CustomImageContainerForCustomInfoCard>
                    <img src={six} alt="six" />
                </CustomImageContainerForCustomInfoCard>
                <Box>
                    <CustomTypographyCard variant="h3" marginBottom>
                        6 Service.com
                    </CustomTypographyCard>
                    <Stack spacing={2}>
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
                            <Typography variant="h5">
                                example@email.com
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CustomIconContainerForCustomInfoCard>
                                <img src={mobile} alt="mobile" />
                            </CustomIconContainerForCustomInfoCard>
                            <Typography variant="h5">
                                Avenue-10, House# 12, Road# 12, Mirpur DOSH,
                                Dhaka- 1216
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </NormalPaper>
    )
}

CustomInfoCardWithImage.propTypes = {}

export default CustomInfoCardWithImage
