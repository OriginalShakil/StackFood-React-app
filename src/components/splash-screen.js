import { Box } from '@mui/material'

import { keyframes } from '@emotion/react'
import FooterLogo from '../../public/static/footer/footer-logo.png'
import {CustomImageContainer} from "../styled-components/CustomStyles.style";

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

export const SplashScreen = () => (
    <Box
        sx={{
            alignItems: 'center',
            backgroundColor: 'neutral.300',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            maxWidth:"100vw",
            width:"100%",
            zIndex: 2000,
        }}
    >

            <img src={FooterLogo.src} style={{ height: 40,width:250 }} />
    </Box>
)
