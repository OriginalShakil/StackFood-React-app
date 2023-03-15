// pages/500.js
import { Container, Stack, Typography } from '@mui/material'
import { CustomStackFullWidth } from '../styled-components/CustomStyles.style'
import CustomImageContainer from '../components/CustomImageContainer'
import errorImage from '../../public/static/error/500.svg'
import { useTranslation } from 'react-i18next'
import FiveHundred from '../components/errors-svg/FiveHundred'
import ErrorRoutesProtect from "../components/route-protectors/ErrorRoutesProtect";

export default function Custom500() {
    const { t } = useTranslation()
    return (
        <ErrorRoutesProtect>
            <Container
                maxWidth="lg"
                sx={{
                    mt: { md: '9rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >
                <CustomStackFullWidth
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <Stack maxWidth="500px" width="100%" spacing={2} padding="1rem">
                        <FiveHundred />
                        <Typography align="center" variant="h3">
                            {t(
                                'Internal server error. Please use registered valid domain and try again.'
                            )}
                        </Typography>
                    </Stack>
                </CustomStackFullWidth>
            </Container>
        </ErrorRoutesProtect>
    )
}
