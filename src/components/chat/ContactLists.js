import React from 'react'
import { List, Stack, Typography, Box } from '@mui/material'
import {
    CustomListItem,
    CustomStackFullWidth,
} from '../../styled-components/CustomStyles.style'
import InfoCard from './InfoCard'
import SimpleBar from 'simplebar-react'
import { CustomTypography } from '../custom-tables/Tables.style'
import { t } from 'i18next'
import Skeleton from '@mui/material/Skeleton'
import 'simplebar-react/dist/simplebar.min.css'

import { makeStyles } from '@material-ui/core/styles'
import {useSelector} from "react-redux";

// const ContactInformation=({channelUsers, handleChannelOnClick})=>{
//
//
//     return(
//         <>
//                 return   <CustomListItem disableGutters cursor='true' onClick={()=>handleChannelOnClick(channelUsers)}>
//                         {/*<InfoCard name={channelUsers.receiver_type} />*/}
//                      </CustomListItem>
//
//         </>
//     )
// }

const ContactLists = ({
    channelList,
    handleChannelOnClick,
    channelLoading,
    selectedId,
}) => {
    const { global } = useSelector((state) => state.globalSettings)

    if (channelLoading) {
        return (
            <>
                {[...Array(1, 2, 3, 4)].map(() => {
                    return (
                        <Box padding=".5rem">
                            <Stack direction="row" spacing={3}>
                                <Skeleton
                                    animation="wave"
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                                <Stack
                                    justifyContent="space-between"
                                    direction="column"
                                    width="100%"
                                >
                                    <Skeleton
                                        animation="wave"
                                        height={15}
                                        width="20%"
                                    />
                                    <Skeleton
                                        animation="wave"
                                        height={15}
                                        width="40%"
                                    />
                                </Stack>
                            </Stack>
                        </Box>
                    )
                })}
            </>
        )
    }
    const handleInfoCard = (item) => {
        if (item.sender_type === 'customer') {
            return (
                <InfoCard
                    name={item.receiver_type.replaceAll('_', ' ')}
                    messageTime={item.created_at}
                    receiver={
                        item.receiver ? item.receiver.f_name : global?.business_name
                    }
                    unRead={item.unread_message_count}
                    userList={item}
                    selectedId={selectedId}
                    currentId={item.id}
                />
            )
        } else {
            return (
                <InfoCard
                    name={item.sender_type.replaceAll('_', ' ')}
                    messageTime={item.created_at}
                    receiver={
                        item?.sender?.f_name.concat(
                            ' ',
                            item?.sender?.l_name
                        ) || ' '
                    }
                    unRead={item.unread_message_count}
                    userList={item}
                    selectedId={selectedId}
                    currentId={item.id}
                />
            )
        }
    }

    return (
        <CustomStackFullWidth>
            {channelList?.length > 0 && (
                <SimpleBar style={{ maxHeight: "60vh" }}>
                    <List disablePadding>
                        {channelList?.map((item, index) => {
                            return (
                                <CustomListItem
                                    disableGutters
                                    disablePadding
                                    cursor="true"
                                    onClick={() => handleChannelOnClick(item)}
                                >
                                    {handleInfoCard(item)}
                                </CustomListItem>
                            )
                        })}
                    </List>
                </SimpleBar>
            )}
            {channelList.length === 0 && (
               <Stack width="100%" justifyContent="center" alignItems="center">
                   <CustomTypography>
                       {t('You have no channels.')}
                   </CustomTypography>
               </Stack>
            )}
        </CustomStackFullWidth>
    )
}

export default ContactLists
