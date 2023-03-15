import React from 'react'
import {Grid, Typography, Divider, Stack} from '@mui/material'
import {useSelector} from "react-redux";
import {getAmount} from "../../../utils/customFunctions";
import CustomePagination from "../../pagination/Pagination";
import {useTheme} from "@mui/material/styles";
import {CustomTypographyGray} from "../../error/Errors.style";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {t} from "i18next";

const WalletsPage = ({ data,currencySymbolDirection,currencySymbol,digitAfterDecimalPoint }) => {
 const theme=useTheme()
    const languageDirection = localStorage.getItem('direction')
    const debit=data.debit+data.admin_bonus
    const credit=data.credit+data.admin_bonus
    return (
        <>
            <Grid
                container
                md={12}
                xs={12}
                padding={{xs:".4rem",md:".7rem"}}
                justifyContent="space-between"

            >
                <Grid item md={7} xs={4.5}>
                    <CustomStackFullWidth >
                        <Typography  fontWeight='700' >
                            {data?.transaction_type==="order_place"? getAmount(debit,currencySymbolDirection,currencySymbol,digitAfterDecimalPoint,):getAmount(credit,currencySymbolDirection,currencySymbol,digitAfterDecimalPoint)}
                        </Typography>
                        <CustomTypographyGray  textTransform="capitalize" sx={{fontSize:'14px'}}>
                            {t(data?.transaction_type).replaceAll("_"," ")}
                        </CustomTypographyGray>
                    </CustomStackFullWidth>
                </Grid>
                <Grid item md={5} xs={7.5} >
                    <Stack direction="row"
                    justifyContent="flex-end" alignItems="center"  spacing={{ xs: 1, md:languageDirection==="rtl"? 0:3 }} flexWrap="wrap">
                        <Typography fontSize='12px'
                                    color={theme.palette.neutral[400]}
                                    textTransform="capitalize"
                                    align='center'
                        >
                            {data?.created_at}
                        </Typography>
                        <Typography textTransform="capitalize" fontSize= '13px' color={data?.transaction_type==="order_place" ?theme.palette.success.main:theme.palette.error.main} paddingRight={languageDirection === 'rtl' ? "24px" : "0px"}>
                            { data?.transaction_type==="order_place"? t("debit"):t("credit")}

                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Divider />

        </>
    )
}

export default WalletsPage
