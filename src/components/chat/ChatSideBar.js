import React from "react"
import {Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ChatSidebarDesktop, ChatSidebarMobile} from "./Chat.style";
import ChatContent from "./ChatContent";



const ChatSideBar=({chatFrom,open,isLoading,selectedId, handleReset,handleToggleSidebar,channelLoading,channelList,handleChannelOnClick,searchSubmitHandler,setSearchValue,searchValue,handleSearch})=>{

    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

        if(mdUp){
            return(
                <ChatSidebarDesktop
                    variant="persistent"
                    anchor="left"
                    open="true">
                 <ChatContent   handleToggleSidebar={handleToggleSidebar} channelList={channelList}
                                handleChannelOnClick={handleChannelOnClick}
                                setSearchValue={setSearchValue}
                                searchValue={searchValue}
                                handleSearch={handleSearch}
                                isLoading={isLoading}
                                handleReset={handleReset}
                                searchSubmitHandler={searchSubmitHandler}
                                channelLoading={channelLoading}
                                selectedId={selectedId}
                 />
                </ChatSidebarDesktop>
            )
        }return (
        <ChatSidebarMobile
            anchor="left"
            variant="temporary"
            open={chatFrom==="true"?!open:open}
        >  <ChatContent handleToggleSidebar={handleToggleSidebar} channelList={channelList}
                        handleChannelOnClick={handleChannelOnClick}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                        handleSearch={handleSearch}
                        isLoading={isLoading}
                        handleReset={handleReset}
                        searchSubmitHandler={searchSubmitHandler}
                        selectedId={selectedId}/>

        </ChatSidebarMobile>
    )



}
export default ChatSideBar