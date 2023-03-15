import {styled, Tab} from "@mui/material";

export const TabCustom = styled(Tab)(({ theme }) => ({
           color: "#ffff",
           padding:"5px",
           fontSize:"15px",
           // border:"1px solid ",
           borderRadius:"5px",
           marginTop:"5px",
           backgroundColor:theme.palette.primary.main



}))