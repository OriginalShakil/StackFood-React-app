import React, {useEffect, useState} from "react"
import {IconButton, Paper, Stack} from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import CloseIcon from '@mui/icons-material/Close';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {useTheme} from "@mui/material/styles";
const ChatImage=({body,removeImage})=>{
const theme=useTheme()
  const [files,setFiles]=useState()
    useEffect(() => {
       setFiles(body.file)
    }, [body.file])

    return(
        <Paper sx={{position:'absolute', bottom:78, padding:'5px',display:"flex",flexDirection:"row" ,gap:"20px"}} >
            {
                files?.map((item)=>{
                    return (
                        <Stack sx={{position:'relative', width:'auto'}} direction="row">
                            <CustomImageContainer objectFit='contained' src={URL.createObjectURL(item)} height="70px" width="100px" borderRadius=".5rem"/>
                            <IconButton sx={{position:"absolute", right:-10, bottom:-10}}>
                                <CloseIcon onClick={()=>removeImage(item.name)} sx={{color:theme=>theme.palette.error.main}} />
                            </IconButton>
                        </Stack>
                    )

                })

            }

        </Paper>
    )
}
export default ChatImage