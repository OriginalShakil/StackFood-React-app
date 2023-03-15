import React from 'react'
import {
    CustomButtonForCustomCard,
    CustomInnerPaper,
    CustomInnerStack,
    CustomPaperCard,
    CustomTypographyCard,
} from './CustomCards.style'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const CustomCard = (props) => {
    const { cardTitle, cardData, background } = props
    const { t } = useTranslation()
    return (
        <CustomPaperCard minHeightForCustomCard>
            <CustomInnerPaper background={background} />
            <CustomInnerStack
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <CustomTypographyCard fontSize={1.125}>
                    {cardTitle}
                </CustomTypographyCard>
                <CustomTypographyCard fontSize={2.5} color>
                    {cardData}
                </CustomTypographyCard>
                <CustomButtonForCustomCard variant="contained">
                    <Typography variant="h5">{t('Collect Cash')}</Typography>
                </CustomButtonForCustomCard>
            </CustomInnerStack>
        </CustomPaperCard>
    )
}

CustomCard.propTypes = {}

export default CustomCard
