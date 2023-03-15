import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: "AIzaSyDO0X4WlhgPhQjF95wNh-Gep7_R0P9leL0",
    authDomain: "nexfood-1509d.firebaseapp.com",
    projectId: "nexfood-1509d",
    storageBucket: "nexfood-1509d.appspot.com",
    messagingSenderId: "1072459895348",
    appId: "1:1072459895348:web:27b8ecbb22a467ea68f061",
    measurementId: "G-RNN60EGFG2"
}
const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {

        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BLLU97NpSwx_kr1c57-nt_vi1yhjNx_VznHp2EJs5_jrkx2hvE_hYzec24EreTYlwgjBvqbIagITiUjAvOIzddo',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {

                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {

            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {

                resolve(payload)
            })
        })()
    )
