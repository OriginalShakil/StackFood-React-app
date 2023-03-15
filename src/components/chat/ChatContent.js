import React, {useEffect, useState} from "react"
import {IconButton, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactLists from "./ContactLists";
import ChatContactSearch from "./ChatContactSearch";
import ChatWithAdmin from "./ChatWithAdmin";

const ChatContent=(  {handleToggleSidebar,selectedId,handleReset,searchSubmitHandler,channelLoading,isLoading,channelList,handleChannelOnClick,searchValue,setSearchValue,handleSearch})=>{

    const [channelListItems, setChannelListItems] = useState([])
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isAdmin=channelList && channelList?.find((item)=>item.receiver_type==="admin")

    return(
        <Stack spacing={2} padding=".5rem" >
            {/*<Stack direction="row" alignItems="center" justifyContent="end">*/}
            {/*    {*/}
            {/*        !mdUp && <IconButton onClick={handleToggleSidebar}>*/}
            {/*            <CloseIcon/>*/}
            {/*        </IconButton>*/}
            {/*    }*/}
            {/*</Stack>*/}
            {
                !isAdmin && !channelList && <ChatWithAdmin handleChannelOnClick={handleChannelOnClick}/>
            }

            <ChatContactSearch  searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                handleSearch={handleSearch}
                                isLoading={isLoading}
                                handleReset={handleReset}
                                searchSubmitHandler={searchSubmitHandler}/>
            <ContactLists  channelList={channelList} handleChannelOnClick={handleChannelOnClick} channelLoading={channelLoading} selectedId={selectedId}/>
        </Stack>

    )
}
export default ChatContent