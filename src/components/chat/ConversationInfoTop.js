import React from 'react'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { ChatUserTop } from './Chat.style'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const ConversationInfoTop = ({
    receiver,
    mdUp,
    handleToggleSidebar,
    ChatImageUrl,
    userImage,
    theme,
}) => {
    const languageDirection = localStorage.getItem('direction')
    return (
        <div>
            <ChatUserTop direction="row" mdUp={mdUp}>
                {!mdUp &&
                    (languageDirection === 'rtl' ? (
                        <IconButton onClick={handleToggleSidebar}>
                            <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleToggleSidebar}>
                            <ArrowBack fontSize="small" />
                        </IconButton>
                    ))}

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack justifyContent="flex-end" alignItems="center">
                        <Typography
                            align="right"
                            color={theme.palette.neutral[100]}
                        >
                            {receiver.sender_type === 'customer'
                                ? receiver?.receiver?.f_name.concat(
                                      ' ',
                                      receiver?.receiver?.l_name
                                  ) || ' '
                                : receiver?.sender?.f_name.concat(
                                      ' ',
                                      receiver?.sender?.l_name
                                  ) || ' '}
                        </Typography>
                        <Typography
                            variant="h6"
                            color={theme.palette.neutral[100]}
                            textTransform="capitalize"
                            align="right"
                        >
                            {receiver?.sender_type === 'customer'
                                ? receiver?.receiver_type.replaceAll('_', ' ')
                                : receiver?.sender_type?.replaceAll('_', ' ')}
                        </Typography>
                    </Stack>
                    <IconButton>
                        <Avatar
                            fontSize="small"
                            src={`${ChatImageUrl()}/${userImage}`}
                            sx={{ width: 35, height: 35 }}
                        />
                    </IconButton>
                    {/*<Avatar />*/}
                </Stack>
            </ChatUserTop>
        </div>
    )
}

ConversationInfoTop.propTypes = {}

export default ConversationInfoTop
