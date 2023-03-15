import React from 'react'
import copyIcon from '../../../assets/images/signin/copyicon.png'
import { AdminCredentialBox } from '../Signin.style'
import {
    CustomCopyIconWrapperForAdminCredentials,
    CustomTypographyForAdminCredentials,
    FlexContainerColForAdminCredentials,
    FlexContainerSpaceBetweenForAdminCredentials,
    ImageContainerForAdminCredentials,
} from './AdminCredentials.style'

const AdminCredentials = (props) => {
    const { credentials, credentialHandler } = props
    return (
        <AdminCredentialBox>
            <FlexContainerSpaceBetweenForAdminCredentials>
                <FlexContainerColForAdminCredentials>
                    <CustomTypographyForAdminCredentials>
                        username : {credentials.name}
                    </CustomTypographyForAdminCredentials>
                    <CustomTypographyForAdminCredentials>
                        password : {credentials.pass}
                    </CustomTypographyForAdminCredentials>
                </FlexContainerColForAdminCredentials>
                <CustomCopyIconWrapperForAdminCredentials
                    onClick={credentialHandler}
                >
                    <ImageContainerForAdminCredentials>
                        <img src={copyIcon} alt="copyIcon" />
                    </ImageContainerForAdminCredentials>
                </CustomCopyIconWrapperForAdminCredentials>
            </FlexContainerSpaceBetweenForAdminCredentials>
        </AdminCredentialBox>
    )
}

AdminCredentials.propTypes = {}

export default AdminCredentials
