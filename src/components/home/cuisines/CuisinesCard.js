import React, {useState} from 'react';
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import {Stack, Typography, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

const CuisinesCard = ({item}) => {
    const theme=useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const [hover, setHover] = useState(false);
    const { global } = useSelector((state) => state.globalSettings)
    return (
        <>
            <Link href={`cuisines/${item?.id}?name=${item?.name}`}>
           <Stack
              alignItems="center"
              justifyContent="center"
              spacing={{xs:1,md:2}}
              paddingY={{xs:"5px",md:"12px"}}
              borderRadius={{xs:"5px",md:"10px"}}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              sx={{
              cursor: "pointer",
              boxShadow: hover && "0 3px 20px rgb(0 0 0 / 0.2)",

          }}
              >
              <CustomImageContainer src={`${ global?.base_urls?.cuisine_image_url}/${item?.image}`} height="110px" width="110px" borderRadius="10px"
                                    objectFit="contained"
                                    smMb="5px"
                                    smHeight="50px"
                                    smWidth="50px"
              />
              <Typography textAlign="center" variant={isXSmall ? 'h6' : 'h5'}
                          sx={{
                              color: theme=>theme.palette.neutral[1000],
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',


                          }}
              >{item?.name}</Typography>
          </Stack>
            </Link>
        </>
    );
};

export default CuisinesCard;
