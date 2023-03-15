import React from 'react';
import {CustomTypographyBold} from "../styled-components/CustomStyles.style";
import {useTranslation} from "react-i18next";


const CustomPageTitle = props => {
    const {t} =useTranslation()
    const {title} = props
    return (
        <CustomTypographyBold variant="h3" >
           {t(title)}
       </CustomTypographyBold>
    );
};
export default CustomPageTitle;