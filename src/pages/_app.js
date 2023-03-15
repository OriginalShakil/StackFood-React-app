import React, { useEffect, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { createTheme } from '../theme/index'
import { store } from '../redux/store'
import ScrollToTop from '../components/scroll-top/ScrollToTop'
import { WrapperForApp } from '../App.style'
import { createEmotionCache } from '../utils/create-emotion-cache'
import Navigation from '../components/navbar'
import '../styles/global.css'
import { persistStore } from 'redux-persist'
import { Box } from '@mui/material'
import Router, { useRouter } from 'next/router'
import i18n from 'i18next'
import '../language/i18n'
import dynamic from 'next/dynamic'
import FloatingCardManagement from '../components/floating-cart/FloatingCardManagement'
import DynamicFavicon from '../components/favicon/DynamicFavicon'
import '../styles/global.css'
import '../styles/nprogress.css'
import nProgress from 'nprogress'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const clientSideEmotionCache = createEmotionCache()

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const queryClient = new QueryClient()
    const router = useRouter()
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    const [languageDirection, setLanguageDirection] = useState('')
    const [theme_mode, setThemeMode] = useState('')
    const [viewFooter, setViewFooter] = useState(false)
    const Footer = dynamic(() => import('../components/footer/Footer'), {
        ssr: false,
    })
    useEffect(() => {
        setShowSplashScreen(false)
    }, [router.isReady])

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setLanguageDirection(localStorage.getItem('direction') || 'ltr')
        }
    }, [languageDirection])

    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setThemeMode(localStorage.getItem('mode') || 'light')
        }
    }, [theme_mode])
    useEffect(() => {
        const userLanguage = localStorage.getItem('language')
        if (userLanguage) {
            i18n.changeLanguage(userLanguage?.toLowerCase())
        }
        if (!userLanguage) {
            i18n.changeLanguage('en')
            //  localStorage.setItem('language', 'sv')
        }
        setViewFooter(true)
    }, [])
    // useEffect(() => {
    //     setLoading(true)
    // }, [])
    let persistor = persistStore(store)
    const theme = useMemo(
        () =>
            createTheme({
                direction: languageDirection,
                responsiveFontSizes: true,
                mode: theme_mode,
            }),
        [languageDirection]
    )
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = JSON.parse(localStorage.getItem('zoneid'))
    }
    return (
        <CacheProvider value={emotionCache}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        {/*<RTL direction={languageDirection}>*/}
                        <CssBaseline />
                        <Toaster />
                        <WrapperForApp>
                            <ScrollToTop />
                            <Navigation />
                            <DynamicFavicon />

                            <Box
                                sx={{
                                    minHeight: '80vh',
                                    mt: {
                                        xs:
                                            router.pathname === '/home'
                                                ? '3.5rem'
                                                : '5rem',
                                        md:
                                            router.pathname === '/'
                                                ? zoneid
                                                    ? '9rem'
                                                    : '5rem'
                                                : '8rem',
                                    },
                                }}
                            >
                                {router.pathname !== '/' &&
                                    router.pathname !== '/checkout' &&
                                    router.pathname !== '/chat' && (
                                        <FloatingCardManagement
                                            zoneid={zoneid}
                                        />
                                    )}
                                {getLayout(<Component {...pageProps} />)}
                            </Box>
                            {viewFooter && (
                                <Footer languageDirection={languageDirection} />
                            )}
                        </WrapperForApp>
                        {/*</RTL>*/}
                    </ThemeProvider>
                </Provider>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </QueryClientProvider>
        </CacheProvider>
    )
}

export default App
