import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Avatar, Card} from "@mui/material";

export const ChatMessageWrapper = styled(Box)(({theme, authorType, userType,languageDirection}) => ({
    display: 'flex',
    flexDirection: authorType === userType
        ? 'row-reverse'
        : 'row',
    maxWidth: 500,
     marginLeft: authorType === userType ? languageDirection==="rtl"? 0: 'auto' : 0,
    marginBottom: '1rem',
    marginRight:authorType === userType ?  languageDirection==="rtl" ? "auto":0 :0


}))

export const CustomAvatar = styled(Avatar)(({theme, authorType, userType}) => ({
    height: 32,
    marginLeft: authorType === userType ? 2 : 0,
    marginRight: authorType === userType ? 0 : 2,
    width: 32
}))
export const BodyWrapper = styled(Box)(({theme}) => ({
    flexGrow: 1,
    maxWidth:500
}))
export const CardWrapper = styled(Card)(({theme, authorType, userType}) => ({
    backgroundColor:authorType === userType ? theme.palette.neutral[200]: theme.palette.neutral[700],

    color: authorType === userType
        ? theme.palette.primary.contrastText
        : 'text.primary',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '.1rem',
    paddingBottom: '.5rem',
}))
export const TimeWrapper = styled(Box)(({theme, authorType, userType}) => ({
    display: 'flex',
    justifyContent: authorType === userType
        ? 'flex-end'
        : 'flex-start',
    marginTop: 1,
    paddingTop: 2
}))