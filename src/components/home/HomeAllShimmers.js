import React from 'react';
import PropTypes from 'prop-types';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import CustomShimmerForBanner from "../CustomShimmer/CustomShimmerForBanner";
import CustomShimmerCategories from "../CustomShimmer/CustomShimmerCategories";
import CustomShimmerForCampaigns from "../CustomShimmer/CustomShimmerForCampaigns";
import CustomShimmerForBestFood from "../CustomShimmer/CustomShimmerForBestFood";

const HomeAllShimmers = props => {
    return (
        <CustomStackFullWidth>
            <CustomShimmerCategories
                noSearchShimmer="true"
                itemCount="10"
                smItemCount="5"
            />
            <CustomShimmerForCampaigns />
            {/*<CustomShimmerForBestFood />*/}

        </CustomStackFullWidth>
    );
};

HomeAllShimmers.propTypes = {

};

export default HomeAllShimmers;