import React from 'react'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { CustomStackFullWidth } from '../../../styled-components/CustomStyles.style'
import ListItemText from '@mui/material/ListItemText'
import {alpha, Typography} from '@mui/material'
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider'
import CustomAlert from '../../alert/CustomAlert'
import CustomCheckOutShimmer from '../../CustomShimmerForCheckout/CustomCheckOutShimmer'
import {useTheme} from "@mui/material/styles";

const AddressSelectionList = (props) => {
    const theme = useTheme()
    const { data, allAddress, handleLatLng, t, address, isRefetching } = props
    return (
        <>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',

                }}
            >
                {data &&
                    allAddress?.length > 0 &&
                    allAddress?.map((adres, index) => (
                        <>
                            <ListItem
                                onClick={() => handleLatLng(adres)}
                                alignItems="flex-start"
                                key={adres.id}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor:alpha(theme.palette.primary.main,.2),
                                    }
                                }}
                                selected={adres.id === address?.id}
                                // className="selected"
                            >
                                <CustomStackFullWidth
                                    direction="row"
                                    alignItems="center"
                                >
                                    <ListItemText
                                        primary={
                                            <Typography textTransform="capitalize">
                                                {t(adres.address_type)}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                {adres.address}
                                            </React.Fragment>
                                        }
                                    />
                                    <Radio
                                        checked={adres.id === address?.id}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    />
                                    {/*<Box*/}
                                    {/*    sx={{*/}
                                    {/*        height: '20px',*/}
                                    {/*        width: '20px',*/}
                                    {/*        borderRadius: '50%',*/}
                                    {/*        display:*/}
                                    {/*            address?.address ===*/}
                                    {/*            adres.address*/}
                                    {/*                ? 'inherit'*/}
                                    {/*                : 'none',*/}
                                    {/*        background: (theme) =>*/}
                                    {/*            theme.palette.neutral[300],*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </CustomStackFullWidth>
                            </ListItem>
                            <Divider
                                variant="inset"
                                sx={{ marginLeft: '0px' }}
                            />
                        </>
                    ))}
                {!isRefetching && allAddress?.length === 0 && (
                    <CustomAlert
                        type="info"
                        text={t('No saved addresses found to select.')}
                    />
                )}
                {!data && <CustomCheckOutShimmer />}
            </List>
        </>
    )
}

AddressSelectionList.propTypes = {}

export default AddressSelectionList
