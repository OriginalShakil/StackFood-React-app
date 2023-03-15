import { Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../styled-components/CustomStyles.style'
import CustomImageContainer from '../components/CustomImageContainer'
import errorImage from '../../public/static/error/404.png'
import FourHundred from '../components/errors-svg/FourHundred'
import ErrorRoutesProtect from '../components/route-protectors/ErrorRoutesProtect'
import CustomAlert from '../components/alert/CustomAlert'
export default function Custom400() {
    const { t } = useTranslation()
    return (
        <ErrorRoutesProtect>
            <Container
                maxWidth="lg"
                sx={{
                    mt: { md: '5rem' },
                    mb: { xs: '72px', md: '0' },
                }}
            >
                <CustomStackFullWidth
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <Stack
                        maxWidth="500px"
                        width="100%"
                        spacing={2}
                        padding="1rem"
                    >
                        <FourHundred />
                        <Typography align="center" variant="h3">
                            {t('something went wrong.')}
                        </Typography>
                        <CustomAlert
                            text="Please buy this system and use activated domain."
                            type="info"
                        />
                    </Stack>
                </CustomStackFullWidth>
            </Container>
        </ErrorRoutesProtect>
    )
}
