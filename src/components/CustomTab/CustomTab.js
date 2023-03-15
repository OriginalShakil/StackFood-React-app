import React from "react"
import {Tab, Tabs,Box} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {RestaurantDetailsNavButton} from "../food-card/FoodCard.style";
import {CustomTabs} from "../../styled-components/CustomStyles.style";
import {TabCustom} from "./CustomTab.style";
import {useRouter} from "next/router";


const CustomTab=({tabData,handleNavigate})=>{
    const router=useRouter()
      const handleRoute=(path)=>{
         handleNavigate(path)
      }
    const activeRoute = (routeName, currentRoute) => {
        return routeName === currentRoute ? true : false
    }

    return(

        <>
        <TabContext >
                <TabList
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example">

                    {tabData.map((menu)=>{
                        return(
                            <>
                                <TabCustom onClick={()=>handleRoute(menu.path)}
                                    label={menu.label}
                                           selected={activeRoute(
                                               menu.path,
                                               router.pathname
                                           )}/>
                            </>
                        )

                    })}
                </TabList>
        </TabContext>
        </>
    )
}
export default CustomTab