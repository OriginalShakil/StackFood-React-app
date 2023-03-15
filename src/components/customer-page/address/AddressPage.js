import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Container, Divider, IconButton, Typography } from '@mui/material'
import DeleteAddress from './DeleteAddress'
import { useTheme } from '@mui/material/styles'
import deleteImg from "../../../../public/static/Vector (5).png"
import CustomDivider from "../../CustomDivider";
import {useTranslation} from "react-i18next";

const AddressPage = ({
    address_type,
    contact_person_number,
    address,
    latitude,
    longitude,
    user_id,
    contact_person_name,
    zone_id,
    id,
    refetch,
}) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const {t}=useTranslation()
    return (
<>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom:"15px",

                }}
            >
                <Typography sx={{ fontSize: '14px', fontWeight: '700',   textTransform:"capitalize" }}>
                    <LocationOnIcon
                        sx={{
                            fontSize: '20px',
                            color: (theme)=>theme.palette.primary.main,
                            marginRight: '8px',

                        }}
                    />
                    {t(address_type)}
                </Typography>
                <Typography>
                    {/*<IconButton>*/}
                    {/*    <EditLocationAltIcon*/}
                    {/*        sx={{ fontSize: '14px', color: '#0094FF' }}*/}
                    {/*    />*/}
                    {/*</IconButton>*/}
                    <IconButton onClick={handleOpen}>
                        <img src={deleteImg.src}/>
                        {/*<DeleteIcon*/}
                        {/*    sx={{ fontSize: '14px', color: '#EF7822' }}*/}
                        {/*/>*/}
                    </IconButton>{' '}
                </Typography>
            </Box>
            <CustomDivider/>
            <Typography variant="h4" color={theme.palette.neutral[400]} marginTop="15px">
                {address}
            </Typography>
            {open && (
                <DeleteAddress
                    open={open}
                    handleClose={handleClose}
                    addressId={id}
                    refetch={refetch}
                />
            )}
</>
    )
}

export default AddressPage
