import React, { useRef, useState } from 'react'
import { TextField, Box, Tooltip, IconButton, styled } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'
import ChatImage from './ChatImage'
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#EF7822',
        background: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#EF7822',
        background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        border: '2px solid #D1D5DB',
        '& fieldset': {
            // borderColor: '#EF7822',
        },
        '&:hover fieldset': {
            borderColor: '#EF7822',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EF7822',
        },
    },
})
const ChatMessageAdd = ({ onSend }) => {
    const [body, setBody] = useState({
        text: '',
        file: [],
    })
    const languageDirection = localStorage.getItem('direction')
    const fileInputRef = useRef(null)
    const handleChange = (event) => {
        setBody({ ...body, text: event.target.value })
    }

    const handleSend = () => {
        if (!body) {
            toast.error(t('write something'))
            return
        }
        if (body.file.length > 3) {
            toast.error(t('Maximum 3 images can be send at a time.'))
        } else {
            onSend?.(body)
            setBody({ text: '', file: [] })
        }
    }
    const handleAttach = () => {
        fileInputRef.current.click()
    }
    const handleKeyUp = (event) => {
        if (event.code === 'Enter' && !event.shiftKey) {
            handleSend()
        }
    }
    const MAX_LENGTH = 3
    const handleFileOnChange = (e) => {
        setBody({ ...body, file: [...body.file, ...e.target.files] })
    }

    const removeImage = (name) => {
        const tempData = body.file.filter((item) => item.name !== name)
        setBody({ file: tempData })
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: theme=>theme.palette.neutral[200],
                display: 'flex',
                flexShrink: 0,
                p: 3,
                position: 'relative',
            }}
        >
            {/*<Avatar*/}
            {/*    sx={{*/}
            {/*        display: {*/}
            {/*            xs: 'none',*/}
            {/*            sm: 'inline'*/}
            {/*        },*/}
            {/*        mr: 2*/}
            {/*    }}*/}
            {/*    src={user.avatar}*/}
            {/*/>*/}
            <CssTextField
                // disabled={disabled}
                fullWidth
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                placeholder={t('Leave a message')}
                value={body.text}
                size="small"
                multiline
            />

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: -2,
                    ml: languageDirection !== 'rtl' && 2,
                    mr: languageDirection === 'rtl' && '1rem',
                }}
            >
                <Tooltip title="Attach photo">
                    <Box
                        sx={{
                            m: 1,
                        }}
                    >
                        <IconButton
                            // disabled={disabled}
                            edge="end"
                            onClick={handleAttach}
                        >
                            <InsertPhotoIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Tooltip>

                <Tooltip title="Send">
                    <Box sx={{ m: 1 }}>
                        <IconButton
                            color="primary"
                            disabled={
                                body.text === '' && body.file.length === 0
                            }
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            onClick={handleSend}
                        >
                            <SendIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
            <input
                hidden
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileOnChange}
            />
            {body.file.length > 0 && (
                <ChatImage body={body} removeImage={removeImage} />
            )}
        </Box>
    )
}
export default ChatMessageAdd
