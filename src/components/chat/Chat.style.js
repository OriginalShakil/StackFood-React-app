import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Drawer, Stack} from "@mui/material";

export const CustomBoxFullWidth = styled(Box)(({theme}) => ({
    position: 'relative',
    height: `calc(100vh - 100px)`,
    width: '100%',
    overflow: 'hidden',
}))
export const CustomInnerBoxFullWidth = styled(Box)(({theme}) => ({
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}))
export const ChatSidebarDesktop = styled(Drawer)({
    flexShrink: 0,
    width: 380,
    '& .MuiDrawer-paper': {
        position: 'relative',
        width: 380,
        height:'100%',


    }
});
export const ChatSidebarMobile = styled(Drawer)({
    maxWidth: '100%',
    width:"100%",
    '& .MuiDrawer-paper': {
        height: 'calc(100% - 59px)',
        maxWidth: '100%',
        top: 55,
        width:"100%",
    }
});
export const ChatContentWrapper = styled(Box)(({theme}) => ({
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
    padding: '1rem',
}))

export const ContactListWrapper = styled(Box)(({theme}) => ({
    //display:'block'
}))
export const ChatUserTop = styled(Stack)(({theme,mdUp}) => ({
    alignItems:"center",
    justifyContent:mdUp ?"flex-end": "space-between",
    padding:"5px",
    marginBottom:"10px",
    background:theme.palette.primary.main
}))