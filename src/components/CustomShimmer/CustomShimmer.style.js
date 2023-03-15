import {styled,Skeleton} from "@mui/material";

export const CustomSkeleton = styled(Skeleton)(({ theme,  }) => ({
    maxWidth:"100px",
    width:"100%",
    height:"100"
}))