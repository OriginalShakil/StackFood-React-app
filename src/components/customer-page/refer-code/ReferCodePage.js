import React, { useState } from 'react'
import {
    CustomColouredTypography,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import {
    alpha,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { getAmount } from '../../../utils/customFunctions'
import CustomImageContainer from '../../CustomImageContainer'
import manImage from '../../../../public/static/refer_a_friend.png'
import moneyImage from '../../../../public/static/earn_money.png'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { useTheme } from '@mui/material/styles'
import { CustomTypographyGray } from '../../error/Errors.style'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import toast from 'react-hot-toast'

const ReferCodePage = () => {
    const theme = useTheme()
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    const { userData } = useSelector((state) => state.user)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const referral = t('referral')
    const get = t('Get')
    const join = t('on joining')
    const copyReferCode = async (text) => {
        if (typeof window !== undefined) {
            await window.navigator.clipboard.writeText(text)
        }
    }

    const handleTooltipClose = () => {
        setTooltipOpen(false)
    }

    const handleTooltipOpen = async (refer_code) => {
        setTooltipOpen(true)
        await copyReferCode(refer_code)
        toast.success(t('Referral code Copied'))
    }
    return (
        <>
            <CustomStackFullWidth
                my="2rem"
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: '100%' }}
            >
                <CustomPaperBigCard>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12} md={12} textAlign="center">
                            <CustomColouredTypography>
                                {t('Earn money on every referral')}
                            </CustomColouredTypography>
                            <Typography fontWeight="600">
                                {' '}
                                {`1 ${referral} = ${getAmount(
                                    global?.ref_earning_exchange_rate,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}`}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            md={12}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={6}>
                                <CustomStackFullWidth
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Stack width="200px" height="250px">
                                        <CustomImageContainer
                                            src={manImage.src}
                                            width="100%"
                                            height="100%"
                                            objectFit="contained"
                                        />
                                    </Stack>
                                    <CustomTypography>
                                        {t('Refer your code to your friends')}
                                    </CustomTypography>
                                </CustomStackFullWidth>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomStackFullWidth
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Stack width="200px" height="250px">
                                        <CustomImageContainer
                                            src={moneyImage.src}
                                            width="100%"
                                            height="100%"
                                            objectFit="contained"
                                        />
                                    </Stack>
                                    <CustomTypography>
                                        {`${get} ${getAmount(
                                            global?.ref_earning_exchange_rate,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )} ${join}`}
                                    </CustomTypography>
                                </CustomStackFullWidth>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <CustomTypographyGray nodefaultfont="true">
                                {t('Your Referral Code')}
                            </CustomTypographyGray>
                            <Stack
                                width="100%"
                                justifyContent="space-between"
                                alignItems="center"
                                direction="row"
                                padding="10px"
                                backgroundColor={alpha(
                                    theme.palette.primary.main,
                                    0.2
                                )}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            >
                                <Stack>
                                    <Typography>{userData.ref_code}</Typography>
                                </Stack>
                                <Stack>
                                    <ClickAwayListener
                                        onClickAway={handleTooltipClose}
                                    >
                                        <Tooltip
                                            placement="top"
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={handleTooltipClose}
                                            open={tooltipOpen}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title={t('Copied')}
                                        >
                                            {/*<Button onClick={handleTooltipOpen}>Click</Button>*/}
                                            <IconButton
                                                onClick={() =>
                                                    handleTooltipOpen(
                                                        userData.ref_code
                                                    )
                                                }
                                            >
                                                <Stack>
                                                    <ContentCopyIcon
                                                        sx={{
                                                            color: theme.palette
                                                                .primary.main,
                                                        }}
                                                        style={{
                                                            fontSize: 16,
                                                            textAlign: 'right',
                                                        }}
                                                    />
                                                    {/*<Typography color={theme.palette.neutral[1000]} variant="subtitle2">{t("Tap to copy")}</Typography>*/}
                                                </Stack>
                                            </IconButton>
                                        </Tooltip>
                                    </ClickAwayListener>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </CustomPaperBigCard>
            </CustomStackFullWidth>
        </>
    )
}
export default ReferCodePage
