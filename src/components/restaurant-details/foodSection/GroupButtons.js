import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RestaurantDetailsNavButton } from '../../food-card/FoodCard.style'
import { ButtonGroup, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import {RTL} from "../../RTL/RTL";

const useStyles = makeStyles((theme) => ({
    affected: {
        textAlign: 'right',
    },
    unaffected: {
        flip: false,
        textAlign: 'right',
    },
}))

const GroupButtons = ({ setType, type }) => {
    const [languageDirection, setLanguageDirection] = useState('ltr')
    useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])

    const { t } = useTranslation()
    // const useStyles = makeStyles(
    //     (theme) => ({
    //         affected: {
    //             textAlign: 'right',
    //         },
    //         unaffected: {
    //             flip: false,
    //         },
    //     }),
    //     { defaultTheme }
    // )
    const classes = useStyles()

    return (
        <RTL direction={languageDirection}>
        <Tabs
            orientation="horizontal"
            // variant="contained"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <ButtonGroup
                sx={{ borderTopLeftRadius: '30px' }}
                className={classes.unaffected}
            >
                <RestaurantDetailsNavButton
                    languageDirection={languageDirection}
                    background={type === 'all'}
                    onClick={() => setType('all')}
                    sx={{
                        width: { xs: '80px', md: '100px' },
                        // borderTopLeftRadius:
                        //     languageDirection === 'rtl' ? '0px' : '15px',
                        // borderTopRightRadius:
                        //     languageDirection === 'rtl' ? '50px' : '0px',
                        // borderBottomLeftRadius:
                        //     languageDirection === 'rtl' ? '0px' : '15px',
                        // border: '1px solid',
                        // borderColor: 'primary.main',
                    }}
                    // borderRigthTop="20px"
                    // borderRightBottom="20px"
                >
                    {t('All')}
                </RestaurantDetailsNavButton>
                <RestaurantDetailsNavButton
                    // color={
                    //     type === 'veg' ? 'primary' : 'whiteContainer'
                    // }languageDirection={languageDirection}

                    background={type === 'veg'}
                    onClick={() => setType('veg')}
                    sx={{ width: { xs: '80px', md: '100px' } }}
                >
                    {t('Veg')}
                </RestaurantDetailsNavButton>
                <RestaurantDetailsNavButton
                    languageDirection={languageDirection}
                    background={type === 'non_veg'}
                    onClick={() => setType('non_veg')}
                    sx={{ width: { xs: '80px', md: '100px' } }}
                    borderLeftBottom="15px"
                    borderLeftTop="20px"
                >
                    {t('Non-Veg')}
                </RestaurantDetailsNavButton>
            </ButtonGroup>
        </Tabs>
        </RTL>
    )
}

GroupButtons.propTypes = {}

export default GroupButtons
