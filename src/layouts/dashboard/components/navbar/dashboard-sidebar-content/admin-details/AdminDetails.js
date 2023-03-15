import React from 'react'
import CustomAvatar from '../../../../../../components/custom-avatar/CustomAvatar'
import icon from '../../../../../../assets/images/icons/avatar.png'
import {
    CustomTypographyForAdminDetails,
    FlexContainerForAdminDetails,
    TextWrapperForAdminDetails,
    WrapperForAdminDetails,
} from './AdminDetails.style'

const AdminDetails = (props) => {
    const { data, open } = props
    const adminDetailsData = () => {
        if (open) {
            return (
                <FlexContainerForAdminDetails>
                    <CustomAvatar avatarImage={icon} />
                    <TextWrapperForAdminDetails>
                        <CustomTypographyForAdminDetails variant="h5">
                            {data.email}
                        </CustomTypographyForAdminDetails>
                        <CustomTypographyForAdminDetails>
                            {data.type}
                        </CustomTypographyForAdminDetails>
                    </TextWrapperForAdminDetails>
                </FlexContainerForAdminDetails>
            )
        } else {
            return <CustomAvatar avatarImage={icon} />
        }
        return
    }
    return (
        <WrapperForAdminDetails open={open}>
            {adminDetailsData()}
        </WrapperForAdminDetails>
    )
}
export default AdminDetails
