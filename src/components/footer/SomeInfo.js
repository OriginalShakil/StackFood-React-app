import React from 'react'
import PropTypes from 'prop-types'
import {
    CustomStackFullWidth,
    CustomTypographyBold,
} from '../../styled-components/CustomStyles.style'
import CustomImageContainer from '../CustomImageContainer'
import { CustomTypography } from '../custom-tables/Tables.style'

const SomeInfo = (props) => {
    const { image, alt, title, info, t } = props
    return (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            spacing={3}
        >
            <CustomImageContainer
                src={image.src}
                alt={alt}
                height={50}
                width={50}
            />
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <CustomTypographyBold
                    sx={{
                        color: 'whiteContainer.main',
                        textTransform: 'capitalize',
                    }}
                >
                    {t(title)}
                </CustomTypographyBold>
                <CustomTypography
                    sx={{
                        color: 'whiteContainer.main',
                    }}
                >
                    {info}
                </CustomTypography>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

SomeInfo.propTypes = {}

export default SomeInfo
