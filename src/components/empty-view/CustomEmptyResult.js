import React from 'react'
import PropTypes from 'prop-types'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import Image from 'next/image'
import nofood from '../../assets/gif/no-food.gif'
import { Stack } from '@mui/material'
import { CustomTypographyGray } from '../../styled-components/CustomTypographies.style'
import { useTranslation } from 'react-i18next'

const CustomEmptyResult = ({ label,image }) => {
    const { t } = useTranslation()
    return (
        <CustomStackFullWidth alignItems="center" justifyContent="center">
            <Image src={image?image.src:nofood.src} alt="my gif" height={300} width={300}/>
            <Stack alignItems="center" justifyContent="center">
                <CustomTypographyGray>
                    {label ? t(label) : t('Not found')}
                </CustomTypographyGray>
            </Stack>
        </CustomStackFullWidth>
    )
}

CustomEmptyResult.propTypes = {}

export default CustomEmptyResult
