import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ChatMessage from './ChatMessage'
import CustomModal from '../custom-modal/CustomModal'
import CustomImageContainer from '../CustomImageContainer'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { IconButton, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ScrollToBottom } from './ChatView'
import ImagePreviewOnModal from '../image-preview-on-modal'

const ChatMessages = ({ conversationData, scrollBottom }) => {
    const [messagesData, setMessagesData] = useState([])
    const [isMessage, setIsMessage] = useState(false)
    const [conversationDetails, setConversationDetails] = useState()
    const [openModal, setModalOpen] = useState(false)
    const [modalImage, setModalImage] = useState(null)
    const messagesEndRef = useRef(null)
    useEffect(() => {
        let a = []
        if (conversationData.length > 0) {
            conversationData.forEach((page) => {
                setConversationDetails(page)
                page?.messages?.forEach((item) => a.push(item))
            })
            setMessagesData(a)
            setIsMessage(true)
        }
    }, [conversationData])
    useEffect(() => {
        modalImage && setModalOpen(true)
    }, [modalImage])

    const handleImageOnClick = (value) => {
        setModalImage(value)
    }
    const handleModalClose = (value) => {
        setModalOpen(value)
        setModalImage(null)
    }

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'end',
    //         inline: 'nearest',
    //     })
    // }
    //
    // useEffect(() => {
    //     scrollToBottom()
    // }, [isMessage])

    return (
        <Box sx={{ p: 2 }}>
            <>
                {messagesData
                    ?.map((item, index) => (
                        <ChatMessage
                            body={item?.message}
                            messgageData={item && item}
                            createdAt={item?.updated_at}
                            conversationData={conversationDetails}
                            image={JSON.parse(item?.file)}
                            handleImageOnClick={handleImageOnClick}
                        />
                    ))
                    .reverse()}
                <CustomModal
                    openModal={openModal}
                    setModalOpen={handleModalClose}
                >
                    <ImagePreviewOnModal
                        modalImage={modalImage}
                        handleModalClose={handleModalClose}
                    />
                </CustomModal>
                {/*{conversationData.length > 0 &&*/}
                {/*    conversationData.length === 1 && (*/}
                {/*        <ScrollToBottom channelId={channelId} />*/}
                {/*    )}*/}
                {scrollBottom && <ScrollToBottom />}

                {/*<Stack ref={messagesEndRef}></Stack>*/}
            </>
        </Box>
    )
}

ChatMessages.propTypes = {}

export default ChatMessages
