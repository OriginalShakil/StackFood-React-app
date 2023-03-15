import React, { useEffect, useState } from 'react'
import { Stack, useMediaQuery } from '@mui/material'
import ImageNotFound from '../../../public/static/no-image-found.png'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import vectorOne from '../../../public/static/shapes/VectorOne.png'
import vectorTwo from '../../../public/static/shapes/VectorTwo.png'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTheme } from '@mui/material/styles'
import Skeleton from "@mui/material/Skeleton";

const FunFactSection = ({ react_feature, global }) => {
    const [featureData, setFeatureData] = useState([])
    const { t } = useTranslation()
    const funData = [
        {
            id: '1',
            title: t('No title given'),
            img: ImageNotFound,
        },
        {
            id: '2',
            title: t('No title given'),
            img: ImageNotFound,
        },
        {
            id: '3',
            title: t('No title given'),
            img: ImageNotFound,
        },
    ]
    useEffect(() => {
        if (react_feature?.length > 0) {
            const newData = funData.map((item, index) => ({
                ...item,
                title: react_feature[index]?.title || '',
                img: react_feature[index]?.img,
            }))
            setFeatureData(newData)
        } else {
            setFeatureData(funData)
        }
    }, [react_feature])

    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isLarge = useMediaQuery(theme.breakpoints.up('sm'))
    const widthHandler = () => {
        if (isLarge) {
            return '190px'
        } else if (isSmall) {
            return '40px'
        }
        if (isXSmall) {
            return '20px'
        }
    }
    return (
        <>
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="center"
                pt="2rem"
                pb=".5rem"
                spacing={2}
            >
                {featureData.length > 0 &&
                    featureData.map((item, index) => (
                        <Stack direction="row" alignItems="center">
                            <Stack
                                direction="column"
                                alignItems="center"
                                textAlign="center"
                                spacing={2}
                            >
                                <img
                                    src={
                                        typeof item.img === 'string'
                                            ? `${global?.base_urls?.react_landing_page_feature_images}/${item.img}`
                                            : ImageNotFound.src
                                    }
                                    alt="icon"
                                    width="64px"
                                    height="64px"
                                />
                                <CustomTypography
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                        fontWeight: 500,
                                        fontSize: { xs: '14px', md: '22px' },
                                    }}
                                >
                                    {item.title}
                                </CustomTypography>
                            </Stack>
                            {index === 0 && (
                                <img
                                    src={vectorOne.src}
                                    alt="icon"
                                    width={widthHandler()}
                                    height={isXSmall ? '20px' : '40px'}
                                />
                            )}
                            {index === 1 && (
                                <img
                                    src={vectorTwo.src}
                                    alt="icon"
                                    width={widthHandler()}
                                    height={isXSmall ? '20px' : '40px'}
                                />
                            )}
                        </Stack>
                    )) }
                {featureData.length===0 && <Stack direction="row" alignItems="center">
                    <Stack
                        direction="column"
                        alignItems="center"
                        textAlign="center"
                        spacing={2}
                    >
                        <Skeleton variant='rectangle' width={widthHandler()}
                                  height={isXSmall ? '20px' : '40px'}/>
                        <CustomTypography
                            sx={{
                                color: (theme) =>
                                    theme.palette.primary.main,
                                fontWeight: 500,
                                fontSize: { xs: '14px', md: '22px' },
                            }}
                        >

                        </CustomTypography>
                    </Stack>
                </Stack>}
            </CustomStackFullWidth>
        </>
    )
}

export default FunFactSection
