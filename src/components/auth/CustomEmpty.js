import React from 'react';
import PropTypes from 'prop-types';
import {CustomStackFullWidth, ImageContainer} from "../../styled-components/CustomStyles.style";
import {CustomTypography, EmptyMessageContainer} from "./Tables.style";
import {useTranslation} from "react-i18next";
import CustomImageContainer from "../custom-image-container/CustomImageContainer";
import emptyImage from '../../assets/images/empty.png'
const EmptyMessage = props => {
    const {t} = useTranslation()
    return (
        <EmptyMessageContainer alignItems='center' justifyContent='center' >
            <CustomImageContainer src={emptyImage} alt='logo'
                                  width='4rem' height='4rem' objectFit='contained'/>
            <CustomTypography>
                {t('No data')}
            </CustomTypography>
        </EmptyMessageContainer>
    );
};

EmptyTableMessage.propTypes = {

};

