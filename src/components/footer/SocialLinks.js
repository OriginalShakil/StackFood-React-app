import React from 'react'
import { IconButton } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import facebookIcon from '../../../public/static/fb.png'
import instraIcon from '../../../public/static/footer/socialicons/instragram.svg'
import pinterestIcon from '../../../public/static/footer/socialicons/pinterest.svg'
import twitterIcon from '../../../public/static/footer/socialicons/twitter.svg'
import linkedInIcon from '../../../public/static/footer/socialicons/linkedin.svg'
import errorImage from '../../../public/static/no-image-found.png'
import CustomImageContainer from '../CustomImageContainer'

const SocialLinks = (props) => {
    const { global } = props
    const { t } = useTranslation()
    const clickHandler = (link) => {
        window.open(link)
    }
    const iconHandler = (name) => {
        switch (name) {
            case 'facebook':
                return facebookIcon.src
            case 'instagram':
                return instraIcon.src
            case 'twitter':
                return twitterIcon.src
            case 'linkedin':
                return linkedInIcon.src
            case 'pinterest':
                return pinterestIcon.src
            default:
                return errorImage.src
        }
    }
    return (
        <CustomStackFullWidth spacing={1}>
            <CustomTypography
                sx={{
                    color: (theme) => theme.palette.whiteContainer.main,
                }}
            >
                {t(
                    'Connect with our social media and other sites to keep up to date'
                )}
            </CustomTypography>
            <CustomStackFullWidth
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
                {global &&
                    global?.social_media?.length > 0 &&
                    global?.social_media?.map((item, index) => {
                        const { name, link } = item
                        return (
                            <IconButton
                                sx={{ padding: '0px' }}
                                key={index}
                                color="primary"
                                onClick={() => clickHandler(link)}
                            >
                                <CustomImageContainer
                                    src={iconHandler(name)}
                                    alt={name}
                                    height="50px"
                                    width="50px"
                                    objectFit="contained"
                                />
                            </IconButton>
                        )
                    })}
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    )
}

SocialLinks.propTypes = {}

export default SocialLinks
