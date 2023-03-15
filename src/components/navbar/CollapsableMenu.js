import React, { useState } from 'react'
import {alpha, Collapse, Typography} from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Button } from '@material-ui/core'
import {useRouter} from "next/router";
import Link from "next/link"
import {getDataLimit} from "../../utils/customFunctions";
import {t} from "i18next";

const CollapsableMenu = ({ value, toggleDrawers,setOpenDrawer,pathName}) => {
    const router=useRouter()

    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(!open)
    const handleRoute=(id)=>{
        router.push(`${value.path}/${id}`)
        setOpen(false)
        setOpenDrawer(false)


    }
const handleView=()=>{
        router.push(pathName)
        setOpen(false)
        setOpenDrawer(false)
}
    return (
        <>
            <ListItemButton onClick={handleClick} sx={{'&:hover': {
                    backgroundColor: 'primary.main',
                }}}>
                <ListItemText primary={t(value?.text)} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit >
                <List component="div" disablePadding >
                    {getDataLimit(value.items)?.map((item, index) => (
                        <ListItemButton sx={{ pl: 4,'&:hover': {
                                backgroundColor: theme=>alpha(theme.palette.primary.main,.2),
                            } }} key={index} onClick={()=>handleRoute(item.id)}>
                            <ListItemText  primary={item.name} >
                            </ListItemText>

                        </ListItemButton>
                    ))}
                  <ListItemButton sx={{ padding:"3px", color:theme=>theme.palette.neutral[100],textAlign:"center",backgroundColor:theme=>theme.palette.primary.main,borderRadius:"10px",marginRight:"20px",marginLeft:"22px"}}
                   onClick={handleView}
                  >
                      <ListItemText  primary={t("View all")} >
                      </ListItemText>
                  </ListItemButton>
                </List>
            </Collapse>
        </>
    )
}

export default CollapsableMenu
