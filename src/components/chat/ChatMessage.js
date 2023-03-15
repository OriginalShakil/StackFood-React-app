import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Stack, Typography } from '@mui/material'
import {
    BodyWrapper,
    CardWrapper,
    ChatMessageWrapper,
    CustomAvatar,
    TimeWrapper,
} from './Message.style'
import CheckIcon from '@mui/icons-material/Check'
import { CustomTypography } from '../custom-tables/Tables.style'
import { FormatedDateWithTime } from '../../utils/customFunctions'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import ggg from '../../../public/logo.png'
import CustomImageContainer from '../CustomImageContainer'
import { Box } from '@mui/system'

const ChatMessage = (props) => {
    const theme = useTheme()
    const {
        body,
        createdAt,
        messgageData,
        authorAvatar,
        conversationData,
        image,
        handleImageOnClick,
    } = props
    const { global } = useSelector((state) => state.globalSettings)
    const languageDirection = localStorage.getItem('direction')
    const receiverImageUrl = () => {
        if (conversationData?.conversation?.receiver_type === 'vendor') {
            return global?.base_urls?.restaurant_image_url
        }
        if (conversationData?.conversation?.receiver_type === 'delivery_man') {
            return global?.base_urls?.delivery_man_image_url
        } else global?.base_urls?.business_logo_url
    }
    const customerImageUrl = global?.base_urls?.customer_image_url
    const authorType = messgageData.sender_id //sender
    let userType
    let userImage
    let senderImage
    const chatImageUrl = global?.base_urls?.chat_image_url
    if (conversationData?.conversation?.sender_type === 'customer') {
        userType = conversationData?.conversation.sender_id
        userImage = conversationData?.conversation?.receiver?.image
        senderImage = conversationData?.conversation?.sender?.image
    } else {
        userType = conversationData?.conversation?.receiver?.id
        // userImage = conversationData?.conversation?.receiver?.image
        // senderImage = conversationData?.conversation?.sender?.image
    }
    const nameHandler = () => {
        if (conversationData?.conversation?.sender_type === 'customer') {
            if (authorType === userType) {
                return conversationData?.conversation?.sender?.f_name.concat(
                    ' ',
                    conversationData?.conversation?.sender?.l_name
                )
            } else {
                if (conversationData?.conversation?.receiver?.f_name) {
                    return conversationData?.conversation?.receiver?.f_name.concat(
                        ' ',
                        conversationData?.conversation?.receiver?.l_name
                    )
                } else {
                    return global?.business_name
                }
            }
        } else {
            if (authorType === userType) {
                return (
                    conversationData?.conversation?.receiver?.f_name.concat(
                        ' ',
                        conversationData?.conversation?.receiver?.l_name
                    ) || ' '
                )
            } else {
                return (
                    conversationData?.conversation?.sender?.f_name.concat(
                        ' ',
                        conversationData?.conversation?.sender?.l_name
                    ) || ' '
                )
            }
        }

        // conversationData?.conversation?.sender_type === 'customer' ?  authorType === userType
        //     ? conversationData?.conversation?.sender
        //         ?.f_name
        //     : conversationData?.conversation?.receiver
        //         ?.f_name
        //         ? conversationData?.conversation?.receiver
        //             ?.f_name
        //         : global?.business_name
    }

    return (
        <ChatMessageWrapper
            authorType={authorType}
            userType={userType}
            languageDirection={languageDirection}
        >
            <CustomAvatar
                src={`${
                    authorType === userType
                        ? customerImageUrl
                        : receiverImageUrl()
                }/${authorType === userType ? senderImage : userImage}`}
                authorType={authorType}
                userType={userType}
            />
            <BodyWrapper>
                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent={
                        authorType === userType ? 'flex-end' : 'flex-start'
                    }
                    // overflow-x="scroll"
                >
                    {image?.map((item) => {
                        return (
                            <Box
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                    handleImageOnClick(
                                        `${chatImageUrl}/${item}`
                                    )
                                }
                            >
                                <CustomImageContainer
                                    src={`${chatImageUrl}/${item}`}
                                    width="100px"
                                    height="90px"
                                    objectFit="contained"
                                />
                            </Box>
                        )
                    })}
                </Stack>
                {body && (
                    <CardWrapper authorType={authorType} userType={userType}>
                        <Stack mb={1}>
                            <Typography
                                pt="3px"
                                color={
                                    authorType === userType
                                        ? theme.palette.neutral[1000]
                                        : theme.palette.neutral[100]
                                }
                                variant="subtitle2"
                                authorType={authorType}
                                userType={userType}
                                align={
                                    authorType === userType ? 'right' : 'left'
                                }
                            >
                                {nameHandler()}
                            </Typography>
                        </Stack>
                        <Typography
                            color={
                                authorType === userType
                                    ? theme.palette.neutral[1000]
                                    : theme.palette.neutral[100]
                            }
                            align={authorType === userType ? 'right' : 'left'}
                            variant="h6"
                        >
                            {body}
                        </Typography>
                    </CardWrapper>
                )}

                <TimeWrapper>
                    {authorType === userType ? (
                        <CheckIcon
                            fontSize="14px"
                            style={{
                                color:
                                    messgageData.is_seen === 0
                                        ? theme.palette.primary.main
                                        : 'green',
                            }}
                        />
                    ) : (
                        ''
                    )}
                    <Typography color="textSecondary" noWrap variant="caption">
                        {FormatedDateWithTime(createdAt)}
                    </Typography>
                </TimeWrapper>
            </BodyWrapper>
        </ChatMessageWrapper>
    )
}

ChatMessage.propTypes = {}

export default ChatMessage
