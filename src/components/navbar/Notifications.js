import React from 'react'
import Box from '@mui/material/Box'
import {Divider, IconButton, Menu, MenuItem, Stack, Typography} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Notification from '../../../public/static/Notification/Ellipse 26.png'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {CustomStack} from "../../styled-components/CustomStyles.style";

const Notifications = () => {
    const { t } = useTranslation()
    const [notify, setNotify] = React.useState(null)
    const notifyopen = Boolean(notify)
    const handleNotifyClick = (event) => {
        setNotify(event.currentTarget)
    }
    const handleNotifyClose = () => {
        setNotify(null)
    }
    return (
        <>
            <IconButton
                onClick={handleNotifyClick}
                size="small"
                aria-controls={notifyopen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={notifyopen ? 'true' : undefined}
            >
                <NotificationsIcon  />
            </IconButton>
            <SimpleBar style={{ maxHeight: 400 }}>
            <Menu
                anchorEl={notify}
                id="account-menu"
                open={notifyopen}
                onClose={handleNotifyClose}
                onClick={handleNotifyClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        height: '300px',

                        // webkitOverflowScrolling: 'touch',

                        // overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 10,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                  <CustomStack>
                       <Typography sx={{ fontSize: '18px', color: '#EF7822' }}>

                           {t('Notification')}
                       </Typography>
                  </CustomStack>
                   <Divider />
                <CustomStack>
                       <Typography sx={{ color: '#9B9B9B' }}>
                           15 April, 2022
                       </Typography>
                    </CustomStack>
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....{' '}
                           </Typography>
                       </Box>
                   </MenuItem>
                   <Divider />
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....{' '}
                           </Typography>
                       </Box>
                   </MenuItem>
                <CustomStack>
                    <Typography sx={{ color: '#9B9B9B' }}>
                        15 April, 2022
                    </Typography>
                </CustomStack>
                   <MenuItem
                       sx={{
                           display: 'flex',
                           alignItems: 'flex-start',
                           gap: '5px',
                       }}
                   >
                       <img src={Notification.src} alt="" />
                       <Box>
                           <Typography>Notification sent </Typography>
                           <Typography
                               sx={{
                                   fontSize: '12px',
                                   whiteSpace: 'no-wrap',
                                   textOverflow: 'ellipsis',
                                   overflow: 'hidden',
                                   width: '200px',
                               }}
                           >
                               "Lorem ipsum dolor sit amet, consectetur adipiscing
                               elit, sed do eiusmod tempor incididunt ut labo fgjkj
                               magna....
                           </Typography>
                       </Box>
                   </MenuItem>
                   <Divider />

            </Menu>
            </SimpleBar>
        </>
    )
}

export default Notifications
