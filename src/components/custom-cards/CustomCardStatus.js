import React from 'react'
import {
    CustomInnerPaper,
    CustomInnerStack,
    CustomPaperCard,
    CustomTypographyCard,
} from './CustomCards.style'

const CustomCardStatus = (props) => {
    const { cardTitle, cardData } = props
    return (
        <CustomPaperCard minHeight>
            <CustomInnerPaper background={false} />
            <CustomInnerStack
                alignItems="flex-start"
                justifyContent="center"
                spacing={2}
            >
                <CustomTypographyCard fontSize={1.875} color>
                    {cardData}
                </CustomTypographyCard>
                <CustomTypographyCard variant="h5">
                    {cardTitle}
                </CustomTypographyCard>
            </CustomInnerStack>
        </CustomPaperCard>
    )
}

CustomCardStatus.propTypes = {}

export default CustomCardStatus
