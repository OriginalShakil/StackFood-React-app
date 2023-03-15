import React, {useEffect, useState} from 'react'
import { Box, Button, Container, Modal, Typography } from '@mui/material'
import { useMutation } from 'react-query'
import { AddressApi } from '../../../hooks/react-query/config/addressApi'
import map from '../../../../public/static/map2.png'
import {useTranslation} from "react-i18next";
import CustomImageContainer from "../../CustomImageContainer";
import placeholder from "../../../../public/static/no-image-found.png"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:350,
    height: 220,
    bgcolor: '#FFFFFF',

    p: 4,
    boxShadow:
        '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 10px 20px -5px rgba(145, 158, 171, 0.1)',
    borderRadius: '10px',
}
const DeleteAddress = ({ open, handleClose, addressId, refetch }) => {
    const [mapImg,setMapImg]=useState()
    const {t}=useTranslation()
    const {
        mutate: deleteMutation,
        isLoading,
        error,
    } = useMutation(AddressApi.deleteAddress, {
        onSuccess: () => {

            refetch()
            // QueryClient.invalidateQueries()
        },
        onError: (error) => {

        },
        // onSettled: (data, error, editedValue) => {
        //     QueryCache.removeQueries(['address-list', addressId])
        // },
    })
    const deleteAddredd = () => {

        deleteMutation(addressId)
    }
    useEffect(() => {
        setMapImg(map.src)
    }, []);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container sx={style} >
                    {/*<CustomImageContainer src={map.src} alt=""/>*/}
                    <img
                        style={{
                            position: 'absolute',
                            zIndex: '1',
                            top: '-60px',
                            left: '125px',
                        }}
                        src={mapImg}
                        alt={t("map-image")}
                        onError={()=>setMapImg(placeholder.src)}
                        width="120px"

                    />

                    <Box sx={{ textAlign: 'center', padding: '10px' }}>
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 3, padding: '10px' }}
                        >
                            {t("Are you sure you want to delete this address?")}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button
                                sx={{
                                    background: '#E5E5E5',
                                    color: 'black',
                                    width: '120px',
                                }}
                                onClick={handleClose}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button
                                sx={{
                                    background: '#FF686A',
                                    color: 'white',
                                    width: '120px',
                                    "&:hover": {
                                        background:(theme) => theme.palette.neutral[1000]

                                    }

                                }}
                                onClick={() => deleteAddredd()}
                            >
                                {t("Delete")}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Modal>
        </div>
    )
}

export default DeleteAddress
