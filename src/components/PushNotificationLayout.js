import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import { firebaseCloudMessaging } from '../firebase'
import { useStoreFcm } from '../hooks/react-query/push-notification/usePushNotification'
import { useSelector } from 'react-redux'
import { onMessageListener, fetchToken } from '../firebase'
import { toast } from 'react-hot-toast'
import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PushNotificationLayout = ({ children, refetch, pathName }) => {
    const router = useRouter()
    const [notification, setNotification] = useState(null)
    const [userToken, setUserToken] = useState(null)
    const [isTokenFound, setTokenFound] = useState(false)
    const [fcmToken, setFcmToken] = useState('')

    fetchToken(setTokenFound, setFcmToken).then()
    useEffect(() => {
        if (typeof window !== undefined) {
            setUserToken(localStorage.getItem('token'))
            //userToken = window.localStorage.getItem('token')
        }
    }, [userToken])

    //const userToken=localStorage.getItem("token")
    const { mutate } = useStoreFcm()

    useEffect(() => {
        if (userToken) {
            mutate(fcmToken)
        }
    }, [fcmToken])

    const clickHandler = () => {
        if (notification.type === 'message') {
            router.push({
                pathname: '/chat',
                query: {
                    conversationId: notification?.conversation_id,
                    type: notification.sender_type,
                    chatFrom: 'true',
                },
            })
        }
      else if (notification.type === 'order_status') {
            router.push(`/order-history/${notification.order_id}`)
        }
    }

    useEffect(() => {
        onMessageListener()
            .then((payload) => {
                setNotification(payload.data)
                // toast.success(payload.data.title)
            })
            .catch((err) => toast(err))
        if (notification) {
            if (pathName === 'chat' && notification.type === 'message') {
                refetch()
            } else {
                toast(
                    <>
                        <Stack
                            sx={{ cursor: 'pointer' }}
                            onClick={clickHandler}
                        >
                            <Typography>{notification.title}</Typography>
                            <Typography>{notification.body}</Typography>
                        </Stack>
                    </>
                )
            }
        }
    }, [notification])


    return <>{children}</>
}

export default PushNotificationLayout
