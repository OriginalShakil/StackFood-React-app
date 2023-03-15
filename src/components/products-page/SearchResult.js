import React from 'react'
import { Grid, Typography } from '@mui/material'
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {RTL} from "../RTL/RTL";

export default function SearchResult({ searchValue, count, foodOrRestaurant }) {
    const {t}=useTranslation()
    const theme=useTheme()
    const languageDirection = localStorage.getItem('direction')
    return (
       <RTL direction={languageDirection}>
           <Grid item container md={12} lg={12} xs={12}>
               <Grid
                   item
                   md={12}
                   lg={12}
                   xs={12}
                   sx={{ padding: '10px 0px', background:(theme)=>theme.palette.neutral[200] }}
               >
                   <Typography sx={{ textAlign: 'center' }}>
                       {t("Search result for")}{' '}
                       <Typography  component="span" color={theme.palette.primary.main}>"{searchValue?searchValue:"item"}"</Typography>{' '}
                       <Typography component="span" cstyle={{ color: '#EF7822' }}>{count}{' '}</Typography>
                       {foodOrRestaurant === 'products' ? t('foods') : t('restaurants')}{' '}
                       {' '}
                   </Typography>
               </Grid>
           </Grid>
       </RTL>
    )
}
